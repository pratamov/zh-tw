// components/ItemHint.js
import React from 'react';

import dictionaryData from '../data/dictionary';

const ItemHint = ({ sentence, word }) => {

    const words = sentence.split(' ');
    const meanings = words.map(w => "\"" + dictionaryData[w]?.meaning + "\"").filter(Boolean).join(' ');
    const pinyins = words.map(w => dictionaryData[w]?.pinyin).filter(Boolean).join(' ');
    const animations = dictionaryData[word]?.animation;

    return (
        <div className="item-hint">
            <h1>
                {words.map((w, index) => (
                    <span key={index}>
                        {w === word ? (
                            // Replace non-target words with underscores of equal length
                            <span className="hidden-word">{w}</span>
                        ) : (
                            // Show the actual word if it's the target word
                            <span className="highlighted-word">{w}</span>
                        )}
                        {index < words.length - 1 ? ' ' : ''}
                    </span>
                ))}
            </h1>
            <h3><i>{pinyins}</i></h3>
            <div className="dictionary-list">
                <ul>
                    {words.map((w, index) => {
                        const meaning = dictionaryData[w]?.meaning;
                        return meaning ? (
                            <li key={index} className="dictionary-item">
                                <span className="word">
                                    {w} <br/> <i>{dictionaryData[w]?.pinyin}</i>
                                </span>
                                <span className="meaning">{meaning}</span>
                                <span className="pinyin">
                                    {w === word && animations && (
                                        animations.map((anim, idx) => (
                                            <div key={idx}>
                                                <img src={anim}
                                                    alt={`Character animation ${idx + 1}`}
                                                    className="animation-image"
                                                />
                                            </div>
                                        ))
                                    )}
                                </span>
                            </li>
                        ) : null;
                    })}
                </ul>
            </div>
        </div>
    );
};

export default ItemHint;