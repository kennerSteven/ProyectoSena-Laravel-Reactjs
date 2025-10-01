<?php

namespace Database\Seeders;

use App\Models\vehiculo;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class vehiculosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         vehiculo::create([
            'tipoVehiculo' => 'carro',
            'placa' => 'KFD-829',
            'fechaRegistro' => Carbon::now(),
            'idusuario' => 1, 
        ]);

        vehiculo::create([
            'tipoVehiculo' => 'moto',
            'placa' => 'XYZ-452',
            'fechaRegistro' => Carbon::now(),
            'idusuario' => 2, // otro usuario existente
        ]);
    }
}
