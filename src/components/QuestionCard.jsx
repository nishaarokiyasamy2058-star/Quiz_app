import React, { useState } from 'react';

const QuestionCard = ({ question, options, selectedAnswer, onSelectOption, hint }) => {
  const [showHint, setShowHint] = useState(false);

  const containerStyle = {
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    marginBottom: '20px',
  };

  const questionStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
  };

  const optionsContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '20px',
  };

  const buttonStyle = (isSelected) => ({
    padding: '12px 16px',
    border: `2px solid ${isSelected ? '#4CAF50' : '#ddd'}`,
    borderRadius: '4px',
    backgroundColor: isSelected ? '#e8f5e9' : '#fff',
    color: isSelected ? '#2e7d32' : '#333',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: isSelected ? 'bold' : 'normal',
    transition: 'all 0.2s ease',
  });

  const hintButtonStyle = {
    padding: '10px 16px',
    backgroundColor: '#2196F3',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    marginBottom: '15px',
    fontWeight: '500',
  };

  const hintStyle = {
    padding: '12px',
    backgroundColor: '#fff9c4',
    borderLeft: '4px solid #FBC02D',
    marginTop: '10px',
    color: '#F57F17',
    borderRadius: '4px',
    fontSize: '14px',
  };

  return (
    <div style={containerStyle}>
      <div style={questionStyle}>{question}</div>

      <div style={optionsContainerStyle}>
        {options.map((option, index) => (
          <button
            key={index}
            style={buttonStyle(selectedAnswer === option)}
            onClick={() => onSelectOption(option)}
          >
            {option}
          </button>
        ))}
      </div>

      <button style={hintButtonStyle} onClick={() => setShowHint(!showHint)}>
        {showHint ? 'Hide Hint' : 'Show Hint'}
      </button>

      {showHint && hint && <div style={hintStyle}>{hint}</div>}
    </div>
  );
};

export default QuestionCard;
