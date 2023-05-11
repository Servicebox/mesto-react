import React from 'react';

function Card({ card, onCardClick }) {
  function handleClick() {
    onCardClick(card);
  }
  return (
    <div className='card'>
      <div className='card__image'>
        <img
          className='card__img'
          src={card.link}
          alt={card.name}
          onClick={handleClick}
        />
        <button
          className='card__del'
          type='button'
        />
      </div>
      <div className='card__description'>
        <h2 className='card__name'>{card.name}</h2>
        <div className='card__like-container'>
          <button
            className='card__like'
            type='button'
            aria-label='Значок лайк'
          />
          <span className='card__like-number'>{card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export { Card };
