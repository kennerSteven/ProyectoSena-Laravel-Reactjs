<?php

namespace Database\Seeders;

use App\Models\usuarios;
use App\Models\vehiculo;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;

class vehiculosSeeder extends Seeder
{
     public function run(): void
    {
        $faker = Faker::create('es_ES');

        // Traemos todos los IDs de usuarios activos
        $usuarios = usuarios::where('estado', 'activo')->pluck('id')->toArray();

        // Si no hay usuarios, mostramos advertencia
        if (empty($usuarios)) {
            $this->command->warn(' No hay usuarios activos para asignar vehículos.');
            return;
        }

        // Generamos 300 vehículos
        for ($i = 0; $i < 300; $i++) {
            vehiculo::create([
                'tipoVehiculo' => $faker->randomElement(['moto', 'carro', 'bus', 'otro']),
                'placa' => strtoupper($faker->bothify('???-###')),
                'fechaRegistro' => $faker->dateTimeBetween('-6 months', 'now')->format('Y-m-d H:i:s'),
                'idusuario' => $faker->randomElement($usuarios),
            ]);
        }

        $this->command->info(' Se generaron 300 vehículos correctamente.');
    }
}
