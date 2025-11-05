<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
{
     $this->call([
            perfilesSeeder::class,
            FichasSeeder::class,
            UsuariosSeeder::class,
            AprendicesSeeder::class, 
            VehiculosSeeder::class,
            eys_granjaSeeder::class,
        ]);
}
}
