<?php

namespace App\Http\Controllers;

use App\Http\Requests\fichasRequest;
use App\Models\fichas;
use Illuminate\Http\Request;

class FichasController extends Controller
{
    
    public function index()
    {
        $ficha = fichas::all();
        return response()->json($ficha);
    }



    public function store(fichasRequest $request)
    {
        fichas::create($request->all());
        return response()->json('Creado Correctamente');
    }




    public function show(string $id)
    {
        $ficha = fichas::findOrFail($id);
        return response()->json($ficha);
    }


    public function update(fichasRequest $request, string $id)
    {
        $ficha = fichas::findOrFail($id);
        $ficha->update($request->all());
        return response()->json('se actualizo correctamente');
    }


    public function destroy()
    {
        return response()->json(['error' => 'No se puede eliminar']);

    }
}
