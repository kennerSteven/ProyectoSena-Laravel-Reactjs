<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class vehiculosRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'tipoVehiculo'   => 'required|string|max:100',
            'placa'          => 'required|string|max:10|unique:vehiculos,placa',
            'fechaRegistro'  => 'required|date',
            'idusuario'      => 'required|integer|exists:usuarios,id',
        ];
    }



    public function messages(): array
    {
        return [
            'tipoVehiculo.required'  => 'El tipo de vehículo es obligatorio .',
            'tipoVehiculo.string'    => 'El tipo de vehículo debe ser texto válido.',
            'tipoVehiculo.max'       => 'El tipo de vehículo no puede superar los 100 caracteres.',

            'placa.required'         => 'La placa es obligatoria .',
            'placa.string'           => 'La placa debe ser un texto.',
            'placa.max'              => 'La placa no puede tener más de 10 caracteres.',
            'placa.unique'           => 'Ya existe un vehículo registrado con esa placa.',

            'fechaRegistro.required' => 'La fecha de registro es obligatoria .',
            'fechaRegistro.date'     => 'La fecha de registro debe tener un formato válido (YYYY-MM-DD).',

            'idusuario.required'     => 'El ID del usuario es obligatorio .',
            'idusuario.integer'      => 'El ID del usuario debe ser un número.',
            'idusuario.exists'       => 'El usuario indicado no existe en la base de datos.',
        ];
    }


    
}
