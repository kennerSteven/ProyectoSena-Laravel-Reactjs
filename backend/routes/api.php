<?php

use App\Http\Controllers\PerfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;





Route::get("/perfiles", [PerfileController::class, "index"]);



Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

