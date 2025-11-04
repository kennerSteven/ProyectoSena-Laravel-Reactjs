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
            // Buscar si tiene un vehículo registrado
            $vehiculo = vehiculo::where('idusuario', $usuario->id)->inRandomOrder()->first();

            // Entre 1 y 3 registros por usuario
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
    }
}
