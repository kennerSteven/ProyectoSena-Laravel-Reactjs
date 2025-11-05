<?php

namespace App\Http\Controllers;

use App\Models\eys_sena;
use App\Models\eyssena;
use App\Models\usuarios;
use Illuminate\Http\Request;

class eys_senaController extends Controller
{
    public function index()
    {
        $registros = eyssena::with(['usuarios.perfile'])->get();
        return response()->json($registros);
    }

   
    public function entradasena(Request $request)
    {

        $request->validate(['numeroDocumento' => ['required', 'numeric', 'digits_between:6,15'], ]);

        $usuario = usuarios::where('numeroDocumento', $request->numeroDocumento)->first();

        
        $entrada = eyssena::create([
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


        return response()->json([
            'message' => 'salida registrada correctamente',
            'entrada' => $salida
        ]);
    }


    

}
