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

    // Cargar perfiles
    $perfiles = perfile::pluck('id', 'nombre')->toArray();

    // Filtrar perfiles sin Aprendiz
    $perfilesSinAprendiz = array_filter($perfiles, function ($nombre) {
        return $nombre !== 'Aprendiz';
    }, ARRAY_FILTER_USE_KEY);

    for ($i = 0; $i < 200; $i++) {

        $perfilNombre = $faker->randomElement(array_keys($perfilesSinAprendiz));
        $perfil_id = $perfilesSinAprendiz[$perfilNombre];

        // 1. Lógica para definir el tipo de documento
        if (str_contains($perfilNombre, 'Instructor')) { // Usamos str_contains para capturar ambos
            $tipoDocumento = 'cc';
        } else {
            $tipoDocumento = $faker->randomElement(['cc', 'ti', 'otro']);
        }

        // 2. 🟢 Lógica para FORZAR el estado a ACTIVO solo para Instructor Planta
        $estado = $faker->randomElement(['activo', 'inactivo']); // Estado aleatorio por defecto

        if ($perfilNombre === 'Instructor Planta') {
            $estado = 'activo'; // Forzar a activo para Instructores de Planta
        }
        // -------------------------------------------------------------------------

        usuarios::create([
            'nombre' => $faker->firstName(),
            'apellido' => $faker->lastName(),
            'tipoDocumento' => $tipoDocumento,
            'numeroDocumento' => $faker->unique()->numerify('##########'),
            'telefono' => $faker->numerify('3#########'),
            'tipoSangre' => $faker->randomElement(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
            'estado' => $estado, // Usa la variable $estado ajustada
            'fechaRegistro' => $faker->dateTimeBetween('-6 months', 'now'),
            'idperfil' => $perfil_id,
            'idficha' => null,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
}
