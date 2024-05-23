import React from 'react';
import { Link } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';

export default function Games() {
    const { user } = useStateContext();
    console.log(user)
    return (
        <div>
            <h1 className="title">GAMES</h1>
            <div className="flex">
                <Link to="/games/piano" className='w-1/4 border-2 bg-white m-3 scale-95 hover:scale-100'>
                    <div className="ml-2">
                        <h2 className="subtitle">PIANO</h2>
                        <p className="ml-[30px]" style={{ color: "black" }}>SECUENCIAS ACERTADAS {user.games?.piano?.correct_sequences || 0}</p>
                    </div>
                </Link>

                <Link to="/games/hangedman" className='w-1/4 border-2 bg-white m-3 scale-95 hover:scale-100'>
                    <div>
                        <h2 className="subtitle">HANGED MAN</h2>
                        <p className="ml-[30px]" style={{ color: "black" }}>PALABRAS ACERTADAS {user.games?.piano?.correct_sequences || 0}</p>
                    </div>
                </Link>

            </div>
        </div>
    )
}