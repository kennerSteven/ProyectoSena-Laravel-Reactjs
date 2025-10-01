<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('usuarios', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('apellido');
            $table->enum('tipoDocumento',['ti','cc','otro']);
            $table->string('numeroDocumento');
            $table->string('telefono');
            $table->enum('tipoSangre',['A+','A-','B+','B-','AB+','AB-','O+','O-']);
            $table->enum('estado',['activo','inactivo']);
            $table->timestamp('fechaRegistro');
            $table->date('fechaExpiracion');
            $table->date('fechaFinContrato');
            $table->string('foto');
            $table->unsignedBigInteger('idperfil');
            $table->foreign('idperfil')->references('id')->on('perfiles');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('usuarios');
    }
};
