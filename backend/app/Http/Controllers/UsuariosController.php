<?php

namespace App\Http\Controllers;

use App\Models\eyscasadeapoyo;
use App\Models\eysgranja;
use App\Models\eysgym;
use App\Models\eyssena;
use App\Models\perfile;
use App\Models\usuarios;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UsuariosController extends Controller
{
    public function index()
    {

        $usuario = usuarios::with('perfile', 'fichas')->get();
        return response()->json($usuario);

    }

    public function store(Request $request)
    {

        if ($request->has('foto')) {
            $fotoBase64 = $request->input('foto');
            $foto = preg_replace('/^data:image\/\w+;base64,/', '', $fotoBase64);
            $foto = str_replace(' ', '+', $foto);
            $nombreFoto = 'usuario_' . time() . '.png';
            Storage::disk('public')->put('fotos/' . $nombreFoto, base64_decode($foto));
            $request['foto'] = 'storage/fotos/' . $nombreFoto;
        }


        $usuario = usuarios::create($request->all());






        return response()->json([
            'message' => 'Usuario y entrada registrados correctamente',
            'usuario' => $usuario

        ], 201);
    }






    public function show(string $id)
    {

        $usuario = usuarios::with('perfile', 'fichas')->findOrFail($id);
        return response()->json($usuario, 200);
    }


    public function update(Request $request, string $id)
    {

        $usuario = usuarios::findOrFail($id);

        $usuario->update($request->all());

        return response()->json([
            'message' => 'Usuario actualizado correctamente',
            'data' => $usuario
        ], 200);


    }

    public function destroy(string $id)
    {

        usuarios::findOrFail($id)->delete();
        return response()->json('se elimino correctamente', 200);



    }

    public function listarVisitantesDesactivados()
    {
        $visitantes = usuarios::where('estado', 'inactivo')
            ->whereHas('perfile', function ($q) {
                $q->where('nombre', 'Visitante');
            })
            ->get();

        if ($visitantes->isEmpty()) {
            return response()->json(['message' => 'No hay visitantes desactivados.']);
        }

        return response()->json([
            'message' => 'Listado de visitantes desactivados',
            'usuarios' => $visitantes
        ]);
    }

    public function listarInstructoresContratoDesactivados()
    {
        $instructores = usuarios::where('estado', 'inactivo')
            ->whereHas('perfile', function ($q) {
                $q->where('nombre', 'Instructor contrato');
            })
            ->get();

        if ($instructores->isEmpty()) {
            return response()->json(['message' => 'No hay instructores contrato desactivados.']);
        }

        return response()->json([
            'message' => 'Listado de instructores contrato desactivados',
            'usuarios' => $instructores
        ]);
    }


    public function listarAdministrativosContratoDesactivados()
    {
        $administrativos = usuarios::where('estado', 'inactivo')
            ->whereHas('perfile', function ($q) {
                $q->where('nombre', 'Administrativo contrato');
            })
            ->get();

        if ($administrativos->isEmpty()) {
            return response()->json(['message' => 'No hay administrativos contrato desactivados.']);
        }

        return response()->json([
            'message' => 'Listado de administrativos contrato desactivados',
            'usuarios' => $administrativos
        ]);
    }











}
