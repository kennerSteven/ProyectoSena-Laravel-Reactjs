<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class perfile extends Model
{
    protected $table = 'perfiles';
    protected $fillable = [
        'nombre',
        'descripcion'
    ];




    public function usuarios()
{
    return $this->hasMany(usuarios::class);
}

}
