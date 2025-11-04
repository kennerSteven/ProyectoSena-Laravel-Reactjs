<?php

namespace App\Http\Controllers;

use App\Services\dashService;
use Illuminate\Http\Request;

class dashcontroller extends Controller
{
    

    protected $dashService;

    public function __construct(dashService $dashService){

      $this->dashService = $dashService;
    }



public function principal(){

   $data = [
            'totalusuarios' => $this->dashService->EstadisticasUsuarios(),
            'porperfil' => $this->dashService->EstadisticasUsuarios(),
          ];
  $estadisitica = [
          
            'totalfichas' => $this->dashService->estadisticasFichas(),
            'porjornada' => $this->dashService->estadisticasFichas(),
  ];         


        
        return response()->json($data, $estadisitica);

}


public function ventas (){
    return view('dashboard.dashventas');
}


}
