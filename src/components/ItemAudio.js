// components/ItemAudio.js
import React from 'react';

import dictionaryData from '../data/dictionary';

const ItemAudio = ({ sentence, word, isPlaying, onReplay }) => {

    const words = sentence.split(' ');
    console.log(sentence);
    console.log(words);
    console.log(word);

    return (
        <div>
            <div className="item-hint">
                <h1>
                    {words.map((w, index) => (
                        <span key={index}>
                            {w === word ? (
                                // Replace non-target words with underscores of equal length
                                <span className="hidden-word">{'_'.repeat(w.length)}</span>
                            ) : (
                                // Show the actual word if it's the target word
                                <span className="highlighted-word">{w}</span>
                            )}
                            {index < words.length - 1 ? ' ' : ''}
                        </span>
                    ))}
                </h1>
            </div>
            <div className="item-audio">
                <p>{isPlaying ? 'Playing audio...' : 'Audio ready'}</p>
                <button
                    onClick={onReplay}
                    className="replay-button"
                    disabled={isPlaying}
                >
                    {isPlaying ? 'Playing...' : '↻ Replay Audio'}
                </button>
            </div>
        </div>
    );
};

export default ItemAudio;