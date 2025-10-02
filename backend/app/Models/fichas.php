<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class fichas extends Model
{
      protected $table = 'fichas';
     protected $fillable = [
        'numeroFicha',
        'nombrePrograma',
        'jornada',
        'estado'
    ];


    public function usuarios() {

        return $this->hasMany(usuarios::class);
    }
}
