<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('usuarios', function (Blueprint $table) {
            $table->id();

            $table->string('nombre')->nullable();
            $table->string('apellido');
            $table->enum('tipoDocumento', ['ti', 'cc', 'otro'])->nullable();
            $table->string('numeroDocumento')->nullable();
            $table->string('telefono')->nullable();
            $table->enum('tipoSangre', ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])->nullable();
            $table->enum('estado', ['activo', 'inactivo'])->default('activo');

            $table->timestamp('fechaRegistro')->useCurrent()->nullable();
            $table->date('fechaExpiracion')->nullable();
            $table->date('fechaFinContrato')->nullable();
            $table->string('foto')->nullable();

            // Clave foránea opcional: perfil
            $table->unsignedBigInteger('idperfil');
            $table->foreign('idperfil')->references('id')->on('perfiles');

            // Clave foránea opcional: ficha
            $table->unsignedBigInteger('idficha')->nullable();
            $table->foreign('idficha')->references('id')->on('fichas');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('usuarios');
    }
};