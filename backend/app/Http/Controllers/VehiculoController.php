<?php

namespace App\Http\Controllers;

use App\Http\Requests\vehiculosRequest;
use App\Models\vehiculo;
use Illuminate\Http\Request;


class VehiculoController extends Controller
{
   public function index(){

    $vehiculos = vehiculo::with('usuarios')->get();
    return response()->json($vehiculos, 200);

   }

   public function store(vehiculosRequest $request){

    $vehiculo = vehiculo::create($request->all());

    return response()->json(['message' => 'Vehículo creado correctamente',
    'data' => $vehiculo], 201);
   }


   public function show(string $id){

    $vehiculo = vehiculo::with('usuarios')->findOrFail($id);
    return response()->json ($vehiculo,200);
   }


   public function update(vehiculosRequest $request, string $id ) {

    $vehiculos = vehiculo::findOrFail($id);

    $vehiculos->update($request->all());

    return response()->json(['message' => 'Vehículo actualizado correctamente',
    'data' => $vehiculos], 200);


   }

   public Function destroy(string $id) {

    vehiculo::findOrFail($id)->delete();
    return response()->json('se elimino correctamente',200);

   }


}
