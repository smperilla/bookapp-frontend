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
            <strong>Quote of the Day: </strong>
            {randomQuote ? (
                <div>
                    <p>{randomQuote.text}</p>
                    <p>— {randomQuote.author || 'Unknown'}</p>
                </div>
            ) : (
                <p>Loading quote...</p>
            )}
        </div>
    );
}

export default Home;
