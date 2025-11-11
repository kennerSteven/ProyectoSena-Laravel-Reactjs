<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class gymSeeder extends Seeder
{
    

public function run(): void
    {
        $this->call([
            perfilesSeeder::class,   // crea perfiles
            fichasSeeder::class,    // crea fichas
            usuariosSeeder::class,  // crea usuarios
            AprendicesSeeder::class, // crea aprendices
            eys_gymSeeder::class,   // genera entradas y salidas del gym
        ]);
    }

}
