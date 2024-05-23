import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Courses() {
    /* context */
    const { user } = useStateContext();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pages, setPages] = useState(null);


    useEffect(() => {
        getCourses();
    }, []);

    const onDelete = (course) => {
        if (window.confirm(`Are you sure you want to delete ${course.nombre_curso} from the Database?`)) {
            axiosClient.delete(`/cursos/${course.id_curso}`)
                .then(() => {
                    getCourses();
                })
                .catch((err) => {
                    console.log(err.response.data);
                });
        }
    };
    const getTeacherName = async (id) => {
        try {
            const response = await axiosClient.get(`/users/${id}`);
            const teacher = response.data;
            return teacher.name;
        } catch (error) {
            console.log(error.response.data);
            return 'Unknown';
        }
    };


    const getCourses = (page = 1) => {
        setLoading(true);
        axiosClient.get(`/cursos?page=${page}`)
            .then(({ data }) => {
                setLoading(false);
                console.log("Courses", data.data);
                setCourses(data.data);
                setPages(data.meta);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err.response.data);
            });
    };

    if (!user.user_type == 1 || !user.user_type == 2) {
        return <Navigate to="/dashboard" />;
    }
    return (
        <div className="Courses">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Courses</h1>
                <Link to="/courses/new" className="btn-add">Add New</Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>TEACHER</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>

                    {loading &&
                        <tbody>
                            <tr>
                                <td colSpan="5" className="text-center">Loading...</td>
                            </tr>
                        </tbody>}

                    {!loading &&
                        <tbody>
                            {
                                courses.map(course => (
                                    <tr key={course.id_curso}>
                                        <td>{course.id_curso}</td>
                                        <td>{course.nombre_curso}</td>
                                        <td>{course.id_profesor}</td>
                                        <td>
                                            <Link className="btn-edit mx-2" to={`/courses/${course.id_curso}`}>Edit</Link>
                                            <Link className="btn-add mx-2" to={`/courses/${course.id_curso}/matriculations`}>Students</Link>
                                            <button onClick={ev => onDelete(course)} className="btn-delete mx-2">Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>}
                </table>
            </div>
            <div className="pagination w-full">
                {pages && pages.links.map((link, index) => (
                    <button
                        className={`btn ${link.active ? 'active' : ''} w-1/${pages.links.length}`}
                        key={index}
                        onClick={() => getUsers(new URL(link.url).searchParams.get('page'))}
                        disabled={link.url === null}
                    >
                        {index === 0 ? '«' : index === pages.links.length - 1 ? '»' : link.label}
                    </button>
                ))}
            </div>
        </div>
    );
}