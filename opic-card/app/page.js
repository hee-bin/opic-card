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
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const randomCard = cards[Math.floor(Math.random() * cards.length)];
    setSelectedCard(randomCard);
    setLoading(false);

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

  const startTimer = () => setIsRunning(true);
  const stopTimer = () => setIsRunning(false);
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
    localStorage.setItem('starredCards', JSON.stringify(updatedStarredCards));
  };

  const handleNext = () => {
    setLoading(true);
    setTimeout(() => {
      const nextIndex = (currentIndex + 1) % cards.length;
      setSelectedCard(cards[nextIndex]);
      setCurrentIndex(nextIndex);
      setLoading(false);
    }, 500);
  };

  const handlePrevious = () => {
    setLoading(true);
    setTimeout(() => {
      const prevIndex = (currentIndex - 1 + cards.length) % cards.length;
      setSelectedCard(cards[prevIndex]);
      setCurrentIndex(prevIndex);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="text-center p-12 font-sans">
      <h1 className="text-3xl mb-6 text-green-400">Opic Question</h1>
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-400"></div>
        </div>
      ) : (
        <div className="relative  inline-block w-full max-w-xl p-8 border border-gray-300 shadow-lg rounded-xl bg-white text-xl text-black mb-8">
          {selectedCard}
          <button
            onClick={toggleStar}
            className={`absolute top-4 right-4 text-3xl cursor-pointer ${starredCards.includes(selectedCard) ? 'text-yellow-400' : 'text-gray-300'}`}
          >
            &#9733;
          </button>
        </div> 
      )}
           <div className="mt-4 space-x-4">
              <button onClick={handlePrevious} className="px-6 py-2 bg-green-400 text-white rounded-lg shadow-md">Previous</button>
              <button onClick={handleNext} className="px-6 py-2 bg-green-400 text-white rounded-lg shadow-md">Next</button>
            </div>
      <div className="text-3xl mt-4">{`0${Math.floor(timeElapsed / 60)}:${(timeElapsed % 60).toString().padStart(2, '0')}`}</div>
      <div className="mt-4 space-x-4">
        <button onClick={startTimer} className="px-6 py-2 bg-green-400 text-white rounded-lg shadow-md">Start</button>
        <button onClick={stopTimer} className="px-6 py-2 bg-green-400 text-white rounded-lg shadow-md">Stop</button>
        <button onClick={resetTimer} className="px-6 py-2 bg-green-400 text-white rounded-lg shadow-md">Reset</button>
      </div>

      <div className="mt-8 space-x-4">

        <a href="/starred" className="text-lg text-green-400 hover:underline">View Starred Questions</a>
      </div>
    </div>
  );
}