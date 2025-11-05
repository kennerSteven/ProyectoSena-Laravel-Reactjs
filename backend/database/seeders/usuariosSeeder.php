<?php

namespace Database\Seeders;

use App\Models\fichas;
use App\Models\perfile;
use App\Models\usuarios;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class usuariosSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create('es_ES');

        // Obtener los perfiles existentes
        $perfiles = perfile::pluck('id', 'nombre')->toArray();

        // 🔹 Excluir el perfil de "Aprendiz"
        $perfilesSinAprendiz = array_filter($perfiles, function ($nombre) {
            return $nombre !== 'Aprendiz';
        }, ARRAY_FILTER_USE_KEY);

        // Crear 200 usuarios que no sean aprendices
        for ($i = 0; $i < 200; $i++) {

            // Seleccionar un perfil que NO sea aprendiz
            $perfil_id = $faker->randomElement($perfilesSinAprendiz);

            usuarios::create([
                'nombre' => $faker->firstName(),
                'apellido' => $faker->lastName(),
                'tipoDocumento' => $faker->randomElement(['cc', 'ti', 'otro']),
                'numeroDocumento' => $faker->unique()->numerify('##########'),
                'telefono' => $faker->numerify('3#########'),
                'tipoSangre' => $faker->randomElement(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
                'estado' => $faker->randomElement(['activo', 'inactivo']),
                'fechaRegistro' => $faker->dateTimeBetween('-6 months', 'now'),
                'idperfil' => $perfil_id,
                'idficha' => null, 
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
