import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CountryQuestion from './CountryQuestion';
import Score from './Score';

function App() {
  const [countries, setCountries] = useState([]);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        setCountries(response.data);
        setIsLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching countries:', error);
        setIsLoading(false); // Set loading to false even if there is an error
      }
    };

    fetchCountries();
  }, []);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  return (
    <div>
      <h1>Country and Capital Quiz</h1>
      {isLoading ? (
        <p>Loading...</p> // Show loading indicator while fetching data
      ) : (
        <>
          <Score score={score} />
          <CountryQuestion countries={countries} onAnswer={handleAnswer} />
        </>
      )}
    </div>
  );
}

export default App;
