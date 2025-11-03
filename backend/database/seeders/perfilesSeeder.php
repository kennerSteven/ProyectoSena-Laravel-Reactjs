<?php

namespace Database\Seeders;

use App\Models\perfile;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class perfilesSeeder extends Seeder
{
    public function run(): void
    {
        $perfiles = [
            ['nombre' => 'Administrador', 'descripcion' => 'Gestiona todo el sistema, usuarios y configuraciones.'],
            ['nombre' => 'Instructor', 'descripcion' => 'Encargado de guiar y evaluar a los aprendices.'],
            ['nombre' => 'Aprendiz', 'descripcion' => 'Usuario en formación dentro del sistema.'],
            ['nombre' => 'Visitante', 'descripcion' => 'Usuario temporal con acceso restringido.'],
            ['nombre' => 'Contratista', 'descripcion' => 'Usuario con funciones específicas dentro del centro.'],
            ['nombre' => 'Seguridad', 'descripcion' => 'Controla accesos, entradas y salidas de usuarios.'],
        ];

        foreach ($perfiles as $perfil) {
            perfile::create($perfil);
        }
    }
}
