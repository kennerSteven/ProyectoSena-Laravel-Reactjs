<?php

namespace Database\Seeders;

use App\Models\fichas;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class fichasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        fichas::create([
            'numeroFicha'    => '2424185',
            'nombrePrograma' => 'Tecnología en Análisis y Desarrollo de Software',
            'jornada'        => 'Mañana',
            'estado'         => 'activo',
        ]);

        fichas::create([
            'numeroFicha'    => '2424167',
            'nombrePrograma' => 'Técnico en Cocina',
            'jornada'        => 'Tarde',
            'estado'         => 'inactivo',
        ]);
    }
}
