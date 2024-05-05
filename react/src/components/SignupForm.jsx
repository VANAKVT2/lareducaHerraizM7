import { Link } from "react-router-dom";
import { createRef, useState, useRef } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";

export default function SignupForm() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    const [errors, setErrors] = useState(null);

    const { setUser, setToken } = useStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            user_type: 1, // Use the value directly in the payload
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value
        };

        axiosClient.post('/signup', payload)
            .then(({ data }) => {
                console.log("DATA:", data);
                setUser(data.user);
                setToken(data.token);
                localStorage.setItem('token', data.token);
                window.location.href = '/dashboard';
            }).catch(err => {
                const response = err.response;
                if (response && (response.status === 422 || response.status === 500)) {
                    console.log("DATA SENT WAS: ", payload);
                    console.log("ERRORS: ", response.data.errors);
                    setErrors(response.data.errors);
                }
            });
    };

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title" style={{ textAlign: "center", margin: "0px", marginLeft: "-5px" }}>
                        ENROLLMENT FORM
                    </h1>
                    {errors &&
                        <div className="alert">
                            {Object.keys(errors).map(key => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    }
                    <input ref={nameRef} type="text" placeholder="Full Name" />
                    <input ref={emailRef} type="text" placeholder="Email Adress" />
                    <input ref={passwordRef} type="password" placeholder="Password" />
                    <input ref={passwordConfirmationRef} type="password" placeholder="Password Confirmation" />
                    <button className="btn btn-block">REGISTER</button>
                    <p className="message">
                        Already Registered? <Link to="/login">Sign In</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}