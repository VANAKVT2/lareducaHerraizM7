<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Curso extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'cursos';
    protected $primaryKey = 'id_curso';

    protected $fillable = [
        'nombre_curso',
        'id_profesor',
    ];

    public function users()
    {
        return $this->belongsTo(User::class, 'id_profesor');
    }

    public function participacion()
    {
        return $this->hasMany(Participacion::class, 'id_curso');
    }

    public function tareas()
    {
        return $this->hasMany(Tarea::class, 'id_curso');
    }

    public function notas()
    {
        return $this->hasMany(Nota::class, 'id_curso');
    }

    public function tareasEntregadas()
    {
        return $this->hasMany(TareaEntregada::class, 'id_curso');
    }
}
