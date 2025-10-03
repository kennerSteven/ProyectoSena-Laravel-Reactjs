<?php

namespace App\Http\Controllers;


use App\Models\usuarios;
use Illuminate\Http\Request;

class UsuariosController extends Controller
{
   public function index(){

   $usuario = usuarios::with('perfile','fichas')->get();
   return response()->json($usuario);

   }

   public function store(Request $request){

    $usuario = usuarios::create($request->all());
    return response()->json(['message' => 'Usuario creado correctamente',
    'data' => $usuario], 201);
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
