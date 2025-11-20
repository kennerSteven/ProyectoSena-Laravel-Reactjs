<?php

namespace App\Providers;

use App\Models\usuarios;
use Carbon\Carbon;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // ❗ Evitar errores cuando la app corre artisan, composer o no tiene DB lista
        if (app()->runningInConsole()) {
            return;
        }

        // ❗ Si la tabla no existe aún (primer clone del proyecto), evitar crasheo
        if (!Schema::hasTable('usuarios')) {
            return;
        }

        $hoy = Carbon::now('America/Bogota');

        // 🔸 Regla del 30 de diciembre
        if ($hoy->format('m-d') === '12-30') {
            usuarios::whereHas('perfile', function ($q) {
                $q->whereIn('nombre', [
                    'Instructor contrato',
                    'Administrativo contrato'
                ]);
            })
                ->where('estado', 'activo')
                ->update(['estado' => 'inactivo']);
        }

        // 🔸 Regla para visitantes (12 horas)
        usuarios::whereHas('perfile', function ($q) {
            $q->where('nombre', 'Visitante');
        })
            ->where('estado', 'activo')
            ->where('created_at', '<=', Carbon::now('America/Bogota')->subHours(12))
            ->update(['estado' => 'inactivo']);
    }
}
