<?php

namespace App\Http\Controllers;

use App\Models\eys_granja;
use App\Models\eysgranja;
use App\Models\usuarios;
use App\Models\vehiculo;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class eys_granjaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $registros = eysgranja::with(['usuarios.perfile', 'vehiculo'])->get();
        return response()->json($registros);
    }



    public function entradagranja(Request $request)
    {
        \Log::info('Payload recibido:', $request->all());

        $request->validate([
            'numeroDocumento' => ['required', 'numeric', 'digits_between:6,15'],
            'tieneVehiculo' => ['required', 'boolean'],
            'placa' => ['nullable', 'string', 'max:10'],
            'tipoVehiculo' => ['nullable', 'in:moto,carro,bus,otro'],
        ]);

        $usuario = usuarios::where('numeroDocumento', $request->numeroDocumento)->first();

        if (!$usuario) {
            return response()->json(['error' => 'Usuario no encontrado'], 404);
        }

        if ($usuario->perfile->nombre === 'Visitante' && $usuario->estado === 'inactivo') {
            $usuario->estado = 'activo';
            $usuario->fechaExpiracion = null;
            $usuario->save();
        }

        if ($request->tieneVehiculo === true) {
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
                'idvehiculo' => $vehiculo->id, // ✅ vínculo directo
                'fechaRegistro' => now(),
            ]);

            $entrada = eysgranja::with('usuarios.perfile', 'vehiculo')->find($entrada->id);

            return response()->json([
                'message' => 'Entrada y vehículo registrados correctamente',
                'usuario' => $usuario,
                'vehiculo' => $vehiculo,
                'entrada' => $entrada
            ], 201);
        }

        // Entrada sin vehículo
        $entrada = eysgranja::create([
            'numeroDocumento' => $usuario->numeroDocumento,
            'tipo' => 'entrada',
            'idusuario' => $usuario->id,
            'fechaRegistro' => now(),
        ]);

        $entrada->fechaRegistro = Carbon::parse($entrada->fechaRegistro)
            ->timezone('America/Bogota')
            ->format('Y-m-d H:i:s');

        $entrada = eysgranja::with('usuarios.perfile')->find($entrada->id);

        return response()->json([
            'message' => 'Entrada registrada correctamente (sin vehículo)',
            'usuario' => $usuario,
            'entrada' => $entrada
        ], 201);
    }


    public function salidagranja(Request $request)
    {
        $request->validate([
            'numeroDocumento' => ['required', 'numeric', 'digits_between:6,15'],
            'tieneVehiculo' => ['required', 'boolean'],
            'placa' => ['nullable', 'string', 'max:10'],
            'tipoVehiculo' => ['nullable', 'in:moto,carro,bus,otro'],
        ]);

        $usuario = usuarios::where('numeroDocumento', $request->numeroDocumento)->first();

        if (!$usuario) {
            return response()->json(['error' => 'Usuario no encontrado'], 404);
        }

        $ultimoRegistro = eysgranja::where('idusuario', $usuario->id)->latest()->first();

        if (!$ultimoRegistro || $ultimoRegistro->tipo === 'salida') {
            return response()->json([
                'error' => 'No se puede registrar salida sin una entrada previa.'
            ], 400);
        }

        if ($request->tieneVehiculo == true) {
            $vehiculo = vehiculo::create([
                'placa' => strtoupper($request->placa),
                'tipoVehiculo' => $request->tipoVehiculo,
                'idusuario' => $usuario->id,
                'fechaRegistro' => now(),
            ]);

            $salida = eysgranja::create([
                'numeroDocumento' => $usuario->numeroDocumento,
                'tipo' => 'salida',
                'idusuario' => $usuario->id,
                'idvehiculo' => $vehiculo->id, // ✅ Aquí se asocia el vehículo
                'fechaRegistro' => now(),
            ]);

            $salida->load(['usuarios.perfile', 'vehiculo']); // ✅ Relaciones cargadas

            return response()->json([
                'message' => 'Salida registrada correctamente (usuario y vehículo)',
                'usuario' => $usuario,
                'vehiculo' => $vehiculo,
                'salida' => $salida
            ], 201);
        } else {
            $salida = eysgranja::create([
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

            $salida->load(['usuarios.perfile']); // ✅ Cargar relaciones también aquí

            return response()->json([
                'message' => 'Salida registrada correctamente (sin vehículo)',
                'usuario' => $usuario,
                'salida' => $salida
            ], 201);
        }
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




}
