<?php

namespace App\Http\Controllers;

use App\Models\eys_gym;
use App\Models\eysgym;
use App\Models\usuarios;
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

    
    $usuario = usuarios::with('perfile') 
        ->where('numeroDocumento', $request->numeroDocumento)
        ->firstOrFail();

    
    $entrada = eysgym::create([
        'numeroDocumento' => $usuario->numeroDocumento,
        'tipo' => 'entrada',
        'idusuario' => $usuario->id,
        'fechaRegistro' => now(),
    ]);

    
    $entrada = eysgym::with('usuarios.perfile')
        ->find($entrada->id);

    
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

    
    $usuario = usuarios::with('perfile')
        ->where('numeroDocumento', $request->numeroDocumento)
        ->firstOrFail();

    
    $ultimoRegistro = eysgym::where('idusuario', $usuario->id)
        ->latest()
        ->first();

   
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

    
    $salida = eysgym::with('usuarios.perfile')->find($salida->id);

   
    return response()->json([
        'message' => 'Salida registrada correctamente',
        'salida' => $salida
    ]);
}





   
    
}
