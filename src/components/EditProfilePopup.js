import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isLoading, isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [isValidName, setValidName] = React.useState(true);
  const [isValidDescription, setValidDescription] = React.useState(true);
  const [validationMessageName, setValidationMessageName] = React.useState('');
  const [validationMessageDescription, setValidationMessageDescription] = React.useState('');
  const [isActiveSubmitButton, setActiveSubmitButton] = React.useState(true);
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
    setValidName(e.target.validity.valid);
    if (e.target.validity.valid) {
      setValidationMessageName('');
    } else { setValidationMessageName(e.target.validationMessage) }
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
    setValidDescription(e.target.validity.valid);
    if (e.target.validity.valid) {
      setValidationMessageDescription('');
    } else { setValidationMessageDescription(e.target.validationMessage) }
  }

  function handleSubmit() {
    onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    if (validationMessageName || validationMessageDescription) {
      setActiveSubmitButton(false);
    } else { setActiveSubmitButton(true) }
  }, [validationMessageName, validationMessageDescription]);

  return (
    <PopupWithForm activeSubmitButton={isActiveSubmitButton} eventSubmit={handleSubmit} name="profile" title="Редактировать профиль" buttonText={isLoading ? "Сохранение..." : "Сохранить"} onClose={onClose} isOpen={isOpen} children={
      <>
        <input value={name} onChange={handleChangeName} className=" popup__input popup__input_type_name" id="name-input" type="text" name="name" placeholder="Имя"
          minLength="2" maxLength="40" required />
        <span className={`popup__input-error name-input-error ${!isValidName ? 'popup__input-error_active popup__input_type_error' : ''}`}>{validationMessageName}</span>
        <input value={description} onChange={handleChangeDescription} className="popup__input popup__input_type_job" id="about-input" type="text" name="about"
          placeholder="О себе" minLength="2" maxLength="200" required />
        <span className={`popup__input-error about-input-error ${!isValidDescription ? 'popup__input-error_active popup__input_type_error' : ''}`}>{validationMessageDescription}</span>
      </>} />
  )
}

export default EditProfilePopup;