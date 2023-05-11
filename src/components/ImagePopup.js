import React from 'react';
import '../index.css';

function ImagePopup({ card, onClose }) {

  return (
    <div
      className={`popup popup-image ${card.link ? 'popup_opened' : ''}`}
      onClick={ onClose }
    >
      <div className='popup-image__container'>
        <button
          type='button'
          className='popup__close'
          onClick={onClose}
        />
        <figure className='image'>
          <img className='popup-image__img' src={card.link} alt={card.name} />
          <figcaption className='popup-image__title'>{card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export { ImagePopup };