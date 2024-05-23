import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';

export default function CourseContent() {
    const { user, token, setUser, setToken, notification } = useStateContext();
    const [course, setCourse] = useState({});
    const [tareas, setTareas] = useState([]);
    const [loading, setLoading] = useState(false);
    let { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axiosClient.get(`/cursos/${id}`)
            .then(({ data }) => {
                setLoading(false);
                setCourse(data);
            })
            .catch((err) => {
                setLoading(false);
                console.log(id, "id_curso");
                console.log(err.response.data.message);
            });
    }, [id]);

    useEffect(() => {
        axiosClient.get('/tareas')
            .then(({ data }) => {
                setTareas(data.data);
                console.log(tareas)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!course) {
        return <div>No course data available.</div>;
    }
    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        data.id_curso = id;

        axiosClient.post('/tareas', data)
            .then(({ data }) => {
                console.log(data);
                // Limpiar el formulario o mostrar un mensaje de éxito
            })
            .catch((err) => {
                if (err.response && err.response.data.errors) {
                    // Mostrar los errores de validación al usuario
                    console.log("hola", err.response.data.errors.data.messageF, "<-errores");
                } else {
                    console.log(err);
                }
            });
    };

    return (
        <div>
            <h1 className='title'>{course.nombre_curso}</h1>
            {user.user_type === 1 && <div>
                <div className='flex'>
                    <div className='w-1/2'>
                        <h1 className='subtitle'>CREAR TAREA</h1>
                        <div>
                            {/* <?php

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
        'parcial_entrega',
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
 */}
                            <form onSubmit={onSubmit}>
                                <div className='mb-4'>
                                    <label htmlFor='nombre_entrega' className='block text-sm font-medium text-gray-700'>Nombre de la tarea</label>
                                    <input type='text' name='nombre_entrega' id='nombre_entrega' className='mt-1 p-2 border border-gray-300 rounded-md w-full' />
                                </div>

                                <div className='mb-4'>
                                    <label htmlFor='puntuacion_maxima' className='block text-sm font-medium text-gray-700'>Puntuación máxima</label>
                                    <input type='number' name='puntuacion_maxima' id='puntuacion_maxima' className='mt-1 p-2 border border-gray-300 rounded-md w-full' />
                                </div>

                                <input type="hidden" name='fecha_inicio' value={new Date().toISOString().split('T')[0]} />

                                <div className='mb-4'>
                                    <label htmlFor='fecha_final' className='block text-sm font-medium text-gray-700'>Fecha final</label>
                                    <input type='date' name='fecha_final' id='fecha_final' className='mt-1 p-2 border border-gray-300 rounded-md w-full' />
                                </div>


                                <button type='submit' className='bg-blue-500 text-white p-2 rounded-md'>Crear tarea</button>

                            </form>
                        </div>
                    </div>
                    <div className='w-1/2'>
                        <h1 className='subtitle'>TAREAS EXISTENTES</h1>
                        {tareas.map(tarea => {
                            return (
                                <div key={tarea.id_entrega} className='card w-3/4 ml-8'>
                                    <div className='flex'>
                                        <h2 className='subtitle w-1/2' style={{ fontSize: "22px" }}>{tarea.nombre_entrega}</h2>
                                        <h3 className="w-1/3 mt-7" style={{ fontSize: "22px" }} >Días restantes: {Math.floor((new Date(tarea.fecha_final) - new Date()) / (1000 * 60 * 60 * 24))}</h3>
                                    </div>
                                    <p>Fecha final: {tarea.fecha_final}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>

            </div>}
            {user.user_type === 0 && <div>
                <div className=''>
                    <h1 className='subtitle'>TAREAS</h1>
                    {tareas.map(tarea => {
                        if (tarea.id_curso == course.id_curso)
                            return (
                                <div key={tarea.id_entrega} className='card w-3/4 ml-8'>
                                    <div className='flex'>
                                        <h2 className='subtitle w-1/2' style={{ fontSize: "22px" }}>{tarea.nombre_entrega}</h2>
                                        <h3 className="w-1/3 mt-7" style={{ fontSize: "22px" }} >Días restantes: {Math.floor((new Date(tarea.fecha_final) - new Date()) / (1000 * 60 * 60 * 24))}</h3>
                                    </div>
                                    <div className='flex'>
                                        <p className='w-1/2 ml-8'>Fecha final: {tarea.fecha_final}</p>
                                        <form action="">
                                            <input type="file" name="file" id="file" />
                                            <input type="submit" value="Entregar tarea" className="bg-blue-500 text-white p-2 rounded-md ml-4 w-1/4" />
                                        </form>
                                    </div>
                                </div>
                            )
                    })}
                </div>
            </div>
            }
        </div>
    )
}