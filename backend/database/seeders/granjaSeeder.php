<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class granjaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->call([
            perfilesSeeder::class,   // crea perfiles
            fichasSeeder::class,    // crea fichas
            usuariosSeeder::class,  // crea usuarios
            AprendicesSeeder::class, // crea aprendices
            vehiculosSeeder::class,
            eys_granjaSeeder::class,   // genera entradas y salidas del gym
        ]);
    }
}
