<?php

namespace App\Http\Controllers;

use App\Models\eyscasadeapoyo;
use App\Models\eysgranja;
use App\Models\eysgym;
use App\Models\eyssena;
use App\Models\perfile;
use App\Models\usuarios;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UsuariosController extends Controller
{
   public function index(){

   $usuario = usuarios::with('perfile','fichas')->get();
   return response()->json($usuario);

   }

   public function store(Request $request)
{
    
    if ($request->has('foto')) {
        $fotoBase64 = $request->input('foto');
        $foto = preg_replace('/^data:image\/\w+;base64,/', '', $fotoBase64);
        $foto = str_replace(' ', '+', $foto);
        $nombreFoto = 'usuario_' . time() . '.png';
        Storage::disk('public')->put('fotos/' . $nombreFoto, base64_decode($foto));
        $request['foto'] = 'storage/fotos/' . $nombreFoto;
    }

    
    $usuario = usuarios::create($request->all());

    
    return response()->json([
        'message' => 'Usuario y entrada registrados correctamente',
        'usuario' => $usuario
       
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
