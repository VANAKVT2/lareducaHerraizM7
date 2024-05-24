import React, { useEffect, useState } from 'react';

function CountryQuestion({ countries, onAnswer }) {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [countryInput, setCountryInput] = useState('');
    const [capitalInput, setCapitalInput] = useState('');

    useEffect(() => {
        if (countries.length > 0) {
            selectRandomCountry();
        }
    }, [countries]);

    const selectRandomCountry = (maxRetries = 10) => {
        if (maxRetries === 0) {
            const defaultCountry = countries.find(country => country.capital?.length > 0);
            if (defaultCountry) {
                setSelectedCountry(defaultCountry);
            } else {
                setSelectedCountry(countries[0]);
            }
            setCountryInput('');
            setCapitalInput('');
            return;
        }

        const randomIndex = Math.floor(Math.random() * countries.length);
        const randomCountry = countries[randomIndex];
        if (randomCountry && randomCountry.capital && randomCountry.capital.length > 0) {
            setSelectedCountry(randomCountry);
            setCountryInput('');
            setCapitalInput('');
        } else {
            selectRandomCountry(maxRetries - 1);
        }
    };

    const handleCountryInput = (event) => {
        setCountryInput(event.target.value);
    };

    const handleCapitalInput = (event) => {
        setCapitalInput(event.target.value);
    };

    const handleSubmit = () => {
        if (selectedCountry) {
            const isCountryCorrect = countryInput.toLowerCase() === selectedCountry.name.common.toLowerCase();
            const isCapitalCorrect = capitalInput.toLowerCase() === (selectedCountry.capital?.[0].toLowerCase() || '');
            if (isCountryCorrect && isCapitalCorrect) {
                alert("Correct Answer");
            } else if (isCountryCorrect && !isCapitalCorrect) {
                alert(`Correct country, but incorrect capital. The capital of ${selectedCountry.name.common} is ${selectedCountry.capital?.[0]}`);
            }
            else {
                alert("Incorrect Answer");
            }
            onAnswer(isCountryCorrect && isCapitalCorrect);
            selectRandomCountry();
        }
    };

    return (
        <div>
            {selectedCountry && (
                <div className='flex m-28'>
                    <div className='w-1/4'>
                        <img className="w-96 h-56 border-2 border-black" src={selectedCountry.flags.svg} alt={`Flag of ${selectedCountry.name.common}`} />
                    </div>
                    <div>
                        <h2 className='text-3xl'>What is the name of this country?</h2>
                        <input className='border-black border-2' type="text" value={countryInput} onChange={handleCountryInput} />
                        <h2 className='text-3xl'>What is the capital of this country?</h2>
                        <input className='border-black border-2' type="text" value={capitalInput} onChange={handleCapitalInput} />
                        <br />
                        <button onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CountryQuestion;
