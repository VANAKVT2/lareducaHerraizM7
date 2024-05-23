import React, { useEffect, useState } from 'react';
import axiosClient from '../../axios-client';
import { useStateContext } from '../../contexts/ContextProvider';
import VirtualKeyboard from './VirtualKeyboard';

const MusicGame = () => {
    const { user } = useStateContext();
    const [sequence, setSequence] = useState([]);
    const [userInput, setUserInput] = useState([]);
    let puntuacion = user.puntuacion_piano;
    if (puntuacion == null) {
        puntuacion = 0;
    }
    const [score, setScore] = useState(puntuacion);
    const [maxScore, setMaxScore] = useState(0);

    const keyMap = {
        'A': 'C',
        'W': 'C#',
        'S': 'D',
        'E': 'D#',
        'D': 'E',
        'F': 'F',
        'T': 'F#',
        'G': 'G',
        'Y': 'G#',
        'H': 'A',
        'U': 'A#',
        'J': 'B',
        'K': 'C2'
    };

    const getKeyFromNote = (note) => {
        return Object.keys(keyMap).find((key) => keyMap[key] === note);
    }

    useEffect(() => {
        generateSequence();
    }, []);

    const generateSequence = () => {
        const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C2', 'C#', 'D#', 'F#', 'G#', 'A#'];
        const newSequence = [];
        for (let i = 0; i < Math.floor(Math.random() * (12 - 4 + 1) + 4); i++) {
            newSequence.push(notes[Math.floor(Math.random() * notes.length)]);
        }
        setSequence(newSequence);
        setUserInput([]);
    };

    const uploadScoreToDatabase = (newScore) => {
        console.log(user)
        axiosClient.post('/puntuaciones', {
            puntuacion: newScore,
            id_usuario: user.id,
            nombre_juego: "piano"
        })
            .then((response) => {
                console.log('Puntuación actualizada:', response.data);
            })
            .catch((error) => {
                console.error('Error al actualizar la puntuación:', error);
            });
    };

    const generateKeyboardSequence = () => {
        return sequence.map((note) => getKeyFromNote(note));
    }

    const handleUserInput = (note) => {
        const updatedUserInput = [...userInput, note];
        setUserInput(updatedUserInput);

        if (updatedUserInput[updatedUserInput.length - 1] === sequence[updatedUserInput.length - 1]) {
            console.log("correcto");
        } else {
            console.log("incorrecto");
            setUserInput([]);
            setScore(0);
        }

        if (updatedUserInput.length === sequence.length) {
            if (updatedUserInput.every((note, index) => note === sequence[index])) {
                const newScore = score + 1;
                setScore(newScore);
                uploadScoreToDatabase(newScore);
                generateSequence();
                generateKeyboardSequence();
                if (newScore > maxScore) {
                    setMaxScore(newScore);
                }
            }
        }

        console.log(updatedUserInput, sequence);
    };

    return (
        <div className="music-game">
            <div className="piano_sequence">
                {sequence.map((note, index) => (
                    <span
                        key={index}
                        className={
                            userInput[index] && userInput[index] === note ? 'correct' : ''
                        }
                    >
                        {note}{' '}
                    </span>
                ))}
            </div>

            <div className="flex text-center piano_score text-white">
                <div className="piano_score">Max score: {maxScore}</div>
                <div className="piano_score">Score: {score}</div>
            </div>
            <hr className="w-1/2 piano_bar" />
            <VirtualKeyboard onUserInput={handleUserInput} />
        </div>
    );
};

export default MusicGame;