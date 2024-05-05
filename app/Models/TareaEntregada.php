<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TareaEntregada extends Model
{
    use HasFactory;

    protected $table = 'tareas_entregadas';
    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'id_entrega',
        'id_usuario',
        'correccion',
        'nota',
        'fecha_entrega',
        'a_tiempo',
    ];

    public function tarea()
    {
        return $this->belongsTo(Tarea::class, 'id_entrega');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'id_usuario');
    }
}
