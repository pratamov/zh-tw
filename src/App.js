import React, { useState, useEffect } from 'react';
import Deck from './components/Deck';
import Results from './components/Results';
import data from './data/data';
import './styles.css';

function App() {
  const [currentDeck, setCurrentDeck] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState([]);
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setDecks(data.decks);
    setLoading(false);
    // const fetchDecks = async () => {
    //   try {
    //     const response = await fetch('/decks.json');
    //     if (!response.ok) {
    //       throw new Error('Failed to load decks');
    //     }
    //     const data = await response.json();
    //     setDecks(data.decks);
    //   } catch (err) {
    //     setError(err.message);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // fetchDecks();
  }, []);

  const handleDeckSelect = (deck) => {
    setCurrentDeck(deck);
    setShowResults(false);
  };

  const handleSessionComplete = (timings) => {
    setResults(timings);
    setShowResults(true);
    setCurrentDeck(null);
  };

  if (loading) return <div className="loading">Loading decks...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="app">
      {!currentDeck && !showResults && (
        <div className="deck-selection">
          <h1>Select a Deck</h1>
          <div className="decks">
            {decks.map(deck => (
              <button 
                key={deck.id} 
                className="deck-button"
                onClick={() => handleDeckSelect(deck)}
              >
                {deck.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {currentDeck && !showResults && (
        <Deck 
          key={currentDeck.word}
          deck={currentDeck} 
          onComplete={handleSessionComplete} 
          onBack={() => setCurrentDeck(null)}
        />
      )}

      {showResults && (
        <Results 
          results={results} 
          onBack={() => setShowResults(false)}
        />
      )}
    </div>
  );
}

export default App;