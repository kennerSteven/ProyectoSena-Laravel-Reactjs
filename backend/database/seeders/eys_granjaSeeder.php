<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\eysgranja;
use App\Models\vehiculo;
use App\Models\usuarios;
use Faker\Factory as Faker;

class eys_granjaSeeder extends Seeder
{
    public function run(): void
    {
       $faker = Faker::create('es_ES');
    $usuarios = usuarios::all();

    foreach ($usuarios as $usuario) {
        $vehiculo = vehiculo::where('idusuario', $usuario->id)->inRandomOrder()->first();

        $movimientos = $faker->numberBetween(1, 3);
        $ultimoTipo = null;

        for ($i = 0; $i < $movimientos; $i++) {
            $tipo = $ultimoTipo === 'entrada' ? 'salida' : 'entrada';

            eysgranja::create([
                'numeroDocumento' => $usuario->numeroDocumento,
                'tipo' => $tipo,
                'idusuario' => $usuario->id,
                'idvehiculo' => $vehiculo?->id,
                'fechaRegistro' => $faker->dateTimeBetween('-1 month', 'now'),
            ]);

            $ultimoTipo = $tipo;
        }
    }

    // 🚗 Entradas de vehículos SIN usuario (por ejemplo visitantes o repartidores)
    $vehiculosSinUsuario = vehiculo::whereNull('idusuario')->inRandomOrder()->take(5)->get();

    foreach ($vehiculosSinUsuario as $vehiculo) {
        eysgranja::create([
            'numeroDocumento' => $vehiculo->placa ?? $faker->numerify('#######'),
            'tipo' => 'entrada',
            'idvehiculo' => $vehiculo->id,
            'idusuario' => null,
            'fechaRegistro' => $faker->dateTimeBetween('-1 month', 'now'),
        ]);
    }
    }
}
