import React, { useContext, useEffect, useRef } from 'react';
import { PopupWithForm } from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const currentUser = useContext(CurrentUserContext); 
  const avatarRef = useRef(); //реф 

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: 
        avatarRef.current
          .value,
    });
  }

  useEffect(() => {
    if (!isOpen) {
      avatarRef.current.value = currentUser.avatar
    } else {
      avatarRef.current.value = ''
    }
  }, [currentUser, isOpen]);


  return (
    <PopupWithForm
      name='popup-avatar'
      title='Обновить аватар'
      text={isLoading? 'Сохраненяем...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className='form__input-container'>
        <input
          type='url'
          name='avatar'
          id='link-avatar-input'
          className='form__input form__input_avatar_link'
          placeholder='Ссылка на картинку'
          required
          ref={avatarRef}
        />
        <span className='form__input-error link-avatar-input-error' />
      </div>
    </PopupWithForm>
  );
}

export { EditAvatarPopup };