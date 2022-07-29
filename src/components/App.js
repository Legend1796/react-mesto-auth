import React from 'react';
import '../index.css';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import ConfirmationPopup from './ConfirmationPopup';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmationPopupOpen, setConfirmationPopupOpen] = React.useState(false);
  const [isCardPopupOpen, setCardPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
  const [currentUser, setUserInfo] = React.useState({ name: '', about: '', avatar: '' });
  const [isLoading, setIsLoading] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [cardForDelete, setCardForDelete] = React.useState('');
  const loggedIn = false;

  React.useEffect(() => {
    Promise.all([
      api.getUserInfo(),
      api.getInitialCards()])
      .then(([info, cards]) => {
        setUserInfo(info);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }
  function handleCloseAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setCardPopupOpen(false);
    setConfirmationPopupOpen(false);
  }
  function handleCardClick(card) {
    setSelectedCard({ name: card.name, link: card.link });
    setCardPopupOpen(true);
  }
  function handleUpdateUser(userData) {
    setIsLoading(true);
    api.setUserInfo(userData)
      .then((res) => {
        setUserInfo(res);
        handleCloseAllPopups();
      })
      .catch((err) => {
        console.log('EditProfilePopup:', err);
      })
      .finally(() => {
        setTimeout(setIsLoading(false), 2000);
      })
  }
  function handleUpdateAvatar(newAvatar) {
    setIsLoading(true);
    api.setAvatar(newAvatar.avatar)
      .then((res) => {
        setUserInfo(res);
        handleCloseAllPopups();
      })
      .catch((err) => {
        console.log('EditProfilePopup:', err);
      })
      .finally(() => {
        setTimeout(setIsLoading(false), 2000);
      })
  }
  function handleCardLike(cardInfo) {
    const isLiked = cardInfo.likes.some(i => i._id === currentUser._id);
    if (!isLiked) {
      api.changeLikeCardStatus(cardInfo._id, 'PUT')
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === cardInfo._id ? newCard : c));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api.changeLikeCardStatus(cardInfo._id, 'DELETE')
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === cardInfo._id ? newCard : c));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  function handleCardDelete(cardInfo) {
    setConfirmationPopupOpen(true);
    setCardForDelete(cardInfo);
  }
  function handleDeleteCard() {
    api.deleteCard(cardForDelete._id)
      .then(() => {
        setCards((state) => state.filter(c => c._id !== cardForDelete._id));
      })
      .catch((err) => {
        console.log(err);
      });
    handleCloseAllPopups();
  }
  function handleAddPlaceSubmit(cardInfo) {
    setIsLoading(true);
    api.setInitialCards(cardInfo)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        handleCloseAllPopups();
      })
      .catch((err) => {
        console.log('EditProfilePopup:', err);
      })
      .finally(() => {
        setTimeout(setIsLoading(false), 2000);
      })
  }
  function closePopupsOnEsc(e) {
    if (e.key === 'Escape') {
      handleCloseAllPopups();
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page" onKeyDown={closePopupsOnEsc}>
        <Header />
        <Switch>
          <Route path="/main">
            <Main cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} onCardClick={handleCardClick} onEditProfile={handleEditProfileClick} isAddPlacePopupOpen={handleAddPlaceClick} isEditAvatarPopupOpen={handleEditAvatarClick} />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            {loggedIn ? <Redirect to="/main" /> : <Redirect to="/login" />}
          </Route>
        </Switch>
        <Footer />
        <EditProfilePopup onUpdateUser={handleUpdateUser} onClose={handleCloseAllPopups} isOpen={isEditProfilePopupOpen} isLoading={isLoading} />
        <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} onClose={handleCloseAllPopups} isOpen={isEditAvatarPopupOpen} isLoading={isLoading} />
        <AddPlacePopup onAddCard={handleAddPlaceSubmit} onClose={handleCloseAllPopups} isOpen={isAddPlacePopupOpen} isLoading={isLoading} />
        <ConfirmationPopup onDeleteCard={handleDeleteCard} onClose={handleCloseAllPopups} isOpen={isConfirmationPopupOpen} name="delete-card" title="Вы уверены?" buttonText="Да" />
        <ImagePopup isOpen={isCardPopupOpen} onClose={handleCloseAllPopups} cardInfo={selectedCard} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;