<?php

namespace App\Http\Controllers;

use App\Http\Requests\fichasRequest;
use App\Models\fichas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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

     public function mostrarFicha($id)
    {
        
        $ficha = fichas::with('usuarios')->find($id);

        if (!$ficha) {
            return response()->json(['error' => 'Ficha no encontrada'], 404);
        }

       
        $totalUsuarios = $ficha->usuarios->count();

        return response()->json([
            'ficha' => $ficha,
            'total_usuarios' => $totalUsuarios
        ]);
    }


    public function fichasConMasUsuarios()
{
    $fichas = fichas::select(
            'fichas.id',
            'fichas.numeroFicha',
            'fichas.nombrePrograma',
            DB::raw('COUNT(usuarios.id) as total_usuarios')
        )
        ->leftJoin('usuarios', 'usuarios.idficha', '=', 'fichas.id')
        ->groupBy('fichas.id', 'fichas.numeroFicha', 'fichas.nombrePrograma')
        ->orderByDesc('total_usuarios')
        ->get();

    return response()->json($fichas);
}
}
