<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class senaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         $this->call([
            perfilesSeeder::class,     
            fichasSeeder::class,      
            usuariosSeeder::class,    
            AprendicesSeeder::class,  
            eys_senaSeeder::class,    
        ]);
    }
}
