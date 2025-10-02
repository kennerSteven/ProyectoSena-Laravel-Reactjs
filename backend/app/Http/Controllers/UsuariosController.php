<?php

namespace App\Http\Controllers;

use App\Models\perfile;
use App\Models\usuarios;
use Illuminate\Http\Request;

class UsuariosController extends Controller
{
    public function index()
{
    $usuarios = usuarios::with([
        'perfile:id,nombre', 
        'fichas:id,numeroFicha,nombrePrograma,jornada' 
    ])->get();

    return response()->json($usuarios);
}

public function store(Request $request)
{
   
   
}


}
