<?php

namespace App\Http\Controllers;

use App\Models\eyscasadeapoyo;
use App\Models\usuarios;
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

        $entrada = eyscasadeapoyo::create([
            'numeroDocumento' => $usuario->numeroDocumento,
            'tipo' => 'entrada',
            'idusuario' => $usuario->id,
            'fechaRegistro' => now(),
        ]);

        

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


        return response()->json([
            'message' => 'Salida registrada correctamente',
            'salida' => $salida
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
