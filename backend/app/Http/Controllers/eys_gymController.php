<?php

namespace App\Http\Controllers;


use App\Models\eysgym;
use App\Models\usuarios;
use Carbon\Carbon;
use Illuminate\Http\Request;

class eys_gymController extends Controller
{
    
    public function index()
{
    $registros = eysgym::with(['usuarios.perfile'])
        ->orderBy('fechaRegistro', 'desc') // Más recientes primero
        ->get();

    return response()->json($registros);
}

   
    public function entradagym(Request $request)
{
    
    $request->validate([
        'numeroDocumento' => ['required', 'numeric', 'digits_between:6,15'],
    ]);

    
   $usuario = usuarios::where('numeroDocumento', $request->numeroDocumento)->first();

    if ($usuario && $usuario->perfile->nombre === 'Visitante' && $usuario->estado === 'inactivo') {
        $usuario->estado = 'activo';
        $usuario->fechaExpiracion = null; 
        $usuario->save();
    }

    
    $entrada = eysgym::create([
        'numeroDocumento' => $usuario->numeroDocumento,
        'tipo' => 'entrada',
        'idusuario' => $usuario->id,
        'fechaRegistro' => now(),
    ]);

    $entrada->fechaRegistro = Carbon::parse($entrada->fechaRegistro)
        ->timezone('America/Bogota')
        ->format('Y-m-d H:i:s');


    
    return response()->json([
        'message' => 'Entrada registrada correctamente',
        'entrada' => $entrada
    ]);
}



     public function salidagym(Request $request)
{
    
    $request->validate([
        'numeroDocumento' => ['required', 'numeric', 'digits_between:6,15'],
    ]);

    
    $usuario = usuarios::where('numeroDocumento', $request->numeroDocumento)->first();

    
    $ultimoRegistro = eysgym::where('idusuario', $usuario->id)->latest()->first();

   
    if (!$ultimoRegistro || $ultimoRegistro->tipo === 'salida') {
        return response()->json([
            'error' => 'No se puede registrar salida sin una entrada previa.'
        ], 400);
    }

   
    $salida = eysgym::create([
        'numeroDocumento' => $usuario->numeroDocumento,
        'tipo' => 'salida',
        'idusuario' => $usuario->id,
        'fechaRegistro' => now(),
    ]);

    if ($usuario->perfile->nombre === 'Visitante') {
        $usuario->fechaExpiracion = now()->addHours(12);
        $usuario->save();
    }

    $salida->fechaRegistro = Carbon::parse($salida->fechaRegistro)
        ->timezone('America/Bogota')
        ->format('Y-m-d H:i:s');

   
    return response()->json([
        'message' => 'Salida registrada correctamente',
        'salida' => $salida
    ]);
}

public function salidaMasivaGym()
{
    // 1. Traer SOLO las ENTRADAS sin una SALIDA posterior
    $usuariosConEntradaPendiente = eysgym::where('tipo', 'entrada')
        ->whereNotIn('id', function ($query) {
            $query->select('entrada.id')
                  ->from('eys_gym as entrada')
                  ->join('eys_gym as salida', function ($join) {
                      $join->on('entrada.numeroDocumento', '=', 'salida.numeroDocumento')
                           ->where('salida.tipo', '=', 'salida')
                           ->whereColumn('salida.fechaRegistro', '>', 'entrada.fechaRegistro');
                  });
        })
        ->get();

    if ($usuariosConEntradaPendiente->isEmpty()) {
        return response()->json([
            'message' => 'No hay usuarios dentro del GYM para registrar salida masiva.'
        ]);
    }

    // 2. Registrar SALIDA para cada uno
    foreach ($usuariosConEntradaPendiente as $entrada) {

        eysgym::create([
            'numeroDocumento' => $entrada->numeroDocumento,
            'tipo' => 'salida',
            'idusuario' => $entrada->idusuario,
            'fechaRegistro' => now(),
        ]);

        // Inactivar SOLO visitantes
        $usuario = $entrada->usuarios;
        if ($usuario && $usuario->perfile->nombre === 'Visitante') {
            $usuario->fechaExpiracion = now()->addHours(12);
            $usuario->save();
        }
    }

    return response()->json([
        'message' => 'Salida masiva registrada correctamente en el GYM.',
        'total' => $usuariosConEntradaPendiente->count()
    ]);
}

    




 public function buscarPorDocumento($numeroDocumento)
{
    $usuario = usuarios::with('perfile', 'fichas')
        ->where('numeroDocumento', $numeroDocumento)
        ->first();

    if (!$usuario) {
        return response()->json(['error' => 'Usuario no encontrado'], 404);
    }

    return response()->json([
        'message' => 'Usuario encontrado',
        'usuario' => $usuario
    ]);
}

public function EstadisticasEntradasKPI()
{
    $totalEntradas = eysgym::where('tipo', 'entrada')->count();


    $entradasHoy = eysgym::where('tipo', 'entrada')
        ->whereDate('fechaRegistro', now()->toDateString())
        ->count();

    $porcentaje = $totalEntradas > 0
        ? round(($entradasHoy / $totalEntradas) * 100, 2)
        : 0;

    $porPerfil = eysgym::with('usuarios.perfile:id,nombre')
        ->where('tipo', 'entrada')
        ->get()
        ->groupBy(function ($item) {
           
            if ($item->usuarios && $item->usuarios->perfile) {
                return $item->usuarios->perfile->nombre;
            }
            
            return 'Visitante';
        })
        ->map(function ($grupo) {
            return [
                'perfil' => $grupo->first()->usuarios->perfile->nombre
                    ?? 'Visitante',
                'cantidad' => $grupo->count(),
            ];
        })
        ->values();

    return response()->json([
        'porcentaje' => $porcentaje,
        'porperfil' => $porPerfil,
        'total' => $totalEntradas,
    ]);
}

public function EstadisticasSalidasKPI()
{
    
    $totalSalidas = eysgym::where('tipo', 'salida')->count();

    $salidasHoy = eysgym::where('tipo', 'salida')
        ->whereDate('fechaRegistro', now()->toDateString())
        ->count();

    
    $porcentaje = $totalSalidas > 0
        ? round(($salidasHoy / $totalSalidas) * 100, 2)
        : 0;

    
    $porPerfil = eysgym::with('usuarios.perfile:id,nombre')
        ->where('tipo', 'salida')
        ->get()
        ->groupBy(function ($item) {
            if ($item->usuarios && $item->usuarios->perfile) {
                return $item->usuarios->perfile->nombre;
            }
            return 'Visitante';
        })
        ->map(function ($grupo) {
            return [
                'perfil' => $grupo->first()->usuarios->perfile->nombre
                    ?? 'Visitante',
                'cantidad' => $grupo->count(),
            ];
        })
        ->values();

    return response()->json([
        'porcentaje' => $porcentaje,
        'porperfil' => $porPerfil,
        'total' => $totalSalidas,
    ]);
}



   
    
}
