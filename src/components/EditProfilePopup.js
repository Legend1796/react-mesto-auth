import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';
import { useFormAndValidation } from '../hooks/useFormAndValidation';

function EditProfilePopup({ isLoading, isOpen, onClose, onUpdateUser }) {

  const currentUser = React.useContext(CurrentUserContext);

  const { values, handleChange, errors, isValid, resetErrors } = useFormAndValidation({})

  React.useEffect(() => {
    resetErrors({ name: currentUser.name, about: currentUser.about });
  }, [currentUser, isOpen]);

  function handleSubmit() {
    onUpdateUser({ name: values.name, about: values.about });
  }

  return (
    <PopupWithForm isActiveSubmitButton={isValid} eventSubmit={handleSubmit} name="profile" title="Редактировать профиль" submitButtonText={isLoading ? "Сохранение..." : "Сохранить"} onClose={onClose} isOpen={isOpen}>
      <input value={values.name || ''} onChange={handleChange} className=" popup__input popup__input_type_name" id="name-input" type="text" name="name" placeholder="Имя"
        minLength="2" maxLength="40" required />
      <span className={`popup__input-error name-input-error ${!isValid ? 'popup__input-error_active popup__input_type_error' : ''}`}>{errors.name}</span>
      <input value={values.about || ''} onChange={handleChange} className="popup__input popup__input_type_job" id="about-input" type="text" name="about"
        placeholder="О себе" minLength="2" maxLength="200" required />
      <span className={`popup__input-error about-input-error ${!isValid ? 'popup__input-error_active popup__input_type_error' : ''}`}>{errors.about}</span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;