import React from "react";

function InfoTooltip({ isOpen, onClose, title, image, name }) {
  return (
    <div className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`} >
      <div className="popup__container">
        <img className="header__logo" src={image} alt="Логотип сайта" />
        <h2 className="popup__text">{title}</h2>
        <button onClick={onClose} className="popup__close" type="button" aria-label="Закрыть" />
      </div>
    </ div >
  )
}