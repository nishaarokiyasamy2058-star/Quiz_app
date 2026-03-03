import React from 'react';

const Analysis = ({ questions, userAnswers, score }) => {
  const totalQuestions = questions.length;
  const correctAnswers = userAnswers.filter(
    (answer, index) => answer === questions[index].correctAnswer
  ).length;
  const incorrectAnswers = totalQuestions - correctAnswers;

  const handleExportData = async () => {
    const quizData = {
      score: score,
      totalQuestions: totalQuestions,
      userAnswers: userAnswers,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch('/api/export-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quizData),
      });

      if (response.ok) {
        alert('Quiz data exported successfully!');
      } else {
        alert('Failed to export quiz data');
      }
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Error exporting quiz data');
    }
  };

  const containerStyle = {
    maxWidth: '900px',
    margin: '20px auto',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    fontFamily: 'Arial, sans-serif',
  };

  const headerStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '15px',
    borderRadius: '5px',
    marginBottom: '20px',
    textAlign: 'center',
  };

  const statsStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gap: '15px',
    marginBottom: '20px',
  };

  const statBoxStyle = {
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '5px',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  const statLabelStyle = {
    fontSize: '12px',
    color: '#666',
    textTransform: 'uppercase',
    marginBottom: '5px',
  };

  const statValueStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
  };

  const questionCardStyle = {
    backgroundColor: 'white',
    padding: '15px',
    marginBottom: '15px',
    borderRadius: '5px',
    borderLeft: '5px solid #2196F3',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  const correctStyle = {
    borderLeftColor: '#4CAF50',
  };

  const incorrectStyle = {
    borderLeftColor: '#f44336',
  };

  const questionTextStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#333',
  };

  const answerStyle = {
    marginBottom: '8px',
    padding: '8px',
    backgroundColor: '#f9f9f9',
    borderRadius: '3px',
    fontSize: '14px',
  };

  const labelStyle = {
    fontWeight: 'bold',
    color: '#555',
    marginRight: '5px',
  };

  const explanationStyle = {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#e3f2fd',
    borderRadius: '3px',
    fontSize: '13px',
    color: '#1976d2',
  };

  const resultBadgeStyle = (isCorrect) => ({
    display: 'inline-block',
    padding: '4px 10px',
    borderRadius: '3px',
    fontSize: '12px',
    fontWeight: 'bold',
    backgroundColor: isCorrect ? '#4CAF50' : '#f44336',
    color: 'white',
    marginLeft: '10px',
  });

  const buttonStyle = {
    backgroundColor: '#2196F3',
    color: 'white',
    padding: '12px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
    width: '100%',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1>Quiz Analysis</h1>
      </div>

      <div style={statsStyle}>
        <div style={statBoxStyle}>
          <div style={statLabelStyle}>Total Questions</div>
          <div style={statValueStyle}>{totalQuestions}</div>
        </div>
        <div style={statBoxStyle}>
          <div style={statLabelStyle}>Score</div>
          <div style={statValueStyle}>{score}</div>
        </div>
        <div style={statBoxStyle}>
          <div style={statLabelStyle}>Correct</div>
          <div style={{ ...statValueStyle, color: '#4CAF50' }}>
            {correctAnswers}
          </div>
        </div>
        <div style={statBoxStyle}>
          <div style={statLabelStyle}>Incorrect</div>
          <div style={{ ...statValueStyle, color: '#f44336' }}>
            {incorrectAnswers}
          </div>
        </div>
      </div>

      <div>
        {questions.map((question, index) => {
          const isCorrect = userAnswers[index] === question.correctAnswer;
          return (
            <div
              key={index}
              style={{
                ...questionCardStyle,
                ...(isCorrect ? correctStyle : incorrectStyle),
              }}
            >
              <div style={questionTextStyle}>
                Question {index + 1}
                <span style={resultBadgeStyle(isCorrect)}>
                  {isCorrect ? 'Correct' : 'Incorrect'}
                </span>
              </div>
              <div style={questionTextStyle}>{question.text}</div>
              <div style={answerStyle}>
                <span style={labelStyle}>Your Answer:</span>
                {userAnswers[index] || 'Not answered'}
              </div>
              <div style={answerStyle}>
                <span style={labelStyle}>Correct Answer:</span>
                {question.correctAnswer}
              </div>
              {question.explanation && (
                <div style={explanationStyle}>
                  <strong>Explanation:</strong> {question.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button style={buttonStyle} onClick={handleExportData}>
        Export Quiz Data
      </button>
    </div>
  );
};

export default Analysis;
