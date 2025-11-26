<?php

namespace App\Http\Controllers;

use App\Models\eys_sena;
use App\Models\eyssena;
use App\Models\usuarios;
use Carbon\Carbon;
use Illuminate\Http\Request;

class eys_senaController extends Controller
{
    public function index()
    {
        $registros = eyssena::with(['usuarios.perfile'])
            ->orderBy('fechaRegistro', 'desc') // Más recientes primero
            ->get();

        return response()->json($registros);
    }


    public function entradasena(Request $request)
    {

        $request->validate(['numeroDocumento' => ['required', 'numeric', 'digits_between:6,15'],]);

        $usuario = usuarios::where('numeroDocumento', $request->numeroDocumento)->first();

        if ($usuario && $usuario->perfile->nombre === 'Visitante' && $usuario->estado === 'inactivo') {
            $usuario->estado = 'activo';
            $usuario->fechaExpiracion = null;
            $usuario->save();
        }


        $entrada = eyssena::create([
            'numeroDocumento' => $usuario->numeroDocumento,
            'tipo' => 'entrada',
            'idusuario' => $usuario->id,
            'fechaRegistro' => now(),
        ]);

        $entrada->fechaRegistro = Carbon::parse($entrada->fechaRegistro)
            ->timezone('America/Bogota')
            ->format('Y-m-d H:i:s');


        return response()->json([
            'message' => 'Entrada registrada correctamente',
            'entrada' => $entrada
        ]);
    }


    public function salidasena(Request $request)
    {

        $request->validate(['numeroDocumento' => ['required', 'numeric', 'digits_between:6,15'],]);

        $usuario = usuarios::where('numeroDocumento', $request->numeroDocumento)->first();

        $ultimoRegistro = eyssena::where('idusuario', $usuario->id)->latest()->first();


        if (!$ultimoRegistro || $ultimoRegistro->tipo === 'salida') {
            return response()->json([
                'error' => ' No se puede registrar salida sin una entrada previa.'
            ], 400);
        }


        $salida = eyssena::create([
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


    public function salidaMasivaSena()
{
    // 1. Traer SOLO las ENTRADAS sin una SALIDA posterior
    $usuariosConEntradaPendiente = eyssena::where('tipo', 'entrada')
        ->whereNotIn('id', function ($query) {
            $query->select('entrada.id')
                  ->from('eys_sena as entrada')
                  ->join('eys_sena as salida', function ($join) {
                      $join->on('entrada.numeroDocumento', '=', 'salida.numeroDocumento')
                           ->where('salida.tipo', '=', 'salida')
                           ->whereColumn('salida.fechaRegistro', '>', 'entrada.fechaRegistro');
                  });
        })
        ->get();

    if ($usuariosConEntradaPendiente->isEmpty()) {
        return response()->json([
            'message' => 'No hay usuarios dentro del SENA para registrar salida masiva.'
        ]);
    }

    // 2. Registrar salida para cada uno
    foreach ($usuariosConEntradaPendiente as $entrada) {

        eyssena::create([
            'numeroDocumento' => $entrada->numeroDocumento,
            'tipo' => 'salida',
            'idusuario' => $entrada->idusuario,
            'fechaRegistro' => now(),
        ]);

        // Inactivar solo visitantes
        $usuario = $entrada->usuarios;
        if ($usuario && $usuario->perfile->nombre === 'Visitante') {
            $usuario->fechaExpiracion = now()->addHours(12);
            $usuario->save();
        }
    }

    return response()->json([
        'message' => 'Salida masiva registrada correctamente.',
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
        $totalEntradas = eyssena::where('tipo', 'entrada')->count();


        $entradasHoy = eyssena::where('tipo', 'entrada')
            ->whereDate('fechaRegistro', now()->toDateString())
            ->count();

        $porcentaje = $totalEntradas > 0
            ? round(($entradasHoy / $totalEntradas) * 100, 2)
            : 0;

        $porPerfil = eyssena::with('usuarios.perfile:id,nombre')
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

        $totalSalidas = eyssena::where('tipo', 'salida')->count();


        $salidasHoy = eyssena::where('tipo', 'salida')
            ->whereDate('fechaRegistro', now()->toDateString())
            ->count();


        $porcentaje = $totalSalidas > 0
            ? round(($salidasHoy / $totalSalidas) * 100, 2)
            : 0;


        $porPerfil = eyssena::with('usuarios.perfile:id,nombre')
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


    public function entradasPorMessena()
{
    try {

        $data = eyssena::selectRaw('strftime("%m", fechaRegistro) as mes, COUNT(*) as total')
            ->where('tipo', 'entrada')
            ->groupBy('mes')
            ->orderBy('mes')
            ->get();

        $mesesNombre = [
            "01" => 'Ene', "02" => 'Feb', "03" => 'Mar', "04" => 'Abr',
            "05" => 'May', "06" => 'Jun', "07" => 'Jul', "08" => 'Ago',
            "09" => 'Sep', "10" => 'Oct', "11" => 'Nov', "12" => 'Dic'
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







}
