<?php

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


Route::get("/usuario/index", [usuariosController::class, "index"]);
Route::post("/usuario/store", [usuariosController::class, "store"]); 
Route::get("/usuario/show/{id}", [usuariosController::class, "show"]);
Route::put("/usuario/update/{id}", [usuariosController::class, "update"]);
Route::delete("/usuario/destroy/{id}", [usuariosController::class, "destroy"]);

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



Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');