"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Starred() {
  const [starredCards, setStarredCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedStarredCards = localStorage.getItem('starredCards');
    if (savedStarredCards) {
      const parsedCards = JSON.parse(savedStarredCards);
      setStarredCards(parsedCards);
      setLoading(false);
    }
  }, []);

  const handleNext = () => {
    setLoading(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % starredCards.length);
      setLoading(false);
    }, 500);
  };

  const handlePrevious = () => {
    setLoading(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + starredCards.length) % starredCards.length);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="text-center p-12 font-sans">
      <h1 className="text-3xl mb-6 text-green-400">Starred Cards</h1>
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-400"></div>
        </div>
      ) : starredCards.length > 0 ? (
        <div className="relative inline-block w-full max-w-xl p-8 border border-gray-300 shadow-lg rounded-xl bg-white text-xl text-black mb-8">
          {starredCards[currentIndex]}
        </div>
      ) : (
        <p>No starred cards available</p>
      )}
      <div className="mt-4 space-x-4">
        <button onClick={handlePrevious} className="px-6 py-2 bg-green-400 text-white rounded-lg shadow-md">Previous</button>
        <button onClick={handleNext} className="px-6 py-2 bg-green-400 text-white rounded-lg shadow-md">Next</button>
      </div>
      <div className="mt-8 space-x-4">
        <Link href="/" className="text-lg text-green-400 hover:underline">Back to Random Questions</Link>
      </div>
    </div>
  );
}
