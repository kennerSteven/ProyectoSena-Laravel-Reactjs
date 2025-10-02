<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class vehiculo extends Model
{
     protected $table = 'vehiculos';
     protected $fillable = [

        'tipoVehiculo',
        'placa',
        'fechaRegistro',
        'idusuario'
    ];

    
    
 


}
