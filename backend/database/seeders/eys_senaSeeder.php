<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\eyssena;
use App\Models\usuarios;
use Faker\Factory as Faker;

class eys_senaSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create('es_ES');
        $usuarios = usuarios::all();

        foreach ($usuarios as $usuario) {
            // Crear entrada al SENA
            eyssena::create([
                'numeroDocumento' => $usuario->numeroDocumento,
                'tipo' => 'entrada',
                'idusuario' => $usuario->id,
                'fechaRegistro' => $faker->dateTimeBetween('-5 days', 'now'),
            ]);

            // 50% de probabilidad de registrar salida
            if ($faker->boolean(400)) {
                eyssena::create([
                    'numeroDocumento' => $usuario->numeroDocumento,
                    'tipo' => 'salida',
                    'idusuario' => $usuario->id,
                    'fechaRegistro' => $faker->dateTimeBetween('now', '+1 days'),
                ]);
            }
        }
    }
}
