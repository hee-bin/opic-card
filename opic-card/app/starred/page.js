"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Starred() {
  const [starredCards, setStarredCards] = useState([]);

  useEffect(() => {
    const savedStarredCards = localStorage.getItem('starredCards');
    if (savedStarredCards) {
      setStarredCards(JSON.parse(savedStarredCards));
    }
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '50px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Starred Cards</h1>
      <ul style={{ listStyleType: 'none', padding: 0, fontSize: '24px' }}>
        {starredCards.length > 0 ? (
          starredCards.map((card, index) => <li key={index} style={{ backgroundColor: '#fff', padding: '15px', marginBottom: '10px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>{card}</li>)
        ) : (
          <li>No starred cards available</li>
        )}
      </ul>
      <div style={{ marginTop: '20px' }}>
        <Link href="/" style={{ fontSize: '18px', color: '#007BFF', textDecoration: 'none' }}>Back to Random Questions</Link>
      </div>
    </div>
  );
}
