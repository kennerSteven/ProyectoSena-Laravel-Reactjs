<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class usuariosRequest extends FormRequest
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
        'nombre'           => 'required|string|max:100',
        'apellido'         => 'required|string|max:100',
        'tipoDocumento'    => 'required|string|max:50',
        'numeroDocumento'  => 'required|string|max:20|unique:usuarios,numeroDocumento',
        'telefono'         => 'nullable|string|max:15',
        'tipoSangre'       => 'nullable|string|max:5',
        'estado'           => 'required|in:activo,inactivo',
        'fechaRegistro'    => 'required|date',
        'fechaExpiracion'  => 'nullable|date|after:fechaRegistro',
        'fechaFinContrato' => 'nullable|date|after_or_equal:fechaRegistro',
        'foto'             => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        'idperfil'         => 'required|exists:perfiles,id',

        ];
    }

    public function messages(): array
{
    return [
        'nombre.required'          => 'El nombre es obligatorio',
        'nombre.string'            => 'El nombre debe ser texto',
        'nombre.max'               => 'El nombre no puede tener más de 100 caracteres',

        'apellido.required'        => 'El apellido es obligatorio',
        'apellido.string'          => 'El apellido debe ser texto',
        'apellido.max'             => 'El apellido no puede tener más de 100 caracteres',

        'tipoDocumento.required'   => 'El tipo de documento es obligatorio',
        'tipoDocumento.string'     => 'El tipo de documento debe ser texto',
        'tipoDocumento.max'        => 'El tipo de documento no puede tener más de 50 caracteres',

        'numeroDocumento.required' => 'El número de documento es obligatorio',
        'numeroDocumento.string'   => 'El número de documento debe ser texto',
        'numeroDocumento.max'      => 'El número de documento no puede tener más de 20 caracteres',
        'numeroDocumento.unique'   => 'Este número de documento ya está registrado',

        'telefono.string'          => 'El teléfono debe ser texto',
        'telefono.max'             => 'El teléfono no puede tener más de 15 caracteres',

        'tipoSangre.string'        => 'El tipo de sangre debe ser texto',
        'tipoSangre.max'           => 'El tipo de sangre no puede tener más de 5 caracteres',

        'estado.required'          => 'El estado es obligatorio',
        'estado.in'                => 'El estado debe ser activo o inactivo',

        'fechaRegistro.required'   => 'La fecha de registro es obligatoria',
        'fechaRegistro.date'       => 'La fecha de registro no es válida',

        'fechaExpiracion.date'     => 'La fecha de expiración no es válida',
        'fechaExpiracion.after'    => 'La fecha de expiración debe ser posterior a la fecha de registro',

        'fechaFinContrato.date'    => 'La fecha de fin de contrato no es válida',
        'fechaFinContrato.after_or_equal' => 'La fecha de fin de contrato debe ser igual o posterior a la fecha de registro',

        'foto.image'               => 'La foto debe ser una imagen',
        'foto.mimes'               => 'La foto debe estar en formato jpg, jpeg o png',
        'foto.max'                 => 'La foto no puede superar los 2 MB',

        'idperfil.required'        => 'Debes elegir un perfil',
        'idperfil.exists'          => 'El perfil seleccionado no existe',
    ];
}

}
