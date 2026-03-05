import React, { useEffect, useState, useRef } from "react";
import questionsData from "../data/questions";

export default function Quiz() {

  const questions = questionsData;
  const TOTAL_TIME = 300;

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(
    Array(questions.length).fill(null)
  );
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [detailedResults, setDetailedResults] = useState([]);
  const timerRef = useRef(null);

  // Start Timer
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  // Auto submit when time ends
  useEffect(() => {
    if (timeLeft <= 0 && !submitted) {
      handleSubmit();
    }
  }, [timeLeft]);

  function selectOption(index) {
    const updated = [...answers];
    updated[current] = index;
    setAnswers(updated);
  }

  function next() {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    }
  }

  function prev() {
    if (current > 0) {
      setCurrent(current - 1);
    }
  }

  function handleSubmit() {
    if (submitted) return;

    clearInterval(timerRef.current);

    let correctCount = 0;

    const details = questions.map((q, i) => {
      const selectedIndex = answers[i];
      const correctIndex = q.options.indexOf(q.correctAnswer); // ✅ FIX
      const isCorrect = selectedIndex === correctIndex;

      if (isCorrect) correctCount++;

      return {
        question: q.question,
        selectedText:
          selectedIndex != null ? q.options[selectedIndex] : null,
        correctText: q.correctAnswer,
        isCorrect
      };
    });

    setScore(correctCount);
    setDetailedResults(details);
    setSubmitted(true);
  }

  // RESULT SCREEN
  if (submitted) {

    const timeTaken = TOTAL_TIME - Math.max(0, timeLeft);

    return (
      <div style={{ padding: 20 }}>
        <h2>Quiz Result</h2>

        <p>
          You scored <strong>{score}</strong> out of {questions.length}
        </p>

        <p>
          Time taken: <strong>{timeTaken}</strong> seconds
        </p>

        <ol>
          {detailedResults.map((r, i) => (
            <li key={i} style={{ marginBottom: 12 }}>
              <div><strong>{r.question}</strong></div>
              <div>
                Selected: {r.selectedText ?? <em>Not answered</em>}
              </div>
              <div>Correct: {r.correctText}</div>
              <div style={{ color: r.isCorrect ? "green" : "red" }}>
                {r.isCorrect ? "Correct" : "Incorrect"}
              </div>
            </li>
          ))}
        </ol>

        <button onClick={() => window.location.reload()}>
          Retry Quiz
        </button>
      </div>
    );
  }

  const currentQ = questions[current];

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>
          Question {current + 1} / {questions.length}
        </h3>
        <div>
          <strong>Time:</strong> {timeLeft}s
        </div>
      </div>

      <p style={{ fontSize: 18 }}>{currentQ.question}</p>

      {currentQ.options.map((opt, i) => (
        <label key={i} style={{ display: "block", margin: "6px 0" }}>
          <input
            type="radio"
            name={`q_${current}`}
            checked={answers[current] === i}
            onChange={() => selectOption(i)}
          />
          {opt}
        </label>
      ))}

      <div style={{ marginTop: 12 }}>
        <button onClick={prev} disabled={current === 0}>
          Previous
        </button>

        <button
          onClick={next}
          disabled={current === questions.length - 1}
          style={{ marginLeft: 10 }}
        >
          Next
        </button>

        <button
          onClick={handleSubmit}
          style={{ marginLeft: 20 }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}