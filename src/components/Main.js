import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ isEditAvatarPopupOpen, onEditProfile, isAddPlacePopupOpen, onCardClick, cards, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  function cardLikeClick(cardInfo) {
    onCardLike(cardInfo);
  }
  function cardDelete(cardInfo) {
    onCardDelete(cardInfo);
  }

  return (
    <main>
      <section className="profile">
        <div className="profile__info">
          <button onClick={isEditAvatarPopupOpen} className="profile__edit-avatar" type="button" aria-label="Редактировать Аватар" />
          <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" />
          <div className="profile__block">
            <div className="profile__name-edit">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button onClick={onEditProfile} className="profile__edit-btn" type="button" aria-label="Редактировать профиль" />
            </div>
            <p className="profile__job">{currentUser.about}</p>
          </div>

        </div>
        <button onClick={isAddPlacePopupOpen} className="profile__add-btn" type="button" aria-label="Добавить новое место" />
      </section>
      <section>
        <ul className="elements">
          {cards.map((card) => (
            <Card cardInfo={card} onCardDelete={cardDelete} onCardLikeClick={cardLikeClick} onCardClick={onCardClick} key={card._id} />
          ))}
        </ul>
      </section>
    </main >
  )
}

export default Main;