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

    public function usuarios() {

         return $this->belongsTo(usuarios::class,'idusuario');
    }

    public function eysgranja() {

        return $this->hasMany(eysgranja::class);
    }
    
 


}
