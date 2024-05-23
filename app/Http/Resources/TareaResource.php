<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TareaResource extends JsonResource
{
    public static $wrap = false;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id_entrega' => $this->id_entrega,
            'id_curso' => $this->id_curso,
            'nombre_entrega' => $this->nombre_entrega,
            'puntuacion_maxima' => $this->puntuacion_maxima,
            'fecha_inicio' => $this->fecha_inicio,
            'fecha_final' => $this->fecha_final,
        ];
    }
}
