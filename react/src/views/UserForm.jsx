import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";

export default function UserForm() {
    const navigate = useNavigate();
    let { id } = useParams();
    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
        user_type: 1,
        password: '',
        password_confirmation: ''
    })
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const { setNotification } = useStateContext()

    if (id) {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`/users/${id}`)
                .then(({ data }) => {
                    console.log("A CHUPARLAAAA")
                    setLoading(false)
                    setUser(data)
                })
                .catch(() => {
                    setLoading(false)
                })
        }, [])
    }

    const onSubmit = ev => {
        ev.preventDefault()
        if (user.id) {
            axiosClient.put(`/users/${user.id}`, user)
                .then(() => {
                    setNotification('User was successfully updated')
                    navigate('/users')
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors)
                    }
                })
        } else {
            axiosClient.post('/users', user)
                .then(() => {
                    setNotification('User was successfully created')
                    navigate('/users')
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors)
                    }
                })
        }
    }

    return (
        <div>
            <div className="card animated fadeInDown">
                {user.id && <h1>Update User: {user.name}</h1>}
                {!user.id && <h1>New User</h1>}
                {loading && (
                    <div className="text-center">
                        Loading...
                    </div>
                )}
                {errors &&
                    <div className="alert">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                }
                {!loading && (
                    <form onSubmit={onSubmit}>
                        <input value={user.name} onChange={ev => setUser({ ...user, name: ev.target.value })} placeholder="Nombre" />
                        <input value={user.email} onChange={ev => setUser({ ...user, email: ev.target.value })} placeholder="Correo" />
                        <input type="password" onChange={ev => setUser({ ...user, password: ev.target.value })} placeholder="Contraseña" />
                        <input type="password" onChange={ev => setUser({ ...user, password_confirmation: ev.target.value })} placeholder="Confimar contraseña" />
                        <select value={user.user_type} onChange={ev => setUser({ ...user, user_type: parseInt(ev.target.value) })}>
                            <option value="0">Alumno</option>
                            <option value="1">Profesor</option>
                            <option value="2">Admin</option>
                        </select>
                        <button className="btn">Guardar</button>
                    </form>
                )}
            </div>
        </div>
    )
}