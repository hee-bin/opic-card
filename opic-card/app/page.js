"use client";

import { useState, useEffect } from 'react';

const cards = [
  // Questions about Your Residence
  "Can you describe the house or apartment you are currently living in? What is the layout like?",
  "What do you like and dislike about living in your house or apartment?",
  // Questions about Leisure Activities
  "Tell me about the movies or TV shows you enjoy watching during your free time. What genres do you prefer?",
  "Do you often visit museums? Describe your most recent visit to a museum.",
  "What activities do you usually do in the park? Describe your experiences in the park.",
  // Questions about Hobbies or Interests
  "How do you listen to music? What types of music do you usually enjoy?",
  "Talk about a book you recently read or a book that you particularly like.",
  // Questions about Exercise
  "Do you go jogging regularly? Describe where you usually jog and your experience with it.",
  "Do you enjoy swimming? Talk about how you started swimming and your feelings about it?",
  "How do you incorporate walking into your daily life? What are the benefits of walking?",
  "If you practice yoga, what kind of yoga do you do, and how did you get started?",
  "Tell me about your hiking experiences. Where do you usually go, and do you have any memorable hikes?",
  // Impromptu Questions - Travel-Related
  "If you were to travel with your family, what kind of destination would you choose? Why?",
  "Describe a memorable experience from one of your travels.",
  // Impromptu Questions - Food-Related
  "Do you often eat out with your family? Talk about your favorite restaurant or type of food.",
  "If you cook at home, what kind of food do you usually prepare, and how do you go about it?",
  // Impromptu Questions - Shopping-Related
  "Share a recent shopping experience where you bought something for your family. What did you purchase?",
  "Do you prefer online shopping or in-store shopping? Explain your preference.",
  // Impromptu Questions - Weather/Climate-Related
  "Describe the climate of the area where you live. How does it affect your daily life?",
  "How has the recent weather impacted your family's activities?",
  // Impromptu Questions - Technology/Appliances-Related
  "Which household appliance do you find most useful at home? Explain why.",
  "Have you purchased any new appliances or technology recently? Talk about it."
];

export default function Home() {
  const [selectedCard, setSelectedCard] = useState('');
  const [starredCards, setStarredCards] = useState([]);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    const randomCard = cards[Math.floor(Math.random() * cards.length)];
    setSelectedCard(randomCard);

    // Retrieve starred cards from localStorage when the component mounts
    const savedStarredCards = localStorage.getItem('starredCards');
    if (savedStarredCards) {
      setStarredCards(JSON.parse(savedStarredCards));
    }
  }, []);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeElapsed(0);
  };

  const toggleStar = () => {
    let updatedStarredCards;
    if (starredCards.includes(selectedCard)) {
      updatedStarredCards = starredCards.filter((card) => card !== selectedCard);
    } else {
      updatedStarredCards = [...starredCards, selectedCard];
    }
    setStarredCards(updatedStarredCards);
    localStorage.setItem('starredCards', JSON.stringify(updatedStarredCards)); // Save the updated list to localStorage
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const startRecording = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.lang = 'en-US';

    recognition.onresult = function (event) {
      const newTranscript = event.results[0][0].transcript;
      setTranscript(newTranscript);
    };

    recognition.onerror = function (event) {
      console.error(event.error);
    };

    recognition.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '36px', marginBottom: '20px' }}>Opic Question</h1>
      <div style={{ position: 'relative', display: 'inline-block', width: '100%', maxWidth: '600px', padding: '20px', border: '1px solid #ddd', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', borderRadius: '8px', marginBottom: '20px', backgroundColor: '#fff', fontSize: '24px' }}>
        {selectedCard}
        <button
          onClick={toggleStar}
          style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '24px', cursor: 'pointer', background: 'none', border: 'none', color: starredCards.includes(selectedCard) ? '#FFD700' : '#ddd' }}
        >
          &#9733;
        </button>
      </div>
      <div style={{ fontSize: '36px', marginTop: '20px' }}>{`0${Math.floor(timeElapsed / 60)}:${(timeElapsed % 60).toString().padStart(2, '0')}`}</div>
      <div style={{ marginTop: '20px' }}>
        <button onClick={startTimer} style={{ padding: '10px 20px', fontSize: '18px', margin: '0 5px', border: 'none', borderRadius: '5px', cursor: 'pointer', backgroundColor: '#007BFF', color: 'white' }}>Start</button>
        <button onClick={stopTimer} style={{ padding: '10px 20px', fontSize: '18px', margin: '0 5px', border: 'none', borderRadius: '5px', cursor: 'pointer', backgroundColor: '#007BFF', color: 'white' }}>Stop</button>
        <button onClick={resetTimer} style={{ padding: '10px 20px', fontSize: '18px', margin: '0 5px', border: 'none', borderRadius: '5px', cursor: 'pointer', backgroundColor: '#007BFF', color: 'white' }}>Reset</button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <button onClick={toggleRecording} style={{ padding: '10px 20px', fontSize: '18px', margin: '0 5px', border: 'none', borderRadius: '5px', cursor: 'pointer', backgroundColor: '#007BFF', color: 'white' }}>
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </button>
      </div>
      <div style={{ marginTop: '20px', fontSize: '18px', color: '#333' }}>{transcript}</div>
      <div style={{ marginTop: '20px' }}>
        <a href="/" style={{ fontSize: '18px', color: '#007BFF', textDecoration: 'none' }}>Next Question</a>
        <a href="/starred" style={{ fontSize: '18px', color: '#007BFF', textDecoration: 'none', marginLeft: '20px' }}>View Starred Questions</a>
      </div>
    </div>
  );
}
