"use client";

import { useState, useEffect } from 'react';

const cards = [
    // Questions about Your Residence
    "Please tell me about your house. What's your favorite room? What does it look like? Why do you like that room?",
    "Compare the home you lived in before to the one you live in now. What are the differences between those two homes? Provide me with as many details as possible.",
    "Have you ever had any problems with your home? What was the problem and how did you deal with it? How did the problem turn out? Give me as many details as possible.",
  
    // Questions about Your Neighborhood
    "I would like to know about your neighborhood. What does your neighborhood look like? Please describe your neighborhood in as much detail as possible.",
    "Can you tell me about your neighbors? Describe one of your neighbors in detail. How did you first become acquainted with that neighbor? Are you close to the person? What do you usually do together?",
    "Please tell me about a memorable experience you had in your neighborhood. When and where did it occur? What happened that made the experience so memorable? Please describe it in detail.",
  
    // Questions about Movies
    "In your background survey, you indicated that you like to watch movies. What kind of movies do you enjoy watching? Why do you like to watch those kinds of movies? Tell me about those movies in as much detail as possible.",
    "I'd like you to tell me about your favorite actor. Who is the actor? What movies has he or she starred in? What do you like most about him or her? Please tell me about the actor in as much detail as possible.",
    "Please tell me about the most memorable movie you have seen. What was the movie about? Who was in it? Why was it memorable?",
    "Has your taste in movies changed over time? Tell me about the changes in your taste in movies over the past few years. How are the movies you enjoy now different from those in the past? Please explain in as much detail as possible.",
    "I'd like to know about a major issue or concern affecting the movie industry these days. What's the issue? How is it affecting the lives of people? What needs to be done to address the issue? Please explain in detail.",
  
    // Questions about TV Programs
    "I would like to know about the TV programs you watch. What kind of programs do you enjoy the most? What are they about? Why do you like watching them? Tell me about them in as much detail as possible.",
    "What's the most memorable TV program you have ever watched? What was it about? Tell me about the program and explain what made it so special.",
    "What was the first TV program you liked to watch? What kind of programs do you watch now? How has your interest in TV programs changed over the years? Why has it changed?",
    "Reality shows are usually filmed in unique locations. Where does your favorite reality show take place? What does this place look like? Provide as many details as possible.",
    "In your background survey, you indicated that you enjoyed watching reality shows. When do you watch them? Why do you usually watch them? Why do you like to watch them?",
  
    // Questions about Coffee Shops
    "In your background survey, you indicated that you like going out for coffee. When do you usually go to coffee shops? What do you typically order, and what do you do while you are there?",
    "Tell me about your favorite coffee shop. Where is it located? What does it look like? Describe it in as much detail as possible.",
    "Tell me about a memorable experience you had at a coffee shop. When and where was it? Who were you with? What happened? Talk about the experience in detail and explain why it was so memorable.",
  
    // Questions about Music
    "Tell me about your favorite musician or singer. What kind of songs does he or she sing? Why do you like him or her? Describe him or her in as much detail as possible.",
    "In your background survey, you indicated that you enjoy listening to music. What kind of music do you like? Why do you like it? When and where do you usually listen to music? How do you listen to music?",
    "Tell me about the most memorable experience you had while listening to music. When was it? Where did it happen? What made the experience memorable? Please describe it in as much detail as possible.",
    "I would like you to choose two genres of music you like and compare them. What are the differences between them? How do you feel when you listen to each type of music? Provide as much detail as possible.",
    "What kind of devices do people like to listen to music on? Can you tell me about the popular ones? Why do people like them? Please explain about the devices in as much detail as possible.",
  
    // Questions about Books
    "In your background survey, you indicated that you enjoy reading books. How often do you read books? Where do you usually read? What kind of books do you like to read and why? Provide as many details as possible.",
    "Please tell me about the most memorable book that you have read. What genre is it? What is the book about? Who is the author of the book? Why is it so unforgettable?",
    "What made you interested in reading? When did you first start reading books? Did anyone influence this decision? How has reading affected your life?",
  
    // Questions about Exercise
    "In your background survey, you indicated that you go to the fitness club. Tell me about the fitness club you go to. Where is it located? What does it look like? Describe it in as much detail as possible.",
    "In your background survey, you mentioned that you like to jog. Do you have a specific place you like to go for jogging? Where is it located? Why do you go to this specific place? Provide me with as many details as possible.",
    "Please choose one sport, such as swimming or cycling, and compare it with jogging. Are there any similarities between the two? What are the differences between them? Please talk about the activities in detail.",
    "When did you first become interested in jogging? Why did you start? Has your physical condition changed since you started jogging? How has it changed?",
    "In your background survey, you indicated that you enjoy taking walks. Has anything memorable or special ever happened while you were on a walk? When was it, and what happened? Where were you when this happened? Who were you with? Provide as many details as possible.",
    "People occasionally get hurt when exercising. For example, they might twist their ankles or sprain their knees. Have you ever injured yourself while you were jogging? What kind of injury did you get? Do you do anything special to avoid injuries? What do you do?",
  
    // Questions about Travel
    "What is the most memorable experience you have had while traveling? When and where did you go? What happened? Why was it memorable? Describe the experience in detail.",
    "In your background survey, you indicated that you enjoy domestic travel. Where do you like to visit? Which do you prefer: mountains or beaches? Describe the place you like to visit and why you like to go there.",
    "People must prepare before they travel. What do you do to prepare for travel? Do you research in advance or make reservations? What special things do you do? Please describe your preparation in detail.",
  
    // Questions about Family Responsibilities
    "How are the responsibilities divided among family members in your household? What tasks do you usually do? Which ones do the others do? Is the system fair, or do you think it should be changed?",
  
    // Questions about Restaurants
    "I would like to know about the restaurant you often visit. What kind of dishes does it serve? What do you like about the restaurant? What does it look like?",
  
    // Questions about Internet and Websites
    "Do you often surf the internet? What websites do you like? What were websites like in the past? How have they changed since you first started surfing the internet? Please compare the websites of today to the websites of the past.",
  
    // Questions about Holidays
    "I would like to know about the holidays celebrated in your country. What do these holidays commemorate? How do people celebrate them?",
  
    // Questions about Public Transportation
    "Can you tell me about the public transportation system in your country? Which type of transportation do you use the most and why? Give me as many details as possible.",
  
    // Questions about Seasons
    "I would like to know about the seasons in your country. How many seasons are there? How are they different? What's the weather like in each season?",
  
    // Questions about Furniture
    "What is your favorite piece of furniture in the house? How do you use it? What makes it special? Give me as many details as possible.",
  
    // Questions about Banks
    "Have there been any changes to the banks in your country since you were a child? How were they in the past? How are they now? Please describe the changes in detail.",
  
    // Questions about Community Events
    "Can you tell me about special events in your community? What kind of festivals or events are held? Give me as much detail as possible.",
  
    // Questions about Geographic Features
    "I would like to know about the geographic features of your country. What makes them different from other countries? Please describe them in as much detail as possible.",
  
    // Questions about Hotels
    "Tell me about the hotels in your country. Where are they usually located? Do they have any facilities that are unique to your country? Give as many details as possible.",
  
    // Questions about Recycling
    "Tell me about recycling in your country. What kind of items do people usually recycle? Please describe the recycling system in your country in detail.",
  
    // Role-Playing - Cooking Italian Food
    "I like to cook Italian food. Please ask me three or four questions about cooking Italian food.",
  
    // Role-Playing - Traveling
    "I enjoy traveling too. Please ask me three or four questions about traveling.",
  
    // Role-Playing - Geographic Features of Canada
    "I live in Canada. Ask me three or four questions about the geographic features of my country.",
  
    // Role-Playing - Gym Membership
    "Imagine you would like to join a gym. Ask the gym manager three or four questions to find out more about the place.",
  
    // Role-Playing - Hotel Reservation
    "You are planning on staying at a hotel. Call the manager and ask three or four questions about the reservation you would like to make.",
  
    // Role-Playing - Library Problem
    "Pretend that you've gone to the library to look for a book, but the one you want has been checked out. Explain the situation to a librarian and offer two or three alternatives to solve the problem.",
  
    // Role-Playing - Restaurant Reservation
    "Imagine that you would like to have dinner at a downtown restaurant tomorrow evening. Unfortunately, most of the tables have already been reserved for tomorrow, and the remaining tables are for VIPs. Call the manager and give two or three reasons why you should be given a reservation.",
  
    // Role-Playing - Meeting with a Friend
    "You would like to meet up with a friend. Call your friend and figure out the details of your meeting."
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