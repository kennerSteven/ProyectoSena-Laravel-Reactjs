<?php

use App\Http\Controllers\eys_granjaController;
use App\Http\Controllers\eys_gymController;
use App\Http\Controllers\eys_senaController;
use App\Http\Controllers\EysCasadeapoyoController;
use App\Http\Controllers\FichasController;
use App\Http\Controllers\PerfileController;
use App\Http\Controllers\usuariosController;
use App\Http\Controllers\VehiculoController;
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

Route::get("/usuario/index", [usuariosController::class, "index"]);
Route::post("/usuario/store", [UsuariosController::class, "store"]); 
Route::get("/usuario/show/{id}", [UsuariosController::class, "show"]);
Route::put("/usuario/update/{id}", [UsuariosController::class, "update"]);
Route::delete("/usuario/destroy/{id}", [UsuariosController::class, "destroy"]);

/*granja*/
Route::get("/entradaysalidagranja/index", [eys_granjaController::class, "index"]);
Route::post("/entradaysalidagranja/entradagranja", [eys_granjaController::class, "entradagranja"]);
Route::post("/entradaysalidagranja/salidagranja", [eys_granjaController::class, "salidagranja"]); 


/*gym*/
Route::get("/entradaysalidagym/index", [eys_gymController::class, "index"]);
Route::post("/entradaysalidagym/entradagym", [eys_gymController::class, "entradagym"]); 
Route::post("/entradaysalidagym/salidagym", [eys_gymController::class, "salidagym"]); 

/*SENA*/
Route::get("/entradaysalidaSENA/index", [eys_senaController::class, "index"]);
Route::post("/entradaysalidaSENA/entradasena", [eys_senaController::class, "entradasena"]); 
Route::post("/entradaysalidaSENA/salidasena", [eys_senaController::class, "salidasena"]); 

/*CASA APOYO*/
Route::get("/entradaysalidacasa/index", [EysCasadeapoyoController::class, "index"]);
Route::post("/entradaysalidacasa/entradacasadeapoyo", [EysCasadeapoyoController::class, "entradacasadeapoyo"]); 
Route::post("/entradaysalidacasa/salidacasadeapoyo", [EysCasadeapoyoController::class, "salidacasadeapoyo"]); 



Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');