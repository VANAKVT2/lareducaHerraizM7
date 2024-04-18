import { Link } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { createRef } from "react";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { useState } from "react";

export default function LoginForm() {
    const onSubmit = (ev) => {
        ev.preventDefault();
    }
    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">
                        EMAIL
                    </h1>
                    <input className="form-input" type="email" placeholder="Email" />
                    <h1 className="title">
                        PASSWORD
                    </h1>
                    <input className="form-input" type="password" placeholder="Password" />
                    <button className="btn btn-block">LOGIN</button>
                    <p className="message">
                        Don't have an account? <br /><Link to="/signup">Create an account</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}