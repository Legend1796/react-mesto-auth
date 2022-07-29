function PopupWithForm({ name, isOpen, onClose, buttonText, children, title, eventSubmit, activeSubmitButton }) {
  function handleSubmit(e) {
    e.preventDefault();
    eventSubmit();
  }

  return (
    <div className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`} >
      <div className="popup__container">
        <h2 className="popup__text">{title}</h2>
        <form onSubmit={handleSubmit} name={name} className={`popup__form popup__form_${name}`} noValidate>
          {children}
          <button className={`popup__save-btn ${!activeSubmitButton ? 'popup__save-btn_disabled' : ''}`} type="submit" disabled={!activeSubmitButton}>{buttonText}</button>
        </form>
        <button onClick={onClose} className="popup__close" type="button" aria-label="Закрыть" />
      </div>
    </ div>
  )
}

export default PopupWithForm;