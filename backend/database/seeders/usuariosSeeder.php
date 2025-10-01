<?php

namespace Database\Seeders;

use App\Models\usuarios;
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
    'idperfil' => 1,
]);

usuarios::create([
    'nombre' => 'María',
    'apellido' => 'López',
    'tipoDocumento' => 'ti',
    'numeroDocumento' => '1234567890',
    'telefono' => '3207654321',
    'tipoSangre' => 'A-',
    'estado' => 'activo', 
    'idperfil' => 2,
]);
    }
}
