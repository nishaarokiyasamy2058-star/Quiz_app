import React from "react";

const Result = ({ score, questions, userAnswers }) => {

  const quizData = {
    score,
    totalQuestions: questions.length,
    answers: userAnswers,
    submittedAt: new Date()
  };

  const exportToBackend = () => {
    fetch("http://localhost:8000/api/save-quiz/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(quizData)
    })
    .then(res => res.json())
    .then(data => console.log("Saved:", data))
    .catch(err => console.error("Error:", err));
  };

  return (
    <div>
      <h2>Quiz Result</h2>
      <h3>Your Score: {score} / {questions.length}</h3>

      <h3>Detailed Analysis</h3>

      {questions.map((q, index) => (
        <div key={index} style={{ marginBottom: "15px" }}>
          <p><strong>Question {index + 1}:</strong> {q.question}</p>
          <p>Your Answer: {q.options[userAnswers[index]]}</p>
          <p>Correct Answer: {q.options[q.correctAnswer]}</p>
          <p>Explanation: {q.explanation}</p>
        </div>
      ))}

      <button onClick={exportToBackend}>
        Export Quiz Data
      </button>
    </div>
  );
};

export default Result;