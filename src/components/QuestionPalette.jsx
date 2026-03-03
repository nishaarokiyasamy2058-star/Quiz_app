import React from 'react';

const QuestionPalette = ({
  questions,
  userAnswers,
  currentQuestionIndex,
  onQuestionSelect,
}) => {
  const getQuestionStyle = (index) => {
    const isAnswered = userAnswers[index] !== undefined && userAnswers[index] !== null && userAnswers[index] !== '';
    const isCurrent = index === currentQuestionIndex;

    return {
      padding: '10px 15px',
      margin: '5px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: isCurrent ? 'bold' : 'normal',
      backgroundColor: isAnswered ? '#4caf50' : '#f44336',
      color: '#fff',
      border: isCurrent ? '3px solid #2196f3' : '1px solid transparent',
      transition: 'all 0.2s',
      fontSize: '14px',
    };
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(50px, 1fr))',
        gap: '8px',
        padding: '15px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
      }}
    >
      {questions.map((question, index) => (
        <button
          key={index}
          style={getQuestionStyle(index)}
          onClick={() => onQuestionSelect(index)}
          type="button"
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default QuestionPalette;
