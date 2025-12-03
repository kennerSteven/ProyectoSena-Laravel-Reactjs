<?php

namespace App\Http\Controllers;


use App\Models\eysgym;
use App\Models\usuarios;
use Carbon\Carbon;
use Illuminate\Http\Request;

class eys_gymController extends Controller
{

    public function index()
    {
        $registros = eysgym::with(['usuarios.perfile'])
            ->orderBy('fechaRegistro', 'desc') // Más recientes primero
            ->get();

        return response()->json($registros);
    }




   public function entradagym(Request $request)
{
    $request->validate([
        'numeroDocumento' => ['required', 'numeric', 'digits_between:6,15'],
    ]);

    $documento = $request->numeroDocumento;

    // 1. Buscar usuario
    $usuario = usuarios::where('numeroDocumento', $documento)
        ->with('perfile')
        ->first();

    if (!$usuario) {
        return response()->json([
            'message' => 'Usuario no encontrado.',
        ], 404);
    }

    // 2. 🛑 Verificar el último registro (Control de Flujo)
    // Busca el registro más reciente en la tabla eysgym para este usuario.
    $ultimoRegistro = eysgym::where('numeroDocumento', $documento)
        ->orderBy('fechaRegistro', 'desc')
        ->first();

    // Si el último registro es de 'entrada', no permitimos registrar otra entrada.
    if ($ultimoRegistro && $ultimoRegistro->tipo === 'entrada') {
        return response()->json([
            'message' => 'El usuario ya tiene una entrada registrada en el GYM y no ha realizado la salida.',
            'ultimo_registro' => $ultimoRegistro
        ], 409); // 409 Conflict
    }

    // 3. Aplicar lógica de activación (visitante inactivo)
    // Se mantiene tu lógica original para activar visitantes si es necesario.
    if (
        strtolower($usuario->perfile->nombre) === 'visitante' &&
        $usuario->estado === 'inactivo'
    ) {
        $usuario->estado = 'activo';
        $usuario->fechaExpiracion = null;
        $usuario->save();
    }

    // 4. Registrar la nueva entrada
    $entrada = eysgym::create([
        'numeroDocumento' => $usuario->numeroDocumento,
        'tipo' => 'entrada',
        'idusuario' => $usuario->id,
        'fechaRegistro' => now(),
    ]);

    // 5. Formatear la hora de registro
    $entrada->fechaRegistro = Carbon::parse($entrada->fechaRegistro)
        ->timezone('America/Bogota')
        ->format('Y-m-d H:i:s');


    // 6. Devolver respuesta
    return response()->json([
        'message' => 'Entrada registrada correctamente en el GYM',
        'entrada' => $entrada
    ]);
}




    public function salidagym(Request $request)
    {

        $request->validate([
            'numeroDocumento' => ['required', 'numeric', 'digits_between:6,15'],
        ]);


        $usuario = usuarios::where('numeroDocumento', $request->numeroDocumento)->first();


        $ultimoRegistro = eysgym::where('idusuario', $usuario->id)->latest()->first();


        if (!$ultimoRegistro || $ultimoRegistro->tipo === 'salida') {
            return response()->json([
                'error' => 'No se puede registrar salida sin una entrada previa.'
            ], 400);
        }


        $salida = eysgym::create([
            'numeroDocumento' => $usuario->numeroDocumento,
            'tipo' => 'salida',
            'idusuario' => $usuario->id,
            'fechaRegistro' => now(),
        ]);

        if ($usuario->perfile->nombre === 'Visitante') {
            $usuario->fechaExpiracion = now()->addHours(12);
            $usuario->save();
        }

        $salida->fechaRegistro = Carbon::parse($salida->fechaRegistro)
            ->timezone('America/Bogota')
            ->format('Y-m-d H:i:s');


        return response()->json([
            'message' => 'Salida registrada correctamente',
            'salida' => $salida
        ]);
    }

    public function salidaMasivaGym()
    {
        // 1. Traer SOLO las ENTRADAS sin una SALIDA posterior
        $usuariosConEntradaPendiente = eysgym::where('tipo', 'entrada')
            ->whereNotIn('id', function ($query) {
                $query->select('entrada.id')
                    ->from('eys_gym as entrada')
                    ->join('eys_gym as salida', function ($join) {
                        $join->on('entrada.numeroDocumento', '=', 'salida.numeroDocumento')
                            ->where('salida.tipo', '=', 'salida')
                            ->whereColumn('salida.fechaRegistro', '>', 'entrada.fechaRegistro');
                    });
            })
            ->get();

        if ($usuariosConEntradaPendiente->isEmpty()) {
            return response()->json([
                'message' => 'No hay usuarios dentro del GYM para registrar salida masiva.'
            ]);
        }

        // 2. Registrar SALIDA para cada uno
        foreach ($usuariosConEntradaPendiente as $entrada) {

            eysgym::create([
                'numeroDocumento' => $entrada->numeroDocumento,
                'tipo' => 'salida',
                'idusuario' => $entrada->idusuario,
                'fechaRegistro' => now(),
            ]);

            // Inactivar SOLO visitantes
            $usuario = $entrada->usuarios;
            if ($usuario && $usuario->perfile->nombre === 'Visitante') {
                $usuario->fechaExpiracion = now()->addHours(12);
                $usuario->save();
            }
        }

        return response()->json([
            'message' => 'Salida masiva registrada correctamente en el GYM.',
            'total' => $usuariosConEntradaPendiente->count()
        ]);
    }






    public function buscarPorDocumento($numeroDocumento)
    {
        $usuario = usuarios::with('perfile', 'fichas')
            ->where('numeroDocumento', $numeroDocumento)
            ->first();

        if (!$usuario) {
            return response()->json(['error' => 'Usuario no encontrado'], 404);
        }

        return response()->json([
            'message' => 'Usuario encontrado',
            'usuario' => $usuario
        ]);
    }

    public function EstadisticasEntradasKPI()
    {
        $totalEntradas = eysgym::where('tipo', 'entrada')->count();


        $entradasHoy = eysgym::where('tipo', 'entrada')
            ->whereDate('fechaRegistro', now()->toDateString())
            ->count();

        $porcentaje = $totalEntradas > 0
            ? round(($entradasHoy / $totalEntradas) * 100, 2)
            : 0;

        $porPerfil = eysgym::with('usuarios.perfile:id,nombre')
            ->where('tipo', 'entrada')
            ->get()
            ->groupBy(function ($item) {

                if ($item->usuarios && $item->usuarios->perfile) {
                    return $item->usuarios->perfile->nombre;
                }

                return 'Visitante';
            })
            ->map(function ($grupo) {
                return [
                    'perfil' => $grupo->first()->usuarios->perfile->nombre
                        ?? 'Visitante',
                    'cantidad' => $grupo->count(),
                ];
            })
            ->values();

        return response()->json([
            'porcentaje' => $porcentaje,
            'porperfil' => $porPerfil,
            'total' => $totalEntradas,
        ]);
    }

    public function EstadisticasSalidasKPI()
    {

        $totalSalidas = eysgym::where('tipo', 'salida')->count();

        $salidasHoy = eysgym::where('tipo', 'salida')
            ->whereDate('fechaRegistro', now()->toDateString())
            ->count();


        $porcentaje = $totalSalidas > 0
            ? round(($salidasHoy / $totalSalidas) * 100, 2)
            : 0;


        $porPerfil = eysgym::with('usuarios.perfile:id,nombre')
            ->where('tipo', 'salida')
            ->get()
            ->groupBy(function ($item) {
                if ($item->usuarios && $item->usuarios->perfile) {
                    return $item->usuarios->perfile->nombre;
                }
                return 'Visitante';
            })
            ->map(function ($grupo) {
                return [
                    'perfil' => $grupo->first()->usuarios->perfile->nombre
                        ?? 'Visitante',
                    'cantidad' => $grupo->count(),
                ];
            })
            ->values();

        return response()->json([
            'porcentaje' => $porcentaje,
            'porperfil' => $porPerfil,
            'total' => $totalSalidas,
        ]);
    }


    public function entradasPorMesgym()
    {
        try {

            $data = eysgym::selectRaw('strftime("%m", fechaRegistro) as mes, COUNT(*) as total')
                ->where('tipo', 'entrada')
                ->groupBy('mes')
                ->orderBy('mes')
                ->get();

            $mesesNombre = [
                "01" => 'Ene',
                "02" => 'Feb',
                "03" => 'Mar',
                "04" => 'Abr',
                "05" => 'May',
                "06" => 'Jun',
                "07" => 'Jul',
                "08" => 'Ago',
                "09" => 'Sep',
                "10" => 'Oct',
                "11" => 'Nov',
                "12" => 'Dic'
            ];

            return response()->json([
                'labels' => $data->pluck('mes')->map(fn($m) => $mesesNombre[$m]),
                'totales' => $data->pluck('total'),
            ]);

        } catch (\Exception $e) {

            return response()->json([
                'error' => $e->getMessage(),
                'linea' => $e->getLine(),
                'archivo' => $e->getFile(),
            ], 500);
        }
    }


    public function porcentajeEntradasPorPerfilgym()
    {
        try {
            // Total de entradas registradas en CASA DE APOYO
            $totalEntradas = eysgym::where('tipo', 'entrada')->count();

            if ($totalEntradas == 0) {
                return response()->json([
                    'labels' => [],
                    'porcentajes' => [],
                ]);
            }

            // Entradas agrupadas por perfil
            $data = eysgym::selectRaw('perfiles.nombre as perfil, COUNT(*) as total')
                ->join('usuarios', 'usuarios.id', '=', 'eys_gym.idusuario')
                ->join('perfiles', 'perfiles.id', '=', 'usuarios.idperfil')
                ->where('eys_gym.tipo', 'entrada')
                ->groupBy('perfiles.nombre')
                ->get();

            return response()->json([
                'labels' => $data->pluck('perfil'),
                'porcentajes' => $data->map(fn($item) => round(($item->total / $totalEntradas) * 100, 2)),
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'linea' => $e->getLine(),
                'archivo' => $e->getFile(),
            ], 500);
        }
    }






}
