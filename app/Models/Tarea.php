<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tarea extends Model
{
    use HasFactory;

    protected $table = 'tareas';
    protected $primaryKey = 'id_entrega';

    protected $fillable = [
        'id_curso',
        'nombre_entrega',
        'puntuacion_maxima',
        'fecha_inicio',
        'fecha_final',
    ];

    public function curso()
    {
        return $this->belongsTo(Curso::class, 'id_curso');
    }

    public function tareasEntregadas()
    {
        return $this->hasMany(TareaEntregada::class, 'id_entrega');
    }
}
