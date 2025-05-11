// components/Instructions.js
import React from 'react';

const Instructions = ({ showHint, onNext }) => {
    return (
        <div className="instructions">
            <button
                onClick={onNext}
                className="hint-button"
            >
                {showHint ? 'Continue →' : 'Reveal Hint'}
            </button>
        </div>
    );
};

export default Instructions;