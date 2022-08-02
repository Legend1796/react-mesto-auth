import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from '../hooks/useFormAndValidation';

function AddPlacePopup({ isOpen, onClose, onAddCard, isLoading }) {

  const { values, handleChange, errors, isValid, resetErrors } = useFormAndValidation({})


  function handleSubmit() {
    onAddCard({ name: values.name, link: values.link });
  }

  React.useEffect(() => {
    resetErrors({ name: '', link: '' });
  }, [isOpen]);

  return (
    <PopupWithForm isActiveSubmitButton={isValid} eventSubmit={handleSubmit} name="new-space" title="Новое место" submitButtonText={isLoading ? "Сохранение..." : "Сохранить"} onClose={onClose} isOpen={isOpen}>
      <input value={values.name} onChange={handleChange} className="popup__input popup__input_type_name-space" id="cardName-input" type="text" name="name"
        placeholder="Название места" minLength="2" maxLength="30" required />
      <span className={`popup__input-error cardName-input-error ${!isValid ? 'popup__input-error_active popup__input_type_error' : ''}`}>{errors.name}</span>
      <input value={values.link} onChange={handleChange} className="popup__input popup__input_type_link-space" id="url-input" type="url" name="link"
        placeholder="Ссылка на картинку" required />
      <span className={`popup__input-error url-input-error ${!isValid ? 'popup__input-error_active popup__input_type_error' : ''}`}>{errors.link}</span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;