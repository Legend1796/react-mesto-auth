function ImagePopup({ onClose, isOpen, cardInfo }) {
  return (
    <div className={`popup popup_full-size ${isOpen && 'popup_opened'}`} >
      <button onClick={onClose} className="popup__overlay" />
      <div className="popup__container popup__container_full-size">
        <button onClick={onClose} className="popup__close" type="button" aria-label="Закрыть"></button>
        <img className="popup__image" src={cardInfo.link} alt="Фото места" />
        <h2 className="popup__title">{cardInfo.name}</h2>
      </div>
    </div >
  )
}

export default ImagePopup;