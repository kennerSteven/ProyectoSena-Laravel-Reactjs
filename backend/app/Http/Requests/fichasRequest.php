<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class fichasRequest extends FormRequest
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
            'numeroFicha'    => 'required|numeric',
            'nombrePrograma'=> 'required|string|max:255',
            'jornada'       => 'required|string|max:100',
            'estado'        => 'required|in:activo,inactivo',
        ];
    }


    public function messages(): array
    {
        return [

        'numeroFicha.required' => 'El número de ficha es obligatorio.',
        'numeroFicha.numeric'  => 'El número de ficha debe contener solo números.',
        'nombrePrograma.required' => 'El nombre del programa es obligatorio.',
        'jornada.required'     => 'La jornada es obligatoria.',
        'estado.required'      => 'El estado es obligatorio.',
        'estado.in'            => 'El estado solo puede ser activo o inactivo.',
        
        ];
    }



}
