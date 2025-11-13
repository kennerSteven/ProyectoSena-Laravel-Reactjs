<?php

namespace App\Http\Controllers;

use App\Models\eyscasadeapoyo;
use App\Models\eysgranja;
use App\Models\usuarios;
use Carbon\Carbon;
use Illuminate\Http\Request;

class EysCasadeapoyoController extends Controller
{
    
    public function index()
    {
        $registros = eyscasadeapoyo::with(['usuarios.perfile'])->get();
        return response()->json($registros);
    }

    
    public function entradacasadeapoyo(Request $request)
    {
        $request->validate([
            'numeroDocumento' => ['required', 'numeric', 'digits_between:6,15'],
        ]);

        $usuario = usuarios::where('numeroDocumento', $request->numeroDocumento)->first();

         if ($usuario && $usuario->perfile->nombre === 'Visitante' && $usuario->estado === 'inactivo') {
        $usuario->estado = 'activo';
        $usuario->fechaExpiracion = null; 
        $usuario->save();
    }


        $entrada = eyscasadeapoyo::create([
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

    
    public function salidacasadeapoyo(Request $request)
    {
        $request->validate([
            'numeroDocumento' => ['required', 'numeric', 'digits_between:6,15'],
        ]);

        $usuario = usuarios::where('numeroDocumento', $request->numeroDocumento)->first();

        $ultimoRegistro = eyscasadeapoyo::where('idusuario', $usuario->id)
            ->latest()
            ->first();

        if (!$ultimoRegistro || $ultimoRegistro->tipo === 'salida') {
            return response()->json([
                'error' => 'No se puede registrar salida sin una entrada previa.'
            ], 400);
        }

        $salida = eyscasadeapoyo::create([
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

    public function salidaMasivaCasaDeApoyo()
{
    
    $visitantesActivos = usuarios::where('estado', 'activo')
        ->whereHas('perfile', function ($q) {
            $q->where('nombre', 'Visitante');
        })
        ->get();

    if ($visitantesActivos->isEmpty()) {
        return response()->json(['message' => 'No hay visitantes activos para registrar salida.']);
    }

    foreach ($visitantesActivos as $visitante) {

            eyscasadeapoyo::create([
            'numeroDocumento' => $visitante->numeroDocumento,
            'tipo' => 'salida',
            'idusuario' => $visitante->id,
            'fechaRegistro' => now(),
        ]);

       
        $visitante->fechaExpiracion = now()->addHours(12);
        $visitante->save();
    }

    return response()->json([
        'message' => 'Salidas registradas correctamente para todos los visitantes activos.',
        'total' => $visitantesActivos->count()
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
    $totalEntradas = eysgranja::where('tipo', 'entrada')->count();


    $entradasHoy = eyscasadeapoyo::where('tipo', 'entrada')
        ->whereDate('fechaRegistro', now()->toDateString())
        ->count();

    $porcentaje = $totalEntradas > 0
        ? round(($entradasHoy / $totalEntradas) * 100, 2)
        : 0;

    $porPerfil = eyscasadeapoyo::with('usuarios.perfile:id,nombre')
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
  
    $totalSalidas = eyscasadeapoyo::where('tipo', 'salida')->count();


    $salidasHoy = eyscasadeapoyo::where('tipo', 'salida')
        ->whereDate('fechaRegistro', now()->toDateString())
        ->count();

   
    $porcentaje = $totalSalidas > 0
        ? round(($salidasHoy / $totalSalidas) * 100, 2)
        : 0;

    
    $porPerfil = eyscasadeapoyo::with('usuarios.perfile:id,nombre')
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







}
