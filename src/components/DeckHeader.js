// components/DeckHeader.js
import React from 'react';

const DeckHeader = ({ deck, currentIndex, itemsLength, onBack }) => {
    return (
        <div className="deck-header">
            <button onClick={onBack} className="back-button">← Back to Decks</button>
            <h2>{deck.name}</h2>
            <div className="progress">
                Item {currentIndex + 1} of {itemsLength}
            </div>
        </div>
    );
};

export default DeckHeader;