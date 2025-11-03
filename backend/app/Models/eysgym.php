<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class eysgym extends Model
{
    protected $table = 'eys_gym';
    protected $fillable = [
        'numeroDocumento',
        'fechaRegistro',
        'tipo',
        'idusuario'
       
    ];

    public function usuarios() {

         return $this->belongsTo(usuarios::class,'idusuario');
    }
}
