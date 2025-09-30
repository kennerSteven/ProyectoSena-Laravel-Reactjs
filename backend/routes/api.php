<?php

use App\Http\Controllers\PerfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;





Route::get("/perfiles/index", [PerfileController::class, "index"]);
Route::post("/perfiles/store", [PerfileController::class, "store"]);
Route::get("/perfiles/show/{id}", [PerfileController::class, "show"]);
Route::post("/perfiles/update/{id}", [PerfileController::class, "update"]);
Route::post("/perfiles/destroy/{id}", [PerfileController::class, "destroy"]);



Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');