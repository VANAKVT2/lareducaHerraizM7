import React, { useEffect } from 'react';

export default function NotFound() {

    useEffect(() => {
        setTimeout(() => {
            window.location.href = '/dashboard';
        }, 3000)
    }, [])
    return (
        <div className="NotFound ">
            <h1 className="title">404 - NOT FOUND.</h1>
            <h2 className="subtitle">REDIRECTING...</h2>
        </div>
    )
}