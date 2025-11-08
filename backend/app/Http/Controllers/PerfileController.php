<?php

namespace App\Http\Controllers;

use App\Models\perfile;
use App\Http\Controllers\Controller;
use App\Http\Requests\perfilesRequest;
use Illuminate\Http\Request;

class PerfileController extends Controller
{


   public function index(Request $request)
    {
        // Capturamos el parámetro que llega desde el frontend (por ejemplo, ?tipo=instructor)
        $tipo = $request->query('tipo');

        if ($tipo === 'instructor') {
            $perfil = perfile::where('nombre', 'like', '%instructor%')->get();
        } elseif ($tipo === 'administrativo') {
            $perfil = perfile::where('nombre', 'like', '%administrativo%')
                             ->orWhere('nombre', 'like', '%administracion%')
                             ->get();
        } else {
            // Si no se envía tipo, se devuelven todos
            $perfil = perfile::all();
        }

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