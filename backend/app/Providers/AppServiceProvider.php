<?php

namespace App\Providers;

use App\Models\usuarios;
use Carbon\Carbon;
use Illuminate\Support\Facades\Artisan;
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
         $hoy = Carbon::now('America/Bogota');

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

     usuarios::whereHas('perfile', function ($q) {
            $q->where('nombre', 'Visitante'); 
        })
        ->where('estado', 'activo')
        ->where('created_at', '<=', Carbon::now('America/Bogota')->subHours(12))
        ->update(['estado' => 'inactivo']);
    }




    }

