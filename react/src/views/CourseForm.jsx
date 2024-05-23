import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";

export default function CourseForm() {
    const navigate = useNavigate();
    let { id } = useParams();
    const [course, setCourse] = useState({
        id_curso: null,
        nombre_curso: '',
        id_profesor: null
    });
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const [professors, setProfessors] = useState([]);
    const { setNotification } = useStateContext();

    if (!user.user_type == 1 || !user.user_type == 2) {
        return <Navigate to="/dashboard" />;
    }

    useEffect(() => {
        // Obtener la lista de profesores
        setLoading(true);
        axiosClient.get('/users?user_type=1')
            .then(({ data }) => {
                setLoading(false);
                setProfessors(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        setLoading(true);
        axiosClient.get(`/cursos/${id}`)
            .then(({ data }) => {
                setLoading(false);
                setCourse(data);
            })
            .catch((err) => {
                console.log("llego aqui")
                console.log(id, "id_curso")
                console.log(err.response.data.message);
                setLoading(false);
            });
    }, []);


    const onSubmit = (ev) => {
        ev.preventDefault();
        if (course.id_curso) {
            axiosClient.put(`/cursos/${course.id_curso}`, course)
                .then(() => {
                    setNotification('Course was successfully updated');
                    navigate('/courses');
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        } else {
            axiosClient.post('/cursos', course)
                .then(({ data }) => {
                    console.log("data", data)
                    setNotification('Course was successfully created');
                    setCourse({ ...course, id_curso: data.id_curso });
                    navigate('/courses');
                })
                .catch((err) => {
                    console.log(err.response.data.message);
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        }
    };

    return (
        <div>
            <div className="card animated fadeInDown">
                {course.id_curso && <h1>Update Course: {course.nombre_curso}</h1>}
                {!course.id_curso && <h1>New Course</h1>}
                {loading && (
                    <div className="text-center">
                        Loading...
                    </div>
                )}
                {errors &&
                    <div className="alert">
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                }
                {!loading && (
                    <form onSubmit={onSubmit}>
                        <input
                            value={course.nombre_curso}
                            onChange={(ev) => setCourse({ ...course, nombre_curso: ev.target.value })}
                            placeholder="Nombre del Curso"
                        />
                        <select
                            value={course.id_profesor}
                            onChange={(ev) => setCourse({ ...course, id_profesor: ev.target.value })}
                        >
                            <option value="">Selecciona un profesor</option>
                            {professors.map((professor) => {
                                if (professor.user_type === 1) {
                                    return (
                                        <option key={professor.id} value={professor.id}>
                                            {professor.name}
                                        </option>)
                                }
                            })}
                        </select>
                        <br />
                        <button className="btn">Guardar</button>
                    </form>
                )}



            </div>
        </div>
    );
}