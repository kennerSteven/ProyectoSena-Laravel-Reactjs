@extends('layouts.app')

@section('title')
    Crear Perfil
@endsection

@section('titleContent')
    
@endsection

@section('Content')
<div class="d-flex justify-content-center align-items-center vh-100">
    <div class="card shadow-lg p-4 rounded-4" style="min-width: 400px; max-width: 500px; width: 100%;">
        
        <!-- Botón volver -->
     <div class="mb-3">
    <a href="{{ route('perfiles.index') }}" class="btn btn-outline-secondary">
        <i class="bi bi-arrow-left"></i>
    </a>
</div>

       <h1 class="text-center mb-4 fw-bold">Crear Perfil</h1>

        <!-- Formulario -->
        <form action="{{route('perfiles.store')}}" method="POST">
            @csrf 

            <div class="mb-3">
                <label for="nombre" class="form-label fw-semibold">Nombre Perfil</label>
                <input type="text" id="nombre" name="nombre" class="form-control" placeholder="Nombre">
            </div>

            <div class="mb-3">
                <label for="descripcion" class="form-label fw-semibold">Descripción del perfil</label>
                <input type="text" id="descripcion" name="descripcion" class="form-control" placeholder="Descripcion">
            </div>

            <div class="text-center mt-4">
                <button type="submit" class="btn btn-dark px-5 py-2 rounded-3">
                    <i class="bi bi-save"></i> Guardar
                </button>
            </div>
        </form>
    </div>
</div>
@endsection
