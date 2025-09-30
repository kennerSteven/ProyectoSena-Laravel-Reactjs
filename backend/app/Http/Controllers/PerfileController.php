<?php

namespace App\Http\Controllers;

use App\Models\perfile;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PerfileController extends Controller
{


    public function index()
    {
        $perfil = perfile::all();
        return response()->json($perfil);
    }





    public function store(Request $request)
    {
        perfile::create($request->all());
        return response()->json('Creado Correctamente');
    }




    public function show(string $id)
    {
        $item = perfile::findOrFail($id);
        return response()->json($item);
    }


    public function update(Request $request, string $id)
    {
        $perfil = perfile::findOrFail($id);
        $perfil->update($request->all());
        return response()->json('se actualizo correctamente');
    }


    public function destroy(string $id)
    {
        $perfil = perfile::findOrFail($id);
        $perfil->delete();
        return response()->json('se elimino');
    }
}