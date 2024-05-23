import { useEffect, useState } from "react";
import axiosClient from '../../axios-client.js';
import { useStateContext } from "../../contexts/ContextProvider.jsx";
import { palabras } from "./palabras";

export default function Hangman() {
    const { user } = useStateContext();
    const [word, setWord] = useState("");
    const [guesses, setGuesses] = useState([]);
    const [mistakes, setMistakes] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [victory, setVictory] = useState(false);
    const [score, setScore] = useState(user.puntuacion_piano);

    useEffect(() => {
        startNewGame();
    }, []);

    const startNewGame = () => {
        const randomIndex = Math.floor(Math.random() * palabras.length);
        setWord(palabras[randomIndex]);
        setGuesses([]);
        setMistakes(0);
        setGameOver(false);
        setVictory(false);
        setScore(0);
    };

    useEffect(() => {
        const { gameOver: newGameOver, victory: newVictory } = checkGameStatus();
        setGameOver(newGameOver);
        setVictory(newVictory);

        if (newVictory) {
            setScore(word.length - mistakes);
        }
    }, [guesses, mistakes]);

    useEffect(() => {
        if (victory && score > user.puntuacion_ahorcado) {
            axiosClient.post('/puntuaciones', {
                puntuacion: score,
                id_usuario: user.id,
                nombre_juego: "ahorcado"
            })
                .then((response) => {
                    console.log('Puntuación actualizada:', response.data);
                })
                .catch((error) => {
                    console.error('Error al actualizar la puntuación:', error);
                });
        }
    }, [victory, score, user]);

    const renderWord = () => {
        return word.split("").map((letter, index) => (
            <span key={index} className={`letter ${guesses.includes(letter) ? "revealed" : ""}`}>
                {guesses.includes(letter) ? letter : "_"}
            </span>
        ));
    };

    const renderIncorrectGuesses = () => {
        return [...new Set(guesses.filter((letter) => !word.includes(letter)))];
    };

    const handleGuess = (letter) => {
        if (gameOver || victory) return;

        if (guesses.includes(letter)) return;

        setGuesses([...guesses, letter]);

        if (!word.includes(letter)) {
            setMistakes(mistakes + 1);
        }
    };

    const checkGameStatus = () => {
        let gameOver = false;
        let victory = false;

        if (mistakes >= 6) {
            gameOver = true;
        } else if (word.split("").every((letter) => guesses.includes(letter))) {
            victory = true;
        }

        return { gameOver, victory };
    };

    return (
        <div className="Hangman">
            <link rel="stylesheet" href="Hangman.css" />
            <h1>Physics Hangman</h1>
            <div className="word">{renderWord()}</div>
            <div className="incorrect-guesses">
                Incorrect guesses: {renderIncorrectGuesses().join(", ")}
            </div>
            <div className="mistakes">Mistakes: {mistakes}/6</div>
            {gameOver && (
                <div className="game-over">
                    Game Over! The word was "{word}".{" "}
                    <button className="btn-add" onClick={startNewGame}>Play Again</button>
                </div>
            )}
            {victory && (
                <div className="victory">
                    Congratulations, you won! Your score is {score}.
                    <br />
                    <button className="btn-add" onClick={startNewGame}>Play Again</button>
                </div>
            )}
            <div className="keyboard">
                {["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"].map(
                    (letter) => (
                        <button
                            key={letter}
                            onClick={() => handleGuess(letter)}
                            disabled={guesses.includes(letter) || gameOver || victory}
                            className={guesses.includes(letter) || gameOver || victory ? "disabled" : ""}
                        >
                            {letter}
                        </button>
                    )
                )}
            </div>
        </div>
    );
}