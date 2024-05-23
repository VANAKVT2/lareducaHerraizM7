import { useEffect, useState } from "react";
import { palabras } from "./palabras";
export default function Hangman() {
    const [word, setWord] = useState("");
    const [guesses, setGuesses] = useState([]);
    const [mistakes, setMistakes] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [victory, setVictory] = useState(false);
    


    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * palabras.length);
        setWord(palabras[randomIndex]);
    }, []);

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

        checkGameStatus();
    };


    const checkGameStatus = () => {
        if (mistakes >= 6) {
            setGameOver(true);
        } else if (word.split("").every((letter) => guesses.includes(letter))) {
            setVictory(true);
        } else {
            setVictory(false);
        }
    };


    return (
        <div className="Hangman">
            <h1>Physics Hangman</h1>
            <div className="word">{renderWord()}</div>
            <div className="incorrect-guesses">
                Incorrect guesses: {renderIncorrectGuesses().join(", ")}
            </div>
            <div className="mistakes">Mistakes: {mistakes}/6</div>
            {gameOver && <div className="game-over">Game Over! The word was "{word}".</div>}
            {victory && <div className="victory">Congratulations, you won!</div>}
            <div className="keyboard">
                {["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"].map(
                    (letter) => (
                        <button
                            key={letter}
                            onClick={() => handleGuess(letter)}
                            disabled={guesses.includes(letter) || gameOver || victory}
                        >
                            {letter}
                        </button>
                    )
                )}
            </div>
        </div>
    );
}