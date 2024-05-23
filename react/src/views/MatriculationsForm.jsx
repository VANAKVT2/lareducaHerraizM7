import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";

export default function MatriculationsForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [course, setCourse] = useState({ id_curso: null, nombre_curso: '', id_profesor: null });
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const [students, setStudents] = useState([]);
    const [matriculatedStudents, setMatriculatedStudents] = useState([]);
    const [dbMatriculations, setdbMatriculations] = useState([]);
    const [deletedMatriculations, setDeletedMatriculations] = useState([]);
    const { setNotification } = useStateContext();

    
    if (!user.user_type == 1 || !user.user_type == 2) {
        return <Navigate to="/dashboard" />;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { data: usersData } = await axiosClient.get('/users?user_type=1');
                setStudents(usersData.data);
                const { data: participacionesData } = await axiosClient.get('/participaciones');
                setMatriculatedStudents(participacionesData.data);
                setdbMatriculations(participacionesData.data);
                const { data: cursoData } = await axiosClient.get(`/cursos/${id}`);
                setCourse(cursoData);
            } catch (err) {
                console.log(err.response.data.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleDeleteParticipation = async (id_usuario, id_curso) => {
        try {
            setMatriculatedStudents(matriculatedStudents.filter((student) => !(student.id_usuario === id_usuario && student.id_curso === id_curso)));
            setdbMatriculations(dbMatriculations.filter((dbStudent) => !(dbStudent.id_usuario === id_usuario && dbStudent.id_curso === id_curso)));
            setDeletedMatriculations(prevData => [
                ...prevData,
                {
                    id_usuario: id_usuario,
                    id_curso: id_curso
                }
            ]);
            console.log("Matriculation was successfully deleted from the view");
        } catch (err) {
            console.log(err.response.data.message);
        }
    };

    const handleCreateParticipations = async () => {
        const newMatriculations = matriculatedStudents.filter(
            (student) => !dbMatriculations.some(
                (dbStudent) =>
                    dbStudent.id_usuario === student.id_usuario &&
                    dbStudent.id_curso === student.id_curso
            )
        );

        for (const student of newMatriculations) {
            try {
                await axiosClient.post('/participaciones', student);
                console.log("Matriculation was successfully created");
            } catch (err) {
                console.log(err.response.data.message);
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            }
        }
    };

    const onSubmit = async (ev) => {
        ev.preventDefault();
        await handleCreateParticipations();

        try {
            console.log("Deleting matriculations from the database", deletedMatriculations)
            for (const student of deletedMatriculations) {
                console.log("Accesing url", `/participaciones/${student.id_usuario}/${student.id_curso}`)
                await axiosClient.delete(`/participaciones/${student.id_usuario}/${student.id_curso}`);
            }

            setMatriculatedStudents(matriculatedStudents.filter((student) =>
                deletedMatriculations.every((deletedStudent) =>
                    !(student.id_usuario === deletedStudent.id_usuario && student.id_curso === deletedStudent.id_curso)
                )
            ));

            setdbMatriculations(dbMatriculations.filter((dbStudent) =>
                deletedMatriculations.every((deletedStudent) =>
                    !(dbStudent.id_usuario === deletedStudent.id_usuario && dbStudent.id_curso === deletedStudent.id_curso)
                )
            ));

            console.log("Matriculations were successfully deleted from the database");
            navigate('/courses');
        } catch (err) {
            console.log(err.response.data.message);
        }
    };

    return (
        <div>
            <div className="card animated fadeInDown">
                {course.id_curso && <h1>Updating matriculations for course " <span className="text-orange-600">{course.nombre_curso}</span> "</h1>}
                {!course.id_curso && <h1>New Course</h1>}
                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : errors ? (
                    <div className="alert">
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                ) : (
                    <form onSubmit={onSubmit}>
                        <select
                            value={course.id_profesor}
                            onChange={(ev) => {
                                const newMatriculatedStudent = { id_usuario: ev.target.value, id_curso: course.id_curso };
                                if (!matriculatedStudents.some(matriculatedStudent => matriculatedStudent.id_usuario === newMatriculatedStudent.id_usuario && matriculatedStudent.id_curso === newMatriculatedStudent.id_curso)) {
                                    setMatriculatedStudents(matriculatedStudents => [...matriculatedStudents, newMatriculatedStudent]);
                                }
                            }}
                        >
                            <option value="">Selecciona los alumnos que quieres matricular en este curso</option>
                            {students.filter(student => student.user_type === 0 && !matriculatedStudents.some(matriculatedStudent => matriculatedStudent.id_usuario === student.id && matriculatedStudent.id_curso === course.id_curso)).map((student) => (
                                <option key={student.id} value={student.id}>
                                    {student.name}
                                </option>
                            ))}
                        </select>
                        <br />
                        <div>
                            <h2>Students</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>NAME</th>
                                        <th>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {matriculatedStudents.filter(student => student.id_curso === course.id_curso).map((student) => {
                                        const selectedStudent = students.find(s => s.id === student.id_usuario);
                                        const isNewStudent = !dbMatriculations.some(
                                            (matriculation) =>
                                                matriculation.id_usuario === student.id_usuario &&
                                                matriculation.id_curso === student.id_curso
                                        );
                                        return (
                                            <tr
                                                key={student.id_usuario}
                                                id={student.id_usuario}
                                                className={isNewStudent ? 'bg-gray-300' : ''}
                                            >
                                                <td>{student.id_usuario}</td>
                                                <td>{selectedStudent?.name}</td>
                                                <td>
                                                    <button onClick={() => handleDeleteParticipation(student.id_usuario, course.id_curso)} className="btn-delete">DELETE</button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <button className="btn">Guardar</button>
                    </form>
                )}
            </div>
        </div>
    );
}