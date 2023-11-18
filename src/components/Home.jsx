import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App';

const Home = () => {
    const [randomQuote, setRandomQuote] = useState(null);

    useEffect(() => {
        fetch('https://type.fit/api/quotes')
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const randomIndex = Math.floor(Math.random() * data.length);
                    setRandomQuote(data[randomIndex]);
                }
            })
            .catch(error => console.log('Error fetching quotes:', error));
    }, []);

    return (
        <div className='container'>
             <h1>Quote of the day</h1>
            {randomQuote ? (
                <div>
                    <h2>{randomQuote.text}</h2>
                    <p>— {randomQuote.author || 'Unknown'}</p>
                </div>
            ) : (
                <p>Loading quote...</p>
            )}
        </div>
    );
}

export default Home;
