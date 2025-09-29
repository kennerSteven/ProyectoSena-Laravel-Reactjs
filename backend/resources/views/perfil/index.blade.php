@extends('layouts.app')

@section('title')
    Administrar Perfiles
@endsection

@section('titleContent')
    <h1 class="text-center my-4 fw-bold">Administrar Perfiles</h1>
@endsection

@section('Content')
<div class="container">

    <!-- Botones superiores -->
    <div class="d-flex justify-content-between align-items-center mb-4">
        <a href="{{route('welcome')}}" class="btn btn-outline-secondary">
            <i class="bi bi-arrow-left"></i> Volver
        </a>

        <a href="{{route('perfiles.create')}}" class="btn btn-primary">
            <i class="bi bi-plus-circle"></i> Crear nuevo Perfil
        </a>
    </div>

    <!-- Tabla -->
    <div class="card shadow-lg rounded-3">
        <div class="card-body">
            <table class="table table-striped table-hover align-middle text-center">
                <thead class="table-dark">
                    <tr>
                        <th>Id</th>
                        <th>Nombre Categoria</th>
                        <th>Descripción</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($perfiles as $item)
                        <tr>
                            <td>{{ $item->id }}</td>
                            <td>{{ $item->nombre }}</td>
                            <td>{{ $item->descripcion }}</td>
                            <td>
                                <div class="d-flex justify-content-center gap-2">
                                    <!-- Actualizar -->
                                    <a href="{{route('perfiles.edit',$item->id)}}" class="btn btn-outline-success btn-sm">
                                        <i class="bi bi-arrow-clockwise"></i> Actualizar
                                    </a>

                                    <!-- Eliminar -->
                                    <form action="{{route('perfiles.destroy', $item->id)}}" method="POST">
                                        @csrf
                                        <button type="submit" class="btn btn-outline-danger btn-sm">
                                            <i class="bi bi-trash"></i> Eliminar
                                        </button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    @endforeach

                </tbody>
            </table>
        </div>
    </div>
</div>
@endsection
