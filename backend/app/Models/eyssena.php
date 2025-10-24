<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class eyssena extends Model
{
    protected $table = 'eys_sena';
    protected $fillable = [
        'numeroDocumento',
        'fechaRegistro',
        'idusuario'
       
    ];

     public function usuarios() {

         return $this->belongsTo(usuarios::class,'idusuario');
    }
}
