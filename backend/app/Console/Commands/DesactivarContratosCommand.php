<?php

namespace App\Console\Commands;

use App\Models\usuarios;
use Carbon\Carbon;
use Illuminate\Console\Command;

class DesactivarContratosCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'contratos:desactivar';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Desactiva instructores contrato y administrativos contrato el 30 de diciembre';

    /**
     * Execute the console command.
     */
   

    public function handle()
    {
        $hoy = Carbon::now('America/Bogota');

        // Solo se ejecuta si HOY es 30 de diciembre
        if ($hoy->isSameDay(Carbon::createFromDate($hoy->year, 12, 30))) {

            $usuarios = usuarios::whereHas('perfile', function ($q) {
                $q->whereIn('nombre', [
                    'Instructor contrato',
                    'Administrativo contrato'
                ]);
            })
            ->where('estado', 'activo')
            ->get();

            foreach ($usuarios as $usuario) {
                $usuario->estado = 'inactivo';
                $usuario->save();
            }

            $this->info('Usuarios desactivados: ' . $usuarios->count());
        } else {
            $this->info('Hoy no es 30 de diciembre. No se desactivó a nadie.');
        }
    }








}
