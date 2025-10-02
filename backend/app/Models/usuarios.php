<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class usuarios extends Model
{
      protected $table = 'usuarios';
      protected $fillable = [
        'nombre',
        'apellido',
        'tipoDocumento',
        'numeroDocumento',
        'telefono',
        'tipoSangre',
        'estado',
        'fechaRegistro',
        'fechaExpiracion',
        'fechaFinContrato',
        'foto',
        'idperfil',
        'idficha'

    ];

    public function perfile() {

         return $this->belongsTo(perfile::class,'idperfil');
    }


     public function fichas() {

         return $this->belongsTo(fichas::class,'idficha');
    }

}
