<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class eyscasadeapoyo extends Model
{
    protected $table = 'eys_casadeapoyo';
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
