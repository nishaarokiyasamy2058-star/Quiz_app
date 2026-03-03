import React, { useEffect, useState, useRef } from 'react'
import questionsData from '../data/questions'

export default function Quiz() {

	const questions = questionsData

	const TOTAL_TIME = 300 // 5 minutes (change to 180 for 3 mins)

	const [current, setCurrent] = useState(0)
	const [answers, setAnswers] = useState(() =>
		Array(questions.length).fill(null)
	)
	const [showHint, setShowHint] = useState(false)
	const [timeLeft, setTimeLeft] = useState(TOTAL_TIME)
	const [submitted, setSubmitted] = useState(false)
	const [score, setScore] = useState(null)
	const [detailedResults, setDetailedResults] = useState([])
	const timerRef = useRef(null)

	// Start Timer
	useEffect(() => {
		timerRef.current = setInterval(() => {
			setTimeLeft(prev => prev - 1)
		}, 1000)

		return () => clearInterval(timerRef.current)
	}, [])

	// Auto submit when time ends
	useEffect(() => {
		if (timeLeft <= 0 && !submitted) {
			handleSubmit('timeout')
		}
	}, [timeLeft])

	function selectOption(index) {
		setAnswers(prev => {
			const copy = [...prev]
			copy[current] = index
			return copy
		})
	}

	function goToQuestion(idx) {
		if (idx < 0 || idx >= questions.length) return
		setCurrent(idx)
		setShowHint(false)
	}

	function next() {
		goToQuestion(Math.min(questions.length - 1, current + 1))
	}

	function prev() {
		goToQuestion(Math.max(0, current - 1))
	}

	function calculateScore(finalAnswers) {
		let correct = 0

		const details = questions.map((q, i) => {
			const selectedIndex = finalAnswers[i]
			const correctIndex = q.correctAnswer
			const isCorrect = selectedIndex === correctIndex

			if (isCorrect) correct++

			return {
				id: q.id,
				question: q.question,
				selectedText:
					selectedIndex != null ? q.options[selectedIndex] : null,
				correctText: q.options[correctIndex],
				hint: q.hint ?? null,
				explanation: q.explanation ?? null,
				isCorrect
			}
		})

		return { score: correct, total: questions.length, details }
	}

	async function handleSubmit(reason = 'manual') {
		if (submitted) return

		clearInterval(timerRef.current)
		setSubmitted(true)

		const results = calculateScore(answers)

		setScore(results.score)
		setDetailedResults(results.details)

		const timeTaken = TOTAL_TIME - Math.max(0, timeLeft)

		console.log("Time taken:", timeTaken)
	}

	// RESULT SCREEN
	if (submitted) {

		const timeTaken = TOTAL_TIME - Math.max(0, timeLeft)

		return (
			<div style={{ padding: 16 }}>
				<h2>Result</h2>

				<p>
					You scored <strong>{score}</strong> out of {questions.length}
				</p>

				<p>
					Time taken: <strong>{timeTaken}</strong> seconds
				</p>

				<h3>Details</h3>

				<ol>
					{detailedResults.map((r) => (
						<li key={r.id} style={{ marginBottom: 12 }}>
							<div><strong>{r.question}</strong></div>
							<div>Selected: {r.selectedText ?? <em>Not answered</em>}</div>
							<div>Correct: {r.correctText}</div>

							<div style={{ color: r.isCorrect ? 'green' : 'crimson' }}>
								{r.isCorrect ? 'Correct' : 'Incorrect'}
							</div>

							{r.explanation && (
								<div style={{ marginTop: 4 }}>
									<small><strong>Explanation:</strong> {r.explanation}</small>
								</div>
							)}

							{r.hint && (
								<div>
									<small>Hint: {r.hint}</small>
								</div>
							)}
						</li>
					))}
				</ol>

				<button onClick={() => window.location.reload()}>
					Retry Quiz
				</button>
			</div>
		)
	}

	const currentQ = questions[current]

	return (
		<div style={{ padding: 16 }}>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<h3>Question {current + 1} / {questions.length}</h3>
				<div><strong>Time:</strong> {timeLeft}s</div>
			</div>

			<p style={{ fontSize: 18 }}>{currentQ.question}</p>

			{currentQ.options.map((opt, i) => (
				<label key={i} style={{ display: 'block', margin: '6px 0' }}>
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
				<button onClick={prev} disabled={current === 0}>Previous</button>
				<button onClick={next} disabled={current === questions.length - 1}>Next</button>
				<button onClick={() => handleSubmit('manual')} style={{ marginLeft: 20 }}>
					Submit
				</button>
			</div>

			{showHint && currentQ.hint && (
				<div style={{ marginTop: 8 }}>
					<strong>Hint:</strong> {currentQ.hint}
				</div>
			)}
		</div>
	)
}