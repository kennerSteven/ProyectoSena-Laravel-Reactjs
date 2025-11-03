<?php

namespace Database\Seeders;

use App\Models\fichas;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;

class fichasSeeder extends Seeder
{
   public function run(): void
    {
        $faker = Faker::create('es_ES');

        for ($i = 0; $i < 500; $i++) {
            fichas::create([
                'numeroFicha' => $faker->unique()->numerify('#######'),
                'nombrePrograma' => $faker->randomElement([
                    'Análisis y Desarrollo de Software',
                    'Cocina',
                    'Contabilidad y Finanzas',
                    'Gestión Empresarial',
                    'Mecatrónica',
                    'Diseño Gráfico',
                    'Salud Ocupacional',
                    'Marketing Digital',
                    'Panadería y Pastelería',
                    'Gestión del Talento Humano'
                ]),
                'jornada' => $faker->randomElement(['Mañana', 'Tarde', 'Noche']),
                'estado' => $faker->randomElement(['activo', 'inactivo']),
            ]);
        }
    }
}
