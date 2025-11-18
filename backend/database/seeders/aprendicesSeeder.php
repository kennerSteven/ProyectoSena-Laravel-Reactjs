<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\Models\usuarios;
use App\Models\fichas;
use App\Models\perfile;

class aprendicesSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create('es_ES');

        $idAprendiz = perfile::where('nombre', 'Aprendiz')->value('id');
        $fichas = fichas::pluck('id')->toArray();

        foreach ($fichas as $idficha) {
            // 🔹 Cada ficha tendrá entre 5 y 20 aprendices
            $numAprendices = $faker->numberBetween(5, 20);

            for ($i = 0; $i < $numAprendices; $i++) {
                usuarios::create([
                    'nombre' => $faker->firstName(),
                    'apellido' => $faker->lastName(),
                    'tipoDocumento' => $faker->randomElement(['cc', 'ti']),
                    'numeroDocumento' => $faker->unique()->numerify('##########'),
                    'telefono' => $faker->numerify('3#########'),
                    'tipoSangre' => $faker->randomElement(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
                    'estado' => $faker->randomElement(['activo', 'inactivo']),
                    'fechaRegistro' => $faker->dateTimeBetween('-1 year', 'now'),
                    'idperfil' => $idAprendiz,
                    'idficha' => $idficha,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
