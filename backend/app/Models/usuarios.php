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

         return $this->belongsTo(fichas::class,'idficha','id');
    }

     public function vehiculo() {

        return $this->hasMany(vehiculo::class);
    }

    public function eyssena() {

        return $this->hasMany(eyssena::class);
    }

    public function eysgym() {

        return $this->hasMany(eysgym::class);
    }

     public function eysgranja() {

        return $this->hasMany(eysgranja::class);
    }

 public function eyscasadeapoyo() {

        return $this->hasMany(eyscasadeapoyo::class);
    }


}
