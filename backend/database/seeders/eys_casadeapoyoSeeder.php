<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\eyscasadeapoyo;
use App\Models\usuarios;
use Faker\Factory as Faker;

class eys_casadeapoyoSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create('es_ES');
        $usuarios = usuarios::all();

        foreach ($usuarios as $usuario) {
            // Registrar entrada
            eyscasadeapoyo::create([
                'numeroDocumento' => $usuario->numeroDocumento,
                'tipo' => 'entrada',
                'idusuario' => $usuario->id,
                'fechaRegistro' => $faker->dateTimeBetween('-1 week', 'now'),
            ]);

            // 50% de probabilidad de registrar salida
            if ($faker->boolean(400)) {
                eyscasadeapoyo::create([
                    'numeroDocumento' => $usuario->numeroDocumento,
                    'tipo' => 'salida',
                    'idusuario' => $usuario->id,
                    'fechaRegistro' => $faker->dateTimeBetween('now', '+1 week'),
                ]);
            }
        }
    }
}
