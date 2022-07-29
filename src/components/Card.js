import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ cardInfo, onCardClick, onCardLikeClick, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = cardInfo.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `element__delete-urn ${isOwn ? 'element__delete-urn_active' : ''}`
  );

  const isLiked = cardInfo.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__like ${isLiked ? 'element__like_active' : ''}`;

  function handleClick() {
    onCardClick(cardInfo);
  }
  function handleCardLikeClick() {
    onCardLikeClick(cardInfo);
  }
  function handleCardDeleteClick() {
    onCardDelete(cardInfo);
  }

  return (
    <li className="element">
      <img className="element__image" src={cardInfo.link} alt="Фото места" />
      <button onClick={handleClick} className="element__image-btn" type="button" aria-label="На весь экран фото места"></button>
      <button className={cardDeleteButtonClassName} onClick={handleCardDeleteClick} type="button" aria-label="Удалить карточку места"></button>
      <div className="element__rectangle">
        <h2 className="element__title">{cardInfo.name}</h2>
        <div className="element__like-container">
          <button className={cardLikeButtonClassName} onClick={handleCardLikeClick} type="button" aria-label="В избранное"></button>
          <p className="element__count-likes">{cardInfo.likes.length}</p>
        </div>

      </div>
    </li>
  )
}

export default Card;