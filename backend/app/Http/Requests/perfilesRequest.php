<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class perfilesRequest extends FormRequest
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
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string|max:500',
        ];
    }

    public function messages(): array
{
    return [
        'nombre.required' => 'El campo nombre es obligatorio',
        'nombre.string'   => 'El nombre debe ser texto',
        'nombre.max'      => 'El nombre no puede tener más de 255 caracteres',

        'descripcion.string' => 'La descripción debe ser texto',
        'descripcion.max'    => 'La descripción no puede tener más de 500 caracteres',
    ];
}
}
