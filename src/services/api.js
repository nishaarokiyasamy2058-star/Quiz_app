export async function saveQuizResult(quizData) {
  try {
    const response = await fetch('http://localhost:8000/api/save-quiz/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(quizData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error saving quiz result:', error);
    throw error;
  }
}
