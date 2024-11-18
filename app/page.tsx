'use client';

import { useState, useEffect } from 'react';

export default function HomePage() {
  const [grade, setGrade] = useState<string | null>(null); 
  const [question, setQuestion] = useState<string | null>(null);
  const [answer, setAnswer] = useState<number | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>(''); // Stores user input
  const [attempts, setAttempts] = useState<number>(0); // Tracks number of attempts
  const [feedback, setFeedback] = useState<string>(''); // Feedback message
  const [showNext, setShowNext] = useState<boolean>(false); // Controls visibility of Next button

  // Extract query params on the client side
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setGrade(params.get('grade')); // Get the 'grade' query parameter
  }, []);

  // Fetch question from the API
  const fetchQuestion = async () => {
    try {
      const response = await fetch(`/api/generate-question?grade=${grade}`);
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("New question fetched:", data);
  
      // Force state update even if the same question
      setQuestion(null); // Temporary reset
      setTimeout(() => {
        setQuestion(data.problem);
        setAnswer(data.answer);
        setUserAnswer(""); // Reset the user's answer
      }, 10);
  
      setFeedback(""); // Clear feedback
      setAttempts(0); // Reset attempts for the new question
      setShowNext(false); // Hide Next button for the new question
    } catch (error) {
      console.error("Error fetching question:", error);
      alert("Failed to fetch question. Please try again.");
    }
  };  

  // Handle answer submission
  const handleSubmit = () => {
    const numericAnswer = parseInt(userAnswer, 10); // Convert user input to a number
    if (isNaN(numericAnswer)) {
      setFeedback('❌ Please enter a valid number.');
      return;
    }

    if (numericAnswer === answer) {
      setFeedback(`🎉 Correct! ${question} = ${answer}`);
      setShowNext(true); // Show Next button
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts === 1) {
        setFeedback('❌ Incorrect! Try again.');
      } else {
        setFeedback(
          `❌ Incorrect! The correct answer is ${answer}. Explanation: ${question} = ${answer}.`
        );
        setShowNext(true); // Show Next button
      }
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Math Practice App</h1>

      {/* Display the Grade */}
      <p style={styles.grade}>Grade: {grade || 'Not specified'}</p>

      {/* Generate Question Button */}
      {!question && (
        <button onClick={fetchQuestion} style={styles.generateButton}>
          Generate Question
        </button>
      )}

      {/* Display the Question */}
      {question && !showNext && (
        <div style={styles.questionContainer}>
          <p style={styles.question}>
            <strong>Question:</strong> {question}
          </p>

          {/* Input for User Answer */}
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Enter your answer"
            style={styles.input}
          />

          {/* Submit Answer Button */}
          <button onClick={handleSubmit} style={styles.submitButton}>
            Submit Answer
          </button>
        </div>
      )}

      {/* Feedback Message */}
      {feedback && <p style={styles.feedback}>{feedback}</p>}

      {/* Next Button */}
      {showNext && (
        <button onClick={fetchQuestion} style={styles.nextButton}>
          Next Question
        </button>
      )}
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center' as const,
    marginTop: '50px',
    fontFamily: '"Arial", sans-serif',
    backgroundColor: '#f5f5f5',
    padding: '20px',
    borderRadius: '10px',
    maxWidth: '600px',
    margin: '50px auto',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#333',
  },
  grade: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#555',
  },
  generateButton: {
    padding: '10px 20px',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#007BFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '20px',
  },
  questionContainer: {
    marginTop: '20px',
  },
  question: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#555',
    marginBottom: '15px',
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    border: '2px solid #007BFF',
    borderRadius: '5px',
    width: '200px',
    textAlign: 'center' as const,
    outline: 'none',
    backgroundColor: '#fff',
    color: '#333',
  },
  submitButton: {
    padding: '10px 20px',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#28a745',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginLeft: '10px',
  },
  nextButton: {
    padding: '10px 20px',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#FF9800',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
  },
  feedback: {
    marginTop: '20px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#333',
  },
};
