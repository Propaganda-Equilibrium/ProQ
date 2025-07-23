/* src/NarrativeScanner.jsx */
import React, { useState } from 'react';

export default function NarrativeScanner() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeText = async () => {
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch("https://proq-b745.onrender.com/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: 'შეცდომა: ვერ მოხერხდა ანალიზის მიღება' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>ProQ – ნარატივის ანალიზატორი</h1>
      <textarea
        rows="6"
        cols="80"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="შეიყვანე ტექსტი..."
      />
      <br /><br />
      <button onClick={analyzeText} disabled={loading}>
        {loading ? 'იტვირთება...' : 'დაიწყე ანალიზი'}
      </button>
      <br /><br />
      {result && (
        <div>
          <h3>შედეგი:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
