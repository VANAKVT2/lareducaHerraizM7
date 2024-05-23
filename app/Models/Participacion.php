<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Participacion extends Model
{
    use HasFactory;

    protected $table = 'participacion';
    public $incrementing = false;
    public $timestamps = false;
    protected $primaryKey = 'id_curso';
    

    protected $fillable = [
        'id_usuario',
        'id_curso',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_usuario');
    }

    public function curso()
    {
        return $this->belongsTo(Curso::class, 'id_curso');
    }
}