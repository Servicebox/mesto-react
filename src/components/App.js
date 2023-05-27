import React, { useEffect, useState } from 'react';
import '../index.css';
import { Header } from './Header.js';
import { Main } from './Main.js';
import { Footer } from './Footer.js';
import { ImagePopup } from './ImagePopup.js';
import { api } from '../utils/Api.js';
import { AppContext } from '../contexts/AppContext.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { EditProfilePopup } from './EditProfilePopup.js';
import { EditAvatarPopup } from './EditAvatarPopup.js';
import { AddPlacePopup } from './AddPlacePopup.js';
import { ConfirmDeletePopup } from './ConfirmDeletePopup.js';

function App() {
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 
  const [currentUser, setCurrentUser] = useState({
    name: " ",
    about: " ",
    avatar: " ",
    _id: " ",
  });
  const [cards, setCards] = useState([]);
 const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [deletedCard, setDeletedCard] = useState({});
  

  useEffect(() => {
    Promise.all([api.getUserInfoApi(), api.getInitialCards()])
      .then(([currentUser, initialCards]) => {
        setCurrentUser(currentUser);
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

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

  function handleDeleteClick(card) {
    setDeletedCard(card);
    setIsConfirmDeletePopupOpen(true);
  }

  // лайк картинке
  function handleCardLike(card) {
    //проверка лайка на картинке
    const isLiked = card.likes.some(
      (i) => i._id === currentUser._id
    );

    api
      .toggleLikeCard(
        card._id,
        !isLiked
      )
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(closeAllPopups)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  // удаления карточки 
  function handleCardDelete(card) {
    function makeRequest() {
      return api.removeCardApi(card._id).then(() => {setCards((cards) => cards.filter((c) => c._id !== card._id))
    })}
    handleSubmit(makeRequest);
  }

  // редактирование пользовательских данных 
  function handleUpdateUser(inputValues) {
    function makeRequest()  {
      return api.editUserInfo(inputValues).then(setCurrentUser);
    }
    handleSubmit(makeRequest);
  }

  // редактирование аватарки 
  function handleUpdateAvatar(inputValues) {
    function makeRequest() {
      return api.editUserAvatar(inputValues).then(setCurrentUser);
    }
    handleSubmit(makeRequest);
  }

  
  
  function handleAddPlaceSubmit(inputValues) {
    function makeRequest() {
      return api.addCards(inputValues).then((newCard) => {
        setCards([newCard,...cards,]);
      })}
    handleSubmit(makeRequest)  
  }

  // закрытие всех попап 
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setDeletedCard({});
    setSelectedCard({});
  }

  return (
    <AppContext.Provider value = {{ isLoading, closeAllPopups }}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className='page'>
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            cards={cards}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDeleteClick={handleDeleteClick}
            onConfirmDelete={handleDeleteClick}
          />
          <Footer />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            onLoading={isLoading}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen} 
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            onLoading={isLoading}
          />

<EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            onLoading={isLoading}
          />

          <ConfirmDeletePopup
            isOpen={isConfirmDeletePopupOpen}
            onClose={closeAllPopups}
            card={deletedCard}
            onSubmit={handleCardDelete}
            onLoading={isLoading}
          />

          <ImagePopup 
            card={selectedCard}
            onClose={closeAllPopups}
            />

        </div>
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
