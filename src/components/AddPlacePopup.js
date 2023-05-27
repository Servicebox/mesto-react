import React, { useState, useEffect } from 'react';
import { PopupWithForm } from './PopupWithForm.js';
//import { useForm } from '../hooks/useForm.js';

function AddPlacePopup({ isOpen, onClose, onAddPlace, onLoading }) {
  const [link, setLink] = useState('');
  const [name, setName] = useState('');

  function handleEditName(e) {
    setName(e.target.value);
  }

  function handleEditlink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: name,
      link: link,
    });
  }

//чистка
  useEffect(() => {
    setLink('');
    setName('');
  }, [isOpen]);

  return (
    <PopupWithForm
      name='popup-add'
      title='Новое место'
      text={onLoading? 'Создаем...' : 'Создать'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className='form__input-container'>
        <input
          type='text'
          name='name'
          id='image-input'
          className='form__input form__input_image_name'
          placeholder='Название'
          minLength={2}
          maxLength={30}
          required
          value={name}
          onChange={handleEditName}
        />
        <span className='form__input-error image-input-error' />
        <input
          type='url'
          name='link'
          id='link-input'
          className='form__input form__input_image_link'
          placeholder='Ссылка на картинку'
          required
          value={link}
          onChange={handleEditlink}
        />
        <span className='form__input-error link-input-error' />
      </fieldset>
    </PopupWithForm>
  );
}

export { AddPlacePopup };