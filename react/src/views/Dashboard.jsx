import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";

export default function Dashboard() {
    const { user, token, setUser, setToken, notification } = useStateContext();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [participaciones, setParticipaciones] = useState([]);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axiosClient.get('/cursos')
            .then(({ data }) => {
                setCourses(data.data);
            }, [])

        axiosClient.get('/participaciones')
            .then(({ data }) => {
                setParticipaciones(data.data);
            }, [])

        axiosClient.get('/users')
            .then(({ data }) => {
                setUsers(data.data);
            }, [])
    }, [])

    const handleClick = (course) => {
        console.log("hola")
        console.log(course);
        navigate(`/course/${course}`);
    }

    return (
        <div className="Dashboard">
            <h1 className="title">WELCOME TO THE VIRTUAL CAMPUS, </h1>
            <h2 className="subtitle">{user.name}</h2>

            {(user.user_type == 1 || user.user_type == 2) && <div className="flex">
                <h1 className="subtitle2">USE THE BUTTONS ON THE SIDE MENU TO NAVIGATE AND CONFIGURE THE APP.</h1>
            </div>
            }

            {(user.user_type == 0) && <div className="flex">
                {courses.filter(course => {
                    const matchingParticipation = participaciones.find(p => p.id_curso === course.id_curso && p.id_usuario === user.id);
                    return matchingParticipation !== undefined;
                }).map((course) => {
                    const professor = users.find(u => u.id === course.id_profesor);
                    return (
                        <Link className="w-1/4 scale-95 hover:scale-100" to={`/course/${course.id_curso}`}>
                            <div className=" h-[200px] card animated fadeInDown relative ml-5 hover:cursor-pointer" key={course.id_curso}>
                                <div style={{ borderBottomRightRadius: "6PX", borderBottomLeftRadius: "6PX" }} className="absolute bottom-0 left-0 p-4 w-full bg-blue-500 border-t-2 border-black h-18">
                                    <h3 className="">{course.nombre_curso}</h3>
                                    <p>Teacher: {professor ? professor.name : 'N/A'}</p>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
            }

            {(user.user_type == 1) && <div className="flex">
                {courses.filter(course => {
                    const matchingParticipation = courses.find(p => p.id_curso === course.id_curso && p.id_profesor === user.id);
                    return matchingParticipation !== undefined;
                }).map((course) => {
                    const professor = users.find(u => u.id === course.id_profesor);
                    return (
                        <Link className="w-1/4 scale-95 hover:scale-100" to={`/course/${course.id_curso}`}>
                            <div className="h-[200px] card animated fadeInDown relative ml-5 hover:cursor-pointer hover:scale-125 " key={course.id_curso}>
                                <div style={{ borderBottomRightRadius: "6PX", borderBottomLeftRadius: "6PX" }} className="absolute bottom-0 left-0 p-4 w-full bg-yellow-500 border-t-2 border-black h-18">
                                    <h3 className="">{course.nombre_curso}</h3>
                                    <p>Teacher: {professor ? professor.name : 'N/A'}</p>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
            }
        </div>
    );
}