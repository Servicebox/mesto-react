import React from 'react';
import { useState } from 'react';
import { Header } from './Header.js';
import { Main } from './Main.js';
import { Footer } from './Footer.js';
import { PopupWithForm } from './PopupWithForm.js';
import { ImagePopup } from './ImagePopup.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  }

  return (
    <div className='page'>
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onEditAvatar={handleEditAvatarClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />
      <Footer />

      <PopupWithForm
        name='popup-profile'
        title='Редактировать профиль'
        text='Сохранить'
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <div className='form__input-container'>
          <input
            type='text'
            name='name'
            id='name-input'
            className='form__input form__input_text_name'
            placeholder='Имя'
            minLength={2}
            maxLength={40}
            required
          />
          <span className='form__input-error name-input-error' />
          <input
            type='text'
            name='job'
            id='job-input'
            className='form__input form__input_text_job'
            placeholder='О себе'
            minLength={2}
            maxLength={200}
            required
          />
          <span className='form__input-error job-input-error' />
        </div>
      </PopupWithForm>

      <PopupWithForm
        name='popup-add'
        title='Новое место'
        text='Создать'
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <div className='form__input-container'>
          <input
            type='text'
            name='name'
            id='image-input'
            className='form__input form__input_image_name'
            placeholder='Название'
            minLength={2}
            maxLength={30}
            required
          />
          <span className='form__input-error image-input-error' />
          <input
            type='url'
            name='link'
            id='link-input'
            className='form__input form__input_image_link'
            placeholder='Ссылка на картинку'
            required
          />
          <span className='form__input-error link-input-error' />
        </div>
      </PopupWithForm>

      <PopupWithForm name='popup-delete' title='Вы уверены?' text='Да' />

      <PopupWithForm
        name='popup-avatar'
        title='Обновить аватар'
        text='Сохранить'
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <div className='form__input-container'>
          <input
            type='url'
            name='link'
            id='link-avatar-input'
            className='form__input form__input_avatar_link'
            placeholder='Ссылка на картинку'
            required
          />
          <span className='form__input-error link-avatar-input-error' />
        </div>
      </PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />


    </div>
  );
}

export default App;
