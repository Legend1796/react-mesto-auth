import React from 'react';
import '../index.css';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Route, Switch, Redirect } from 'react-router-dom';
import ConfirmationPopup from './ConfirmationPopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import api from '../utils/api';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmationPopupOpen, setConfirmationPopupOpen] = React.useState(false);
  const [isCardPopupOpen, setCardPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [isAccesMessage, setAccesMessage] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
  const [currentUser, setUserInfo] = React.useState({ name: '', about: '', avatar: '' });
  const [isLoading, setIsLoading] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [cardForDelete, setCardForDelete] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('m_igor97@mail.com');

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
    setInfoTooltipOpen(false);
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
  function handleOnLoggedIn(status) {
    setLoggedIn(status);
  }

  function handleSetUserEmail(email) {
    setUserEmail(email);
    console.log('userEmail: ' + userEmail);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page" onKeyDown={closePopupsOnEsc}>
        <Header loggedIn={loggedIn} userEmail={userEmail} />
        <Switch>
          <ProtectedRoute path="/main" loggedIn={loggedIn} component={Main} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} onCardClick={handleCardClick} onEditProfile={handleEditProfileClick} isAddPlacePopupOpen={handleAddPlaceClick} isEditAvatarPopupOpen={handleEditAvatarClick} />
          <Route path="/sign-up">
            <Register onLoggedIn={handleOnLoggedIn} setUserEmail={handleSetUserEmail} />
          </Route>
          <Route path="/sign-in">
            <Login onLoggedIn={handleOnLoggedIn} setUserEmail={handleSetUserEmail} />
          </Route>
          <Route exact path="/">
            {loggedIn ? <Redirect to="/main" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        <Footer />
        <EditProfilePopup onUpdateUser={handleUpdateUser} onClose={handleCloseAllPopups} isOpen={isEditProfilePopupOpen} isLoading={isLoading} />
        <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} onClose={handleCloseAllPopups} isOpen={isEditAvatarPopupOpen} isLoading={isLoading} />
        <AddPlacePopup onAddCard={handleAddPlaceSubmit} onClose={handleCloseAllPopups} isOpen={isAddPlacePopupOpen} isLoading={isLoading} />
        <ConfirmationPopup onDeleteCard={handleDeleteCard} onClose={handleCloseAllPopups} isOpen={isConfirmationPopupOpen} name="delete-card" title="Вы уверены?" buttonText="Да" />
        <ImagePopup isOpen={isCardPopupOpen} onClose={handleCloseAllPopups} cardInfo={selectedCard} />
        <InfoTooltip isOpen={isInfoTooltipOpen} onClose={handleCloseAllPopups} name="access-message" title={isAccesMessage} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;