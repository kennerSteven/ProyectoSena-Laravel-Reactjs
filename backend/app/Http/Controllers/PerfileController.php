<?php

namespace App\Http\Controllers;

use App\Models\perfile;
use App\Http\Controllers\Controller;
use App\Http\Requests\perfilesRequest;
use Illuminate\Http\Request;

class PerfileController extends Controller
{


    public function index()
    {
        $perfil = perfile::all();
        return response()->json($perfil);
    }



    public function store(perfilesRequest $request)
    {
        perfile::create($request->all());
        return response()->json('Creado Correctamente');
    }




    public function show(string $id)
    {
        $item = perfile::findOrFail($id);
        return response()->json($item);
    }


    public function update(perfilesRequest $request, string $id)
    {
        $perfil = perfile::findOrFail($id);
        $perfil->update($request->all());
        return response()->json('se actualizo correctamente');
    }


    public function destroy()
    {
        return response()->json(['error' => 'No se puede eliminar']);

    }
}