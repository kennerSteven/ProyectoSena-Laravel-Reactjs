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
        Schema::create('eys_granja', function (Blueprint $table) {
             $table->id();
            $table->string('numeroDocumento');
            $table->timestamp('fechaRegistro')->useCurrent();
            $table->unsignedBigInteger('idusuario')->nullable();
            $table->foreign('idusuario')->references('id')->on('usuarios')->nullable();
            $table->unsignedBigInteger('idvehiculo')->nullable();
            $table->foreign('idvehiculo')->references('id')->on('vehiculos')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('eys_granja');
    }
};
