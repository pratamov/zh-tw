import React, { useState, useEffect, useRef } from 'react';

function Deck({ deck, onComplete, onBack }) {
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [timings, setTimings] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Shuffle items and initialize state
  useEffect(() => {
    const shuffledItems = [...deck.items].sort(() => Math.random() - 0.5);
    setItems(shuffledItems);
    setCurrentIndex(0);
    setShowHint(false);
    setTimings([]);
    setIsPlaying(false);
  }, [deck]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showHint, currentIndex, items.length]);

  // Play audio when item changes
  useEffect(() => {
    if (items.length > 0 && currentIndex < items.length) {
      setShowHint(false);
      setStartTime(Date.now());
      playAudio();
    }
  }, [currentIndex, items]);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.src = items[currentIndex].mp3;
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(e => console.error("Audio play failed:", e));
    }
  };

  const handleReplay = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(e => console.error("Audio replay failed:", e));
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const handleNext = () => {
    if (!showHint) {
      // First Enter press - show hint
      setShowHint(true);
      
      // Record time taken to respond
      const timeTaken = (Date.now() - startTime) / 1000;
      setTimings(prev => [...prev, {
        item: items[currentIndex],
        timeTaken
      }]);
    } else {
      // Second Enter press - move to next item
      if (currentIndex < items.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        // Session complete
        onComplete(timings);
      }
    }
  };

  if (items.length === 0) return <div>Loading...</div>;

  return (
    <div className="deck">
      <audio 
        ref={audioRef} 
        onEnded={handleAudioEnded}
      />
      
      <div className="deck-header">
        <button onClick={onBack} className="back-button">← Back to Decks</button>
        <h2>{deck.name}</h2>
        <div className="progress">
          Item {currentIndex + 1} of {items.length}
        </div>
      </div>

      <div className="item-container">
        {!showHint && (
          <div className="item-audio">
            <p>{isPlaying ? 'Playing audio...' : 'Audio ready'}</p>
            <button 
              onClick={handleReplay} 
              className="replay-button"
              disabled={isPlaying}
            >
              {isPlaying ? 'Playing...' : '↻ Replay Audio'}
            </button>
          </div>
        )}

        {showHint && (
          <div className="item-hint">
            <h1>{items[currentIndex].word}</h1>
            <p>[{items[currentIndex].pinyin}] : {items[currentIndex].means}</p>

            <div className="animation-container">
                {Array.isArray(items[currentIndex].animation) ? (
                    items[currentIndex].animation.map((anim, index) => (
                    <img 
                        key={index} 
                        src={anim} 
                        alt={`Character animation ${index + 1}`}
                        className="animation-image"
                    />
                    ))
                ) : (
                    <img 
                    src={items[currentIndex].animation} 
                    alt="Character animation"
                    className="animation-image"
                    />
                )}
            </div>
          </div>
        )}

        <div className="instructions">
          <p>Press Enter to {showHint ? 'continue' : 'reveal hint'}</p>
        </div>
      </div>
    </div>
  );
}

export default Deck;