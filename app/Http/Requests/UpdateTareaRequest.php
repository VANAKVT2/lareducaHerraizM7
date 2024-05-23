<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTareaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'id_curso' => 'integer',
            'nombre_entrega' => 'string|max:255',
            'puntuacion_maxima' => 'integer',
            'fecha_inicio' => 'date',
            'fecha_final' => 'date',
            'parcial_entrega' => 'boolean',
        ];
    }
}
