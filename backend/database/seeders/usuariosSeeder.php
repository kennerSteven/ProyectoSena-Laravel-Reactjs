<?php

namespace Database\Seeders;

use App\Models\usuarios;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class usuariosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       usuarios::create([
            'nombre' => 'Juan',
            'apellido' => 'Pérez',
            'tipoDocumento' => 'cc',
            'numeroDocumento' => '1002003001',
            'telefono' => '3101234567',
            'tipoSangre' => 'O+',
            'estado' => 'activo',
            'fechaRegistro' => Carbon::now(),
            'fechaExpiracion' => '2026-10-01',
            'fechaFinContrato' => '2027-10-01',
            'foto' => 'juan.jpg',
            'idperfil' => 1, // 
        ]);

        
          usuarios::create([
            'nombre' => 'María',
            'apellido' => 'López',
            'tipoDocumento' => 'ti',
            'numeroDocumento' => '1234567890',
            'telefono' => '3207654321',
            'tipoSangre' => 'A-',
            'estado' => 'activo',
            'fechaRegistro' => Carbon::now(),
            'fechaExpiracion' => '2026-05-01',
            'fechaFinContrato' => '2027-05-01',
            'foto' => 'maria.png',
            'idperfil' => 2, 
        ]);
    }
}
