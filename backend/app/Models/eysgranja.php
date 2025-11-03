<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class eysgranja extends Model
{
     protected $table = 'eys_granja';
     protected $fillable = [
        'numeroDocumento',
        'fechaRegistro',
        'tipo',
        'idusuario',
        'idvehiculo'
       
    ];

public function usuarios() {

         return $this->belongsTo(usuarios::class,'idusuario');
    }


public function vehiculo() {

         return $this->belongsTo(vehiculo::class,'idvehiculo');
    }    


}
