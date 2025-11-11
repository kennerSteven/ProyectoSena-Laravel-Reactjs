<?php

namespace App\Console;

use App\Console\Commands\DesactivarContratosCommand;
use App\Console\Commands\exVisitantescommand;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Registrar comandos personalizados.
     */
    protected $commands = [
        exVisitantescommand::class, // tu comando
        DesactivarContratosCommand::class,
    ];

    /**
     * Definir la programación de tareas automáticas.
     */
    protected function schedule(Schedule $schedule)
    {
        // Ejecutar el comando cada hora
        $schedule->command('visitantes:expirar')->hourly();
        $schedule->command('contratos:desactivar')->dailyAt('10:10');
    }

    /**
     * Registrar los comandos para Artisan.
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');
    }
}
