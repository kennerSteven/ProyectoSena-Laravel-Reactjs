<?php

namespace App\Providers;

use App\Models\usuarios;
use Carbon\Carbon;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        if (app()->runningInConsole()) {
            return;
        }

        if (!Schema::hasTable('usuarios')) {
            return;
        }

        $hoy = Carbon::now('America/Bogota');

        // 🔸 Regla del 30 de diciembre
        if ($hoy->format('m-d') === '12-30') {
            usuarios::whereHas('perfile', function ($q) {
                $q->whereRaw('LOWER(nombre) IN (?, ?)', [
                    'instructor contrato',
                    'administrativo contrato'
                ]);
            })
                ->where('estado', 'activo')
                ->update(['estado' => 'inactivo']);
        }

        // 🔸 Regla para visitantes (12 horas)
        usuarios::whereHas('perfile', function ($q) {
            $q->whereRaw('LOWER(nombre) = ?', ['visitante']);
        })
            ->where('estado', 'activo')
            // Se usa 'updated_at' para reiniciar el contador de 12 horas en cada 'entrada' o activación manual.
            ->where('updated_at', '<=', Carbon::now('America/Bogota')->subHours(12))
            ->update(['estado' => 'inactivo']);
    }
}