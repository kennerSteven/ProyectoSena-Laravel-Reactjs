<?php

namespace App\Http\Controllers;

use App\Models\perfile;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PerfileController extends Controller
{

    // public function index()
    // {
    //     $perfiles = perfile::all();
    //     return view('perfil.index', compact('perfiles'));
    // }

    public function index()
    {
        $perfil = perfile::all();
        return response()->json($perfil);
    }



    public function create()
    {
        return view('perfil.create');
    }

    public function store(Request $request)
    {
        perfile::create(request()->all());
        return redirect()->route('perfiles.index');
    }




    public function edit($id)
    {
        $item = perfile::findOrFail($id);
        return view('perfil.edit', compact('item'));
    }


    public function update(Request $request, $id)
    {
        $perfil = perfile::findOrFail($id);
        $perfil->update($request->all());
        return redirect()->route('perfiles.index');
    }


    public function destroy($id)
    {
        $perfil = perfile::findOrFail($id);
        $perfil->delete();
        return redirect()->route('perfiles.index');
    }
}
