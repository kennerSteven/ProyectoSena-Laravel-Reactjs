<?php

use App\Http\Controllers\PerfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
})->name('welcome');

/*Rutas perfiles*/

Route::get('/perfiles/index',[PerfileController::class,'index'])->name('perfiles.index');
Route::get('/perfiles/create',[PerfileController::class,'create'])->name('perfiles.create');
Route::post('/perfiles/store',[PerfileController::class,'store'])->name('perfiles.store');
Route::post('/perfiles/destroy/{id}',[PerfileController::class,'destroy'])->name('perfiles.destroy');
Route::get('/perfiles/edit/{id}',[PerfileController::class,'edit'])->name('perfiles.edit');
Route::post('/perfiles/update/{id}',[PerfileController::class,'update'])->name('perfiles.update');



