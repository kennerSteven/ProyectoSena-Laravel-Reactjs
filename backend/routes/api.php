<?php

use App\Http\Controllers\dashcontroller;
use App\Http\Controllers\eys_granjaController;
use App\Http\Controllers\eys_gymController;
use App\Http\Controllers\eys_senaController;
use App\Http\Controllers\EysCasadeapoyoController;
use App\Http\Controllers\FichasController;
use App\Http\Controllers\PerfileController;
use App\Http\Controllers\usuariosController;
use App\Http\Controllers\VehiculoController;
use App\Services\dashService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;





Route::get("/perfiles/index", [PerfileController::class, "index"]);
Route::post("/perfiles/store", [PerfileController::class, "store"]);
Route::get("/perfiles/show/{id}", [PerfileController::class, "show"]);
Route::put("/perfiles/update/{id}", [PerfileController::class, "update"]);
Route::delete("/perfiles/destroy/{id}", [PerfileController::class, "destroy"]);

Route::get("/vehiculo/index", [VehiculoController::class, "index"]);
Route::post("/vehiculo/store", [VehiculoController::class, "store"]); 
Route::get("/vehiculo/show/{id}", [VehiculoController::class, "show"]);
Route::put("/vehiculo/update/{id}", [VehiculoController::class, "update"]);
Route::delete("/vehiculo/destroy/{id}", [VehiculoController::class, "destroy"]);

Route::get("/ficha/index", [FichasController::class, "index"]);
Route::post("/ficha/store", [FichasController::class, "store"]); 
Route::get("/ficha/show/{id}", [FichasController::class, "show"]);
Route::put("/ficha/update/{id}", [FichasController::class, "update"]);
Route::delete("/ficha/destroy/{id}", [FichasController::class, "destroy"]);
Route::delete("/ficha/destroyMasivo", [FichasController::class, "destroyMasivo"]);
Route::put('/ficha/desactivar/{id}', [FichasController::class, 'desactivarFicha']);
Route::get('/ficha/activas', [FichasController::class, 'listarFichasActivas']);
Route::get("/ficha/listarFichasDesactivadas", [FichasController::class, "listarFichasDesactivadas"]);
Route::get("/ficha/listarusuariosDeFichadesactivada/{id}", [FichasController::class, "listarusuariosDeFichadesactivada"]);
Route::get('/ficha/listarusuariosdelaFicha/{id}', [FichasController::class, 'listarusuariosdelaFicha']);
Route::get('/fichas/fichasConMasAprendices', [FichasController::class, 'fichasConMasAprendices']);
Route::get('/fichas/listarFichasPorEstado', [FichasController::class, 'listarFichasPorEstado']);

Route::get("/usuario/index", [usuariosController::class, "index"]);
Route::post("/usuario/store", [UsuariosController::class, "store"]); 
Route::get("/usuario/show/{id}", [UsuariosController::class, "show"]);
Route::put("/usuario/update/{id}", [UsuariosController::class, "update"]);
Route::delete("/usuario/destroy/{id}", [UsuariosController::class, "destroy"]);
Route::get('/visitantes/desactivados', [UsuariosController::class, 'listarVisitantesDesactivados']);
Route::get('/instructores-contrato/desactivados', [UsuariosController::class, 'listarInstructoresContratoDesactivados']);
Route::get('/administrativos-contrato/desactivados', [UsuariosController::class, 'listarAdministrativosContratoDesactivados']);



/*granja*/
Route::get("/entradaysalidagranja/index", [eys_granjaController::class, "index"]);
Route::post("/entradaysalidagranja/entradagranja", [eys_granjaController::class, "entradagranja"]);
Route::post("/entradaysalidagranja/salidagranja", [eys_granjaController::class, "salidagranja"]); 
Route::get('/usuario/buscar/{numeroDocumento}', [eys_granjaController::class, 'buscarPorDocumento']);

/*gym*/
Route::get("/entradaysalidagym/index", [eys_gymController::class, "index"]);
Route::post("/entradaysalidagym/entradagym", [eys_gymController::class, "entradagym"]); 
Route::post("/entradaysalidagym/salidagym", [eys_gymController::class, "salidagym"]); 
Route::get('/usuario/buscar/{numeroDocumento}', [eys_gymController::class, 'buscarPorDocumento']);

/*SENA*/
Route::get("/entradaysalidaSENA/index", [eys_senaController::class, "index"]);
Route::post("/entradaysalidaSENA/entradasena", [eys_senaController::class, "entradasena"]); 
Route::post("/entradaysalidaSENA/salidasena", [eys_senaController::class, "salidasena"]); 
Route::get('/usuario/buscar/{numeroDocumento}', [eys_senaController::class, 'buscarPorDocumento']);


/*CASA APOYO*/
Route::get("/entradaysalidacasa/index", [EysCasadeapoyoController::class, "index"]);
Route::post("/entradaysalidacasa/entradacasadeapoyo", [EysCasadeapoyoController::class, "entradacasadeapoyo"]); 
Route::post("/entradaysalidacasa/salidacasadeapoyo", [EysCasadeapoyoController::class, "salidacasadeapoyo"]); 
Route::get('/usuario/buscar/{numeroDocumento}', [EysCasadeapoyoController::class, 'buscarPorDocumento']);

/*kpi*/






Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');