<?php

namespace App\Http\Controllers;

use App\Models\eys_granja;
use App\Models\eysgranja;
use App\Models\usuarios;
use App\Models\vehiculo;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class eys_granjaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $registros = eysgranja::with(['usuarios.perfile', 'vehiculo'])
            ->orderBy('fechaRegistro', 'desc') // Más recientes primero
            ->get();

        return response()->json($registros);
    }


    public function entradagranja(Request $request)
{
    $documento = $request->numeroDocumento; // Definimos la variable al inicio para usarla en el control de flujo

    try {
        Log::info('Payload recibido:', $request->all());

        $request->validate([
            'numeroDocumento' => ['required', 'numeric', 'digits_between:6,15'],
            'tieneVehiculo' => ['required', 'boolean'],
            'placa' => ['nullable', 'string', 'max:10'],
            'tipoVehiculo' => ['nullable', 'in:moto,carro,bus,otro'],
        ]);

        $usuario = usuarios::where('numeroDocumento', $documento) // Usamos $documento
            ->with('perfile')
            ->first();

        if (!$usuario) {
            return response()->json(['error' => 'Usuario no encontrado.'], 404);
        }

        // 🛑 CONTROL DE FLUJO: Verificar el último registro
        $ultimoRegistro = eysgranja::where('numeroDocumento', $documento)
            ->orderBy('fechaRegistro', 'desc')
            ->first();

        // Si el último registro es de 'entrada', detenemos la operación
        if ($ultimoRegistro && $ultimoRegistro->tipo === 'entrada') {
            return response()->json([
                'error' => 'El usuario ya tiene una entrada registrada en la Granja y no ha realizado la salida.',
                'ultimo_registro' => $ultimoRegistro
            ], 409); // 409 Conflict
        }
        // ----------------------------------------------------

        if (
            $usuario->perfile &&
            strtolower($usuario->perfile->nombre) === 'visitante' &&
            $usuario->estado === 'inactivo'
        ) {
            $usuario->estado = 'activo';
            $usuario->fechaExpiracion = null;
            $usuario->save();
        }

        $vehiculo = null;

        if ($request->boolean('tieneVehiculo')) {
            $request->validate([
                'placa' => ['required', 'string', 'max:10'],
                'tipoVehiculo' => ['required', 'in:moto,carro,bus,otro'],
            ]);

            $vehiculo = vehiculo::create([
                'placa' => strtoupper($request->placa),
                'tipoVehiculo' => $request->tipoVehiculo,
                'idusuario' => $usuario->id,
                'fechaRegistro' => now(),
            ]);

            $entrada = eysgranja::create([
                'numeroDocumento' => $usuario->numeroDocumento,
                'tipo' => 'entrada',
                'idusuario' => $usuario->id,
                'idvehiculo' => $vehiculo->id,
                'fechaRegistro' => now(),
            ]);

            // Formatear la hora de registro para la respuesta (se eliminó la recarga con with)
            $entrada->fechaRegistro = Carbon::parse($entrada->fechaRegistro)
                ->timezone('America/Bogota')
                ->format('Y-m-d H:i:s');

            // Aseguramos que la entrada tenga el vehículo cargado para la respuesta
            $entrada->setRelation('vehiculo', $vehiculo);


            return response()->json([
                'message' => 'Entrada y vehículo registrados correctamente en Granja',
                'usuario' => $usuario,
                'vehiculo' => $vehiculo,
                'entrada' => $entrada
            ], 201);
        }

        // Si llega aquí, es porque no tiene vehículo O no declaró tenerlo.
        $entrada = eysgranja::create([
            'numeroDocumento' => $usuario->numeroDocumento,
            'tipo' => 'entrada',
            'idusuario' => $usuario->id,
            // idvehiculo es nulo por defecto
            'fechaRegistro' => now(),
        ]);

        // Formatear la hora de registro para la respuesta (se eliminó la recarga con with)
        $entrada->fechaRegistro = Carbon::parse($entrada->fechaRegistro)
            ->timezone('America/Bogota')
            ->format('Y-m-d H:i:s');


        return response()->json([
            'message' => 'Entrada registrada correctamente en Granja (sin vehículo)',
            'usuario' => $usuario,
            'entrada' => $entrada
        ], 201);
    } catch (\Illuminate\Validation\ValidationException $e) {
        // Captura errores de validación de Laravel y devuelve 422
        Log::error('Error de validación en entradagranja:', $e->errors());
        return response()->json([
            'error' => 'Error de validación de los datos.',
            'details' => $e->errors()
        ], 422);
    } catch (\Exception $e) {
        // Captura cualquier otro error (500) y lo registra
        Log::error('Error fatal en entradagranja:', [
            'message' => $e->getMessage(),
            'file' => $e->getFile(),
            'line' => $e->getLine(),
        ]);

        // Devuelve un JSON de error 500 con un mensaje amigable
        return response()->json([
            'error' => 'Error interno del servidor. La operación no se pudo completar. Por favor, revisa los logs del servidor.',
        ], 500);
    }
}
    


    public function salidagranja(Request $request)
    {
        // 1. Validar solo el documento (¡Se eliminaron las validaciones de vehículo innecesarias!)
        $request->validate([
            'numeroDocumento' => ['required', 'numeric', 'digits_between:6,15'],
        ]);

        $usuario = usuarios::where('numeroDocumento', $request->numeroDocumento)->first();

        if (!$usuario) {
            return response()->json(['error' => 'Usuario no encontrado'], 404);
        }

        // 2. Buscar el ÚLTIMO REGISTRO DE ENTRADA ACTIVA para esta persona
        // Se busca el último registro de tipo 'entrada'
        $ultimoRegistroEntrada = eysgranja::where('idusuario', $usuario->id)
            ->where('tipo', 'entrada')
            ->orderBy('fechaRegistro', 'desc')
            ->first();

        // 3. Verificar si hay una entrada pendiente de salida
        // Comprueba que exista una entrada y que el último registro de E/S no sea una salida posterior a ella.
        if (!$ultimoRegistroEntrada || eysgranja::where('idusuario', $usuario->id)->where('tipo', 'salida')
        ->where('fechaRegistro', '>', $ultimoRegistroEntrada->fechaRegistro)->exists()) {
            return response()->json([
                'error' => 'No se puede registrar salida sin una entrada previa activa.'
            ], 400);
        }
        
        // 4. Obtener el ID del vehículo deducido de la entrada anterior
        // Este ID será null si no ingresó con vehículo.
        $idVehiculoSalida = $ultimoRegistroEntrada->idvehiculo;
        $vehiculoSalida = null;
        $mensajeVehiculo = 'sin vehículo';
        
        // Determinar si salió con vehículo para el mensaje de respuesta y cargar sus datos.
        if ($idVehiculoSalida) {
            $vehiculoSalida = vehiculo::find($idVehiculoSalida);
            $mensajeVehiculo = 'con vehículo (' . ($vehiculoSalida->placa ?? 'N/A') . ')';
        }

        // 5. Crear el registro de SALIDA
        // Se usa el idvehiculo deducido de la entrada.
        $salida = eysgranja::create([
            'numeroDocumento' => $usuario->numeroDocumento,
            'tipo' => 'salida',
            'idusuario' => $usuario->id,
            'idvehiculo' => $idVehiculoSalida, 
            'fechaRegistro' => now(),
        ]);

        // 6. Lógica adicional (Visitante)
        if ($usuario->perfile->nombre === 'Visitante') {
            $usuario->fechaExpiracion = now()->addHours(12); 
            $usuario->save();
        }

        // 7. Preparar la respuesta
        $salida->load(['usuarios.perfile', 'vehiculo']); 
        
        return response()->json([
            'message' => 'Salida registrada correctamente ' . $mensajeVehiculo,
            'usuario' => $usuario,
            'vehiculo' => $vehiculoSalida,
            'salida' => $salida
        ], 201);
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

    public function salidaMasivaGranja()
    {
        //  Buscar SOLO las ENTRADAS sin SALIDA posterior
        $entradasPendientes = eysgranja::where('tipo', 'entrada')
            ->whereNotIn('id', function ($query) {
                $query->select('entrada.id')
                    ->from('eys_granja as entrada')
                    ->join('eys_granja as salida', function ($join) {
                        $join->on('entrada.numeroDocumento', '=', 'salida.numeroDocumento')
                            ->where('salida.tipo', '=', 'salida')
                            ->whereColumn('salida.fechaRegistro', '>', 'entrada.fechaRegistro');
                    });
            })
            ->get();

        if ($entradasPendientes->isEmpty()) {
            return response()->json([
                'message' => 'No hay usuarios dentro de la granja para registrar salida masiva.'
            ]);
        }

        $contador = 0;

        foreach ($entradasPendientes as $entrada) {

            $usuario = $entrada->usuarios;
            $vehiculoId = null;

            //  Si entró con vehículo → sacarlo también
            if ($entrada->idvehiculo !== null && $entrada->vehiculo) {

                // Crear un nuevo registro de salida de vehículo
                $vehiculoSalida = vehiculo::create([
                    'placa' => $entrada->vehiculo->placa,
                    'tipoVehiculo' => $entrada->vehiculo->tipoVehiculo,
                    'idusuario' => $usuario->id,
                    'fechaRegistro' => now(),
                ]);

                $vehiculoId = $vehiculoSalida->id;
            }

            //  Crear la salida masiva en granja
            eysgranja::create([
                'numeroDocumento' => $entrada->numeroDocumento,
                'tipo' => 'salida',
                'idusuario' => $entrada->idusuario,
                'idvehiculo' => $vehiculoId, // si tuvo vehículo, se asocia aquí
                'fechaRegistro' => now(),
            ]);

            //  Visitantes → expiración 12h
            if ($usuario && $usuario->perfile->nombre === 'Visitante') {
                $usuario->fechaExpiracion = now()->addHours(12);
                $usuario->save();
            }

            $contador++;
        }

        return response()->json([
            'message' => 'Salida masiva en la granja realizada correctamente.',
            'total_salidas' => $contador,
        ]);
    }





    public function EstadisticasEntradasGranjaKPI()
    {
        $totalEntradas = eysgranja::where('tipo', 'entrada')->count();


        $entradasHoy = eysgranja::where('tipo', 'entrada')
            ->whereDate('fechaRegistro', now()->toDateString())
            ->count();


        $porcentaje = $totalEntradas > 0
            ? round(($entradasHoy / $totalEntradas) * 100, 2)
            : 0;


        $porPerfil = eysgranja::with('usuarios.perfile:id,nombre')
            ->where('tipo', 'entrada')
            ->get()
            ->groupBy(function ($item) {
                if ($item->usuarios && $item->usuarios->perfile) {
                    return $item->usuarios->perfile->nombre;
                }
                return 'Visitante'; // cuando no hay usuario
            })
            ->map(function ($grupo, $perfil) {
                return [
                    'perfil' => $perfil,
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


    public function EstadisticasSalidasGranjaKPI()
    {
        // Total de SALIDAS registradas en la granja
        $totalSalidas = eysgranja::where('tipo', 'salida')->count();

        // Salidas registradas hoy
        $salidasHoy = eysgranja::where('tipo', 'salida')
            ->whereDate('fechaRegistro', now()->toDateString())
            ->count();

        // Porcentaje de salidas de hoy frente al total
        $porcentaje = $totalSalidas > 0
            ? round(($salidasHoy / $totalSalidas) * 100, 2)
            : 0;

        // Agrupamos por perfil (y visitantes si no tienen usuario)
        $porPerfil = eysgranja::with('usuarios.perfile:id,nombre')
            ->where('tipo', 'salida')
            ->get()
            ->groupBy(function ($item) {
                if ($item->usuarios && $item->usuarios->perfile) {
                    return $item->usuarios->perfile->nombre;
                }
                return 'Visitante'; // cuando no hay usuario
            })
            ->map(function ($grupo, $perfil) {
                return [
                    'perfil' => $perfil,
                    'cantidad' => $grupo->count(),
                ];
            })
            ->values();

        // Devolver datos
        return response()->json([
            'porcentaje' => $porcentaje,
            'porperfil' => $porPerfil,
            'total' => $totalSalidas,
        ]);
    }


    public function entradasPorMes()
    {
        try {

            $data = eysgranja::selectRaw('strftime("%m", fechaRegistro) as mes, COUNT(*) as total')
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

    public function entradasPorTipoVehiculo()
    {
        try {

            $data = eysgranja::select(
                'vehiculos.tipoVehiculo',
                DB::raw('COUNT(*) as total')
            )
                ->join('vehiculos', 'vehiculos.id', '=', 'eys_granja.idvehiculo')
                ->where('eys_granja.tipo', 'entrada')
                ->groupBy('vehiculos.tipoVehiculo')
                ->get();

            return response()->json([
                'labels' => $data->pluck('tipoVehiculo'),
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
