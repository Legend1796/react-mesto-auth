import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddCard, isLoading }) {
  const [nameCard, setNameCard] = React.useState('');
  const [linkCard, setLinkCard] = React.useState('');
  const [isValidName, setValidName] = React.useState(false);
  const [isValidLink, setValidLink] = React.useState(false);
  const [validationMessageName, setValidationMessageName] = React.useState('');
  const [validationMessageLink, setValidationMessageLink] = React.useState('');
  const [isActiveSubmitButton, setActiveSubmitButton] = React.useState(false);

  function handleChangeNameCard(e) {
    setNameCard(e.target.value);
    setValidName(e.target.validity.valid);
    if (e.target.validity.valid) {
      setValidationMessageName('');
    } else { setValidationMessageName(e.target.validationMessage) }
  }
  function handleChangeLinkCard(e) {
    setLinkCard(e.target.value);
    setValidLink(e.target.validity.valid);
    if (e.target.validity.valid) {
      setValidationMessageLink('');
    } else { setValidationMessageLink(e.target.validationMessage) }
  }
  function handleSubmit() {
    onAddCard({
      name: nameCard,
      link: linkCard,
    });
  }

  React.useEffect(() => {
    if (validationMessageName || validationMessageLink) {
      setActiveSubmitButton(false);
    } else { setActiveSubmitButton(true) }
  }, [validationMessageName, validationMessageLink]);

  React.useEffect(() => {
    setNameCard('');
    setLinkCard('');
    setValidName(true);
    setValidLink(true);
    setValidationMessageName('');
    setValidationMessageLink('');
    setActiveSubmitButton(false);
  }, [isOpen]);

  return (
    <PopupWithForm activeSubmitButton={isActiveSubmitButton} eventSubmit={handleSubmit} name="new-space" title="Новое место" buttonText={isLoading ? "Сохранение..." : "Сохранить"} onClose={onClose} isOpen={isOpen} children={
      <>
        <input value={nameCard} onChange={handleChangeNameCard} className="popup__input popup__input_type_name-space" id="cardName-input" type="text" name="name"
          placeholder="Название места" minLength="2" maxLength="30" required />
        <span className={`popup__input-error cardName-input-error ${!isValidName ? 'popup__input-error_active popup__input_type_error' : ''}`}>{validationMessageName}</span>
        <input value={linkCard} onChange={handleChangeLinkCard} className="popup__input popup__input_type_link-space" id="url-input" type="url" name="link"
          placeholder="Ссылка на картинку" required />
        <span className={`popup__input-error url-input-error ${!isValidLink ? 'popup__input-error_active popup__input_type_error' : ''}`}>{validationMessageLink}</span>
      </>
    } />
  )
}

export default AddPlacePopup;