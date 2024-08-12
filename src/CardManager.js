import React, { useState } from 'react';
import './FlipCard.css';

const FlipCard = ({ content, flipped, onFlip, onEditToggle, isEditing, onSave, onEdit, editFront, editBack, setEditFront, setEditBack }) => {
  return (
    <div className={`flip-card ${flipped ? 'flipped' : ''}`}>
      <div className="flip-card-inner" onClick={onFlip}>
        {isEditing ? (
          <>
            <div className="flip-card-front">
              <input
                type="text"
                value={editFront}
                onChange={(e) => setEditFront(e.target.value)}
              />
            </div>
            <div className="flip-card-back">
              <input
                type="text"
                value={editBack}
                onChange={(e) => setEditBack(e.target.value)}
              />
            </div>
          </>
        ) : (
          <>
            <div className="flip-card-front">
              <h2>{content.front}</h2>
            </div>
            <div className="flip-card-back">
              <h2>{content.back}</h2>
            </div>
          </>
        )}
      </div>
      {isEditing ? (
        <button onClick={onSave} className="save-btn">Save</button>
      ) : (
        <button onClick={onEditToggle} className="edit-btn">Edit</button>
      )}
    </div>
  );
};

const CardManager = () => {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editFront, setEditFront] = useState('');
  const [editBack, setEditBack] = useState('');

  const addCard = () => {
    const newCard = {
      id: Date.now(),
      content: {
        front: '',
        back: '',
      },
    };
    setCards([...cards, newCard]);
    setCurrentIndex(cards.length); // Go to the newly added card
    setIsEditing(true);
    setEditFront('');
    setEditBack('');
  };

  const removeCard = () => {
    const updatedCards = cards.filter((_, index) => index !== currentIndex);
    setCards(updatedCards);
    setCurrentIndex(Math.max(currentIndex - 1, 0));
  };

  const editCard = () => {
    const updatedCards = cards.map((card, index) =>
      index === currentIndex
        ? { ...card, content: { front: editFront, back: editBack } }
        : card
    );
    setCards(updatedCards);
    setIsEditing(false);
  };

  const handleFlip = () => {
    if (!isEditing) {
      setFlipped(!flipped);
    }
  };

  const handleNext = () => {
    setFlipped(false);
    setIsEditing(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrev = () => {
    setFlipped(false);
    setIsEditing(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  const handleEditToggle = () => {
    const currentCard = cards[currentIndex];
    setIsEditing(!isEditing);
    setEditFront(currentCard.content.front);
    setEditBack(currentCard.content.back);
  };

  const handleSave = () => {
    editCard();
    setIsEditing(false);
  };

  return (
    <div>
      <h1>Welcome to Quiz</h1>
      <div className="input-container">
        <button onClick={addCard} className="add-btn">Add Question</button>
      </div>
      {cards.length > 0 && (
        <div className="card-viewer">
          <FlipCard
            content={cards[currentIndex].content}
            flipped={flipped}
            onFlip={handleFlip}
            onEditToggle={handleEditToggle}
            isEditing={isEditing}
            onSave={handleSave}
            editFront={editFront}
            editBack={editBack}
            setEditFront={setEditFront}
            setEditBack={setEditBack}
          />
          <div className="navigation-buttons">
            <button onClick={handlePrev} className="nav-btn">Previous</button>
            <button onClick={handleNext} className="nav-btn">Next</button>
          </div>
          <button onClick={removeCard} className="remove-btn">Remove Current</button>
        </div>
      )}
    </div>
  );
};

export default CardManager;
