import { Link } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { useRef, createRef } from "react";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { useState } from "react";

export default function LoginForm() {
    const emailRef = useRef();
    const passwordRef = useRef();

    const [errors, setErrors] = useState(null);
    const { setUser, setToken } = useStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        let dataSaver;
        setErrors(null)
        axiosClient.post('/login', payload)
            .then(({ data }) => {
                setUser(data.user)
                setToken(data.token)
                window.location.href = '/dashboard'
            }).catch(err => {
                const response = err.response
                if (response && response.status === 422 || response.status === 500) {
                    if (response.data.errors) {
                        console.log(response.data.errors);
                        setErrors(response.data.errors)
                    } else {
                        setErrors({
                            email: [response.data.message]
                        })
                    }
                }
            })
    }
    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    {errors &&
                        <div className="alert">
                            {Object.keys(errors).map(key => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    }
                    <h1 className="title">
                        EMAIL
                    </h1>
                    <input ref={emailRef} className="form-input" type="email" placeholder="Email" />
                    <h1 className="title">
                        PASSWORD
                    </h1>
                    <input ref={passwordRef} className="form-input" type="password" placeholder="Password" />
                    <button className="btn btn-block">LOGIN</button>
                    <p className="message">
                        Don't have an account? <br /><Link to="/signup">Create an account</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}