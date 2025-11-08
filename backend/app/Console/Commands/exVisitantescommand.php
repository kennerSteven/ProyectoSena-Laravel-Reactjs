<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\usuarios;
use Carbon\Carbon;

class exVisitantescommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'visitantes:expirar';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Desactiva visitantes cuya fecha de expiración ya paso';

    /**
     * Execute the console command.
     */
    
    public function handle()
    {
       $ahora = Carbon::now();

       
        $expirar = usuarios::whereHas('perfile', function ($q) {
                $q->where('nombre', 'Visitante');
            })
            ->where('estado', 'activo')
            ->whereNotNull('fechaExpiracion')
            ->where('fechaExpiracion', '<=', $ahora)
            ->get();

        foreach ($expirar as $usuario) {
            $usuario->estado = 'inactivo';
            $usuario->save();
        }

        $this->info('Visitantes expirados desactivados: ' . $expirar->count());
    }




}




