<?php

namespace App\Http\Controllers;

use App\Models\eysgym;
use App\Models\eyssena;
use App\Models\usuarios;
use Illuminate\Http\Request;

class UsuariosController extends Controller
{
   public function index(){

   $usuario = usuarios::with('perfile','fichas')->get();
   return response()->json($usuario);

   }

   public function store(Request $request)
{
    // Crear el usuario
    $usuario = Usuarios::create($request->all());

    //  Obtener el tipo de entrada desde el frontend
    $tipoEntrada = $request->input('tipoEntrada'); // gym, granja o casa
    $entrada = null;

    //  Crear la entrada según el tipo
    if ($tipoEntrada === 'gym') {
        $entrada = eysgym::create([
            'numeroDocumento' => $usuario->numeroDocumento,
            'tipo' => 'entrada',
            'idusuario' => $usuario->id,
            'fechaRegistro' => now(),
        ]);
    } elseif ($tipoEntrada === 'granja') {
        $entrada = eysgym::create([
            'numeroDocumento' => $usuario->numeroDocumento,
            'tipo' => 'entrada',
            'idusuario' => $usuario->id,
            'fechaRegistro' => now(),
        ]);
    } elseif ($tipoEntrada === 'casa') {
        $entrada = eyssena::create([
            'numeroDocumento' => $usuario->numeroDocumento,
            'tipo' => 'entrada',
            'idusuario' => $usuario->id,
            'fechaRegistro' => now(),
        ]);
    }

    
    return response()->json([
        'message' => 'Usuario y entrada registrados correctamente',
        'usuario' => $usuario,
        'entrada' => $entrada
    ], 201);
}



   public function show(string $id){

    $usuario = usuarios::with('perfile','fichas')->findOrFail($id);
    return response()->json ($usuario,200);
   }


   public function update(Request $request, string $id ) {

    $usuario = usuarios::findOrFail($id);

    $usuario->update($request->all());

    return response()->json(['message' => 'Usuario actualizado correctamente',
    'data' => $usuario], 200);


   }

   public Function destroy(string $id) {

    usuarios::findOrFail($id)->delete();
    return response()->json('se elimino correctamente',200);

   }




}
