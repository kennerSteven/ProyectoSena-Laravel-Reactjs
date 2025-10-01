<?php

namespace App\Http\Controllers;

use App\Http\Requests\usuariosRequest;
use App\Models\perfile;
use App\Models\usuarios;
use Illuminate\Http\Request;

class usuariosController extends Controller
{
    public function index()
    {
        $usuario = usuarios::all();
        return response()->json($usuario);
    }

   
     public function store(usuariosRequest $request)
    {
        $usuario = usuarios::create($request->all());
        return response()->json([$usuario], 201);
    }
   

     public function show($id)
    {
        $usuario = usuarios::findOrFail($id);
        $perfil =  perfile::all();
        
        return response()->json([$usuario, $perfil]);
    }

    public function update(usuariosRequest $request, $id)
   {
    $usuario = usuarios::findOrFail($id);
    $usuario->update($request->all());

    return response()->json([ $usuario]);
   }


   public function destroy($id)
  {
    $usuario = usuarios::findOrFail($id);
    $usuario->delete();

    return response()->json(['message' => 'usuario eliminado correctamente']);
  }



}
