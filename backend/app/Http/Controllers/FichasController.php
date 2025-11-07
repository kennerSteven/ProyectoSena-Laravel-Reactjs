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

    public function listarusuariosdelaFicha($id)
{
    
    $ficha = fichas::with(['usuarios.perfile'])->find($id);

    if (!$ficha) {
        return response()->json(['error' => 'Ficha no encontrada'], 404);
    }

    $totalUsuarios = $ficha->usuarios->count();

    return response()->json([
        'ficha' => $ficha,
        'total_usuarios' => $totalUsuarios
    ]);
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


   public function destroy($id)
{
    // Buscar la ficha con sus usuarios
    $ficha = fichas::with('usuarios')->find($id);

    if (!$ficha) {
        return response()->json(['error' => 'Ficha no encontrada'], 404);
    }

    if ($ficha->estado === 'activo') {
        return response()->json([
            'error' => 'No se puede eliminar una ficha activa. Cambia su estado si quieres borrarla.'
        ], 400);
    }

    // Eliminar primero los usuarios asociados
    $ficha->usuarios()->delete();

    // Luego eliminar la ficha
    $ficha->delete();

    return response()->json([
        'message' => 'Ficha y usuarios asociados eliminados correctamente.'
    ]);
}


public function destroyMasivo(Request $request)
{
    // Recibimos un array de IDs de fichas a eliminar
    $ids = $request->input('ids'); // ejemplo: [15,16,17]

    if (!$ids || !is_array($ids)) {
        return response()->json(['error' => 'Debes enviar un array de IDs'], 400);
    }

    // Traer las fichas
    $fichas = fichas::whereIn('id', $ids)->get();

    if ($fichas->isEmpty()) {
        return response()->json(['error' => 'No se encontraron fichas para eliminar'], 404);
    }

    $eliminadas = [];
    $noEliminadas = [];

    foreach ($fichas as $ficha) {
        // Validar si la ficha está activa
        if ($ficha->estado === 'activo') {
            $noEliminadas[] = $ficha->id;
            continue;
        }

        // Eliminar ficha + usuarios (booted() en el modelo se encarga de los usuarios)
        $ficha->delete();
        $eliminadas[] = $ficha->id;
    }

    return response()->json([
        'message' => 'Proceso de eliminación masiva completado.',
        'eliminadas' => $eliminadas,
        'noEliminadas' => $noEliminadas
    ]);
}





  public function desactivarFicha($id)
{
    // Buscar ficha por ID con sus usuarios
    $ficha = fichas::with('usuarios')->find($id);

    if (!$ficha) {
        return response()->json(['error' => 'Ficha no encontrada'], 404);
    }

    if ($ficha->estado === 'inactivo') {
        return response()->json(['message' => 'La ficha ya está inactiva.'], 400);
    }

    // Cambiar estado de la ficha a inactivo
    $ficha->estado = 'inactivo';
    $ficha->save();

    // Cambiar estado de todos los usuarios asociados a inactivo
    $ficha->usuarios()->update(['estado' => 'inactivo']);

    return response()->json([
        'message' => 'Ficha y usuarios asociados desactivados correctamente.',
        'ficha' => $ficha
    ]);
}



public function listarFichasActivas()
{
    $fichas = fichas::where('estado', 'activo')
        ->select('id', 'numeroFicha', 'nombrePrograma', 'jornada', 'estado')
        ->get();

    return response()->json([
        'message' => 'Listado de fichas activas',
        'fichas' => $fichas
    ]);
}



public function listarusuariosDeFichadesactivada($id)
{
    // Trae la ficha junto con los usuarios INACTIVOS
    $ficha = fichas::with(['usuarios' => function($query) {
    $query->where('estado', 'inactivo') //  solo los usuarios inactivos
              ->select('id', 'nombre', 'apellido', 'tipoDocumento', 'numeroDocumento', 'estado', 'telefono', 'idficha');
    }])->where('estado', 'inactivo') ->find($id);

    if (!$ficha) {
        return response()->json(['error' => 'Ficha no encontrada o no está inactiva'], 404);
    }

    return response()->json([
        'message' => 'Usuarios de la ficha inactiva',
        'ficha' => $ficha,
        'usuarios' => $ficha->usuarios
    ]);
}





/*kpi*/
public function fichasConMasAprendices()
{
    $fichas = DB::table('fichas')
        ->join('usuarios', 'usuarios.idficha', '=', 'fichas.id')
        ->join('perfiles', 'usuarios.idperfil', '=', 'perfiles.id')
        ->where('perfiles.nombre', 'Aprendiz')
        ->select(
            'fichas.id',
            'fichas.numeroFicha',
            'fichas.nombrePrograma',
            DB::raw('COUNT(usuarios.id) as total_aprendices')
        )
        ->groupBy('fichas.id', 'fichas.numeroFicha', 'fichas.nombrePrograma')
        ->orderByDesc('total_aprendices')
        ->get();

    return response()->json([
        'message' => 'Fichas con más aprendices',
        'data' => $fichas
    ]);
}
    


public function listarFichasPorEstado()
{
    $fichasActivas = fichas::where('estado', 'activo')
        ->withCount('usuarios')
        ->get();

    $fichasInactivas = fichas::where('estado', 'inactivo')
        ->withCount('usuarios')
        ->get();

    return response()->json([
        'message' => 'Fichas agrupadas por estado',
        'activas' => $fichasActivas,
        'inactivas' => $fichasInactivas
    ]);
}





}
