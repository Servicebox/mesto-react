import React from 'react';
import { useEffect, useState } from 'react';
import '../index.css';
import { api } from '../utils/Api.js';
import { Card } from './Card.js';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');

  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getUserInfoApi()
      .then((res) => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
      })
      .catch((err) => {
        console.log(err);
      });

    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className='Main'>
      <main className='content'>
        <section className='profile'>
          <img
            className='profile__avatar'
            src={userAvatar}
            alt='Аватарка'
          />
          <button
            type='button'
            className='profile__avatar-edit'
            aria-label='Редактирование аватара пользователя'
            onClick={onEditAvatar}
          />
          <div className='profile__info'>
            <h1 className='profile__name'>{userName}</h1>
            <button
              className='profile__edit-button'
              type='button'
              onClick={onEditProfile}
            />
            <p className='profile__job'>{userDescription}</p>
          </div>
          <button
            className='profile__add-button'
            type='button'
            onClick={onAddPlace}
          />
        </section>
        <section className='cards'>
          {cards.map((card) => (
            <Card key={card._id} card={card} onCardClick={onCardClick} />
          ))}
        </section>
        <template id='card__template' />
      </main>
    </div>
  );
}

export { Main };