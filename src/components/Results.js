import React from 'react';

function Results({ results, onBack }) {
  return (
    <div className="results">
      <button onClick={onBack} className="back-button">← Back to Decks</button>
      <h2>Session Results</h2>
      
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Response Time (seconds)</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index}>
              <td>{result.item.word}</td>
              <td>{result.timeTaken.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="summary">
        <p>Average response time: {(results.reduce((sum, result) => sum + result.timeTaken, 0) / results.length).toFixed(2)} seconds</p>
      </div>
    </div>
  );
}

export default Results;