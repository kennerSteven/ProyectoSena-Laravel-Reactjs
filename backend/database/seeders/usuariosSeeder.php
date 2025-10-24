<?php

namespace Database\Seeders;

use App\Models\fichas;
use App\Models\perfile;
use App\Models\usuarios;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;

class usuariosSeeder extends Seeder
{
 public function run(): void
    {
        $faker = Faker::create('es_ES');

        // Obtener los IDs disponibles
        $perfiles = perfile::pluck('id', 'nombre')->toArray();
        $fichas = fichas::pluck('id')->toArray();

        // Buscar ID del perfil "Aprendiz"
        $idAprendiz = $perfiles['Aprendiz'] ?? null;

        // Crear 300 usuarios
        for ($i = 0; $i < 300; $i++) {
            // Elegimos un perfil al azar
            $perfil_id = $faker->randomElement($perfiles);

            // Si el usuario es aprendiz, le asignamos una ficha al azar
            $idficha = null;
            if ($perfil_id == $idAprendiz && count($fichas) > 0) {
                $idficha = $faker->randomElement($fichas);
            }

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
                'idficha' => $idficha,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
