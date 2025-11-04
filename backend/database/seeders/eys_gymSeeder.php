<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\eysgym;
use App\Models\usuarios;
use Faker\Factory as Faker;

class eys_gymSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create('es_ES');
        $usuarios = usuarios::all();

        foreach ($usuarios as $usuario) {
            // Crear entrada
            eysgym::create([
                'numeroDocumento' => $usuario->numeroDocumento,
                'tipo' => 'entrada',
                'idusuario' => $usuario->id,
                'fechaRegistro' => $faker->dateTimeBetween('-7 days', 'now'),
            ]);

            // 50% de probabilidad de registrar salida
            if ($faker->boolean(400)) {
                eysgym::create([
                    'numeroDocumento' => $usuario->numeroDocumento,
                    'tipo' => 'salida',
                    'idusuario' => $usuario->id,
                    'fechaRegistro' => $faker->dateTimeBetween('now', '+2 days'),
                ]);
            }
        }
    }
}
