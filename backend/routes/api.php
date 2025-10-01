<?php

use App\Http\Controllers\PerfileController;
use App\Http\Controllers\usuariosController;
use App\Http\Controllers\VehiculoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;





Route::get("/perfiles/index", [PerfileController::class, "index"]);
Route::post("/perfiles/store", [PerfileController::class, "store"]);
Route::get("/perfiles/show/{id}", [PerfileController::class, "show"]);
Route::post("/perfiles/update/{id}", [PerfileController::class, "update"]);
Route::post("/perfiles/destroy/{id}", [PerfileController::class, "destroy"]);


Route::get("/usuario/index", [usuariosController::class, "index"]);
Route::post("/usuario/store", [usuariosController::class, "store"]); 
Route::get("/usuario/show/{id}", [usuariosController::class, "show"]);
Route::post("/usuario/update/{id}", [usuariosController::class, "update"]);
Route::post("/usuario/destroy/{id}", [usuariosController::class, "destroy"]);

Route::get("/vehiculo/index", [VehiculoController::class, "index"]);
Route::post("/vehiculo/store", [VehiculoController::class, "store"]); 
Route::get("/vehiculo/show/{id}", [VehiculoController::class, "show"]);
Route::post("/vehiculo/update/{id}", [VehiculoController::class, "update"]);
Route::post("/vehiculo/destroy/{id}", [VehiculoController::class, "destroy"]);



Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');