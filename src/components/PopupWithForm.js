function PopupWithForm({ name, isOpen, onClose, submitButtonText, children, title, eventSubmit, isActiveSubmitButton }) {

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
          <button className={`popup__save-btn ${!isActiveSubmitButton ? 'popup__save-btn_disabled' : ''}`} type="submit" disabled={!isActiveSubmitButton}>{submitButtonText}</button>
        </form>
        <button onClick={onClose} className="popup__close" type="button" aria-label="Закрыть" />
      </div>
    </ div>
  )
}

export default PopupWithForm;