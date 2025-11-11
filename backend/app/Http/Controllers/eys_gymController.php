<?php

namespace App\Http\Controllers;

use App\Models\eys_gym;
use App\Models\eysgym;
use App\Models\usuarios;
use Carbon\Carbon;
use Illuminate\Http\Request;

class eys_gymController extends Controller
{
    
    public function index()
    {
        $registros = eysgym::with(['usuarios.perfile'])->get();
        return response()->json($registros);
    }

   
    public function entradagym(Request $request)
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

    
    $entrada = eysgym::create([
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
    
    $visitantesActivos = usuarios::where('estado', 'activo')
        ->whereHas('perfile', function ($q) {
            $q->where('nombre', 'Visitante');
        })
        ->get();

    if ($visitantesActivos->isEmpty()) {
        return response()->json(['message' => 'No hay visitantes activos para registrar salida.']);
    }

    foreach ($visitantesActivos as $visitante) {
        
            eysgym::create([
            'numeroDocumento' => $visitante->numeroDocumento,
            'tipo' => 'salida',
            'idusuario' => $visitante->id,
            'fechaRegistro' => now(),
        ]);

        
        $visitante->fechaExpiracion = now()->addHours(12);
        $visitante->save();
    }

    return response()->json([
        'message' => 'Salidas registradas correctamente para todos los visitantes activos del GYM.',
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

   
    
}
