<?php

namespace App\Http\Controllers;

use App\Http\Requests\vehiculosRequest;
use App\Models\usuarios;
use App\Models\vehiculo;
use Illuminate\Http\Request;

class VehiculoController extends Controller
{
     public function index()
    {
        $vehiculos = vehiculo::all();
        return response()->json($vehiculos);
    }

   
     public function store(vehiculosRequest $request)
    {
        $vehiculos = vehiculo::create($request->all());
        return response()->json([$vehiculos], 201);
    }
   

     public function show($id)
    {
        $vehiculos = vehiculo::findOrFail($id);
        $usuario =  usuarios::all();
        
        return response()->json([$vehiculos, $usuario]);
    }

    public function update(vehiculosRequest $request, $id)
   {
    $vehiculos = vehiculo::findOrFail($id);
    $vehiculos->update($request->all());

    return response()->json([ $vehiculos]);
   }


   public function destroy($id)
  {
    $vehiculos = vehiculo::findOrFail($id);
    $vehiculos->delete();

    return response()->json(['message' => 'vehiculo eliminado correctamente']);
  }

}
