<?php

namespace App\Http\Controllers;

use App\Models\eys_granja;
use App\Models\eysgranja;
use App\Models\usuarios;
use App\Models\vehiculo;
use Illuminate\Http\Request;

class eys_granjaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $registros = eysgranja::with(['usuarios', 'vehiculo'])->get();
        return response()->json($registros);
    }



    public function entradagranja(Request $request)
{

    $request->validate([
        'numeroDocumento' => ['required', 'numeric', 'digits_between:6,15'],
        'tieneVehiculo' => ['required', 'boolean'],
        'placa' => ['nullable', 'string', 'max:10'],
        'tipoVehiculo' => ['nullable', 'in:moto,carro,bus,otro'],
    ]);


    $usuario = usuarios::where('numeroDocumento', $request->numeroDocumento)->first();

    if (!$usuario) {
        return response()->json(['error' => 'Usuario no encontrado'], 404);
    }

    // Si el frontend dice que tiene vehículo
    if ($request->tieneVehiculo == true) {
        // Registrar el vehículo (sin verificar si existe)
        $vehiculo = vehiculo::create([
            'placa' => strtoupper($request->placa),
            'tipoVehiculo' => $request->tipoVehiculo,
            'idusuario' => $usuario->id,
            'fechaRegistro' => now(),
        ]);

        // Registrar la entrada
        $entrada = eysgranja::create([
            'numeroDocumento' => $usuario->numeroDocumento,
            'tipo' => 'entrada',
            'idusuario' => $usuario->id,
            'fechaRegistro' => now(),
        ]);

        return response()->json([
            'message' => 'Entrada y vehículo registrados correctamente',
            'usuario' => $usuario,
            'vehiculo' => $vehiculo,
            'entrada' => $entrada
        ], 201);
    } else {
        // Si no tiene vehículo
        $entrada = eysgranja::create([
            'numeroDocumento' => $usuario->numeroDocumento,
            'tipo' => 'entrada',
            'idusuario' => $usuario->id,
            'fechaRegistro' => now(),
        ]);

        return response()->json([
            'message' => 'Entrada registrada correctamente (sin vehículo)',
            'usuario' => $usuario,
            'entrada' => $entrada
        ], 201);
    }
}


public function salidagranja(Request $request)
{
    //  Buscar usuario por documento
    $usuario = usuarios::where('numeroDocumento', $request->numeroDocumento)->first();

    if (!$usuario) {
        return response()->json(['error' => 'Usuario no encontrado'], 404);
    }

    // Verificar que tenga una entrada previa sin salida
    $ultimoRegistro = eysgranja::where('idusuario', $usuario->id)->latest()->first();

    if (!$ultimoRegistro || $ultimoRegistro->tipo === 'salida') {
        return response()->json([
            'error' => 'No se puede registrar salida sin una entrada previa.'
        ], 400);
    }

    // 3️⃣ Si el frontend envía que el usuario tiene vehículo
    if ($request->tieneVehiculo == true) {
        // Registrar salida del vehículo
        $vehiculo = vehiculo::create([
            'placa' => strtoupper($request->placa),
            'tipoVehiculo' => $request->tipoVehiculo,
            'idusuario' => $usuario->id,
            'fechaRegistro' => now(),
        ]);

        // Registrar salida de la persona
        $salida = eysgranja::create([
            'numeroDocumento' => $usuario->numeroDocumento,
            'tipo' => 'salida',
            'idusuario' => $usuario->id,
            'fechaRegistro' => now(),
        ]);

        return response()->json([
            'message' => 'Salida registrada correctamente (usuario y vehículo)',
            'usuario' => $usuario,
            'vehiculo' => $vehiculo,
            'salida' => $salida
        ], 201);
    } else {
        // Si no tiene vehículo
        $salida = eysgranja::create([
            'numeroDocumento' => $usuario->numeroDocumento,
            'tipo' => 'salida',
            'idusuario' => $usuario->id,
            'fechaRegistro' => now(),
        ]);

        return response()->json([
            'message' => 'Salida registrada correctamente (sin vehículo)',
            'usuario' => $usuario,
            'salida' => $salida
        ], 201);
    }
}

    

    /**
     * Display the specified resource.
     */
    public function show()
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit()
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, )
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy()
    {
        //
    }
}
