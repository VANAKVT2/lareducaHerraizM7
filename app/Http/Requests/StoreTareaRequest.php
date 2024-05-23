<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTareaRequest extends FormRequest
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
            'id_curso' => 'required|integer',
            'nombre_entrega' => 'required|string|max:255',
            'puntuacion_maxima' => 'required|integer',
            'fecha_inicio' => 'required|date',
            'fecha_final' => 'required|date',
        ];
    }
}
