<?php

namespace App\Providers;

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
        Artisan::call('contratos:desactivar');
    }
    }
}
