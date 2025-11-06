<?php

namespace Database\Seeders;

use App\Models\perfile;
use Illuminate\Database\Seeder;

class perfilesSeeder extends Seeder
{
    public function run(): void
    {
        $perfiles = [
            [
                'nombre' => 'Visitante',
                'descripcion' => 'Usuario temporal con acceso limitado al sistema.'
            ],
            [
                'nombre' => 'Aprendiz',
                'descripcion' => 'Usuario en formación dentro del sistema (tiene ficha asignada).'
            ],
            [
                'nombre' => 'Instructor de Contrato',
                'descripcion' => 'Instructor contratado por un periodo determinado para formación o apoyo académico.'
            ],
            [
                'nombre' => 'Instructor de Planta',
                'descripcion' => 'Instructor perteneciente a la planta del centro de formación.'
            ],
            [
                'nombre' => 'Administrativo de Planta',
                'descripcion' => 'Personal administrativo que hace parte de la planta del centro.'
            ],
            [
                'nombre' => 'Administrativo de Contrato',
                'descripcion' => 'Personal administrativo contratado temporalmente.'
            ],
        ];

        foreach ($perfiles as $perfil) {
            perfile::create($perfil);
        }
    }
}
