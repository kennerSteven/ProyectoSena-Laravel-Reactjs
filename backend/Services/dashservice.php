<?php

namespace App\Services;

use App\Models\fichas;
use App\Models\perfile;
use App\Models\usuarios;

class dashService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        
    }


    public function EstadisticasUsuarios(){
        
     $totalUsuarios = usuarios::count();

        
        $porPerfil = usuarios::with('perfile:id,nombre')->selectRaw('idperfil, COUNT(*) as cantidad')->groupBy('idperfil')
        ->get()->map(function ($usuario) {
               
        return [
        'perfil' => $usuario->perfile->nombre,
        'cantidad' => $usuario->cantidad,]; });

         return [
        'totalusuarios' => $totalUsuarios,
        'porperfil' => $porPerfil,];
    

    }


    public function estadisticasFichas()
{
    
    $totalFichas = fichas::count();

    
    $porJornada = fichas::selectRaw('jornada, COUNT(*) as cantidad')
        ->where('activo', 1)
        ->groupBy('jornada')
        ->get();

    
    return [
        'totalfichas' => $totalFichas,
        'porjornada' => $porJornada
    ];
}




}



