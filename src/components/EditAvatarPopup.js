import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from '../hooks/useFormAndValidation';

function EditAvatarPopup({ isLoading, isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  const { handleChange, errors, isValid, resetErrors } = useFormAndValidation({})

  function handleSubmit() {
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  React.useEffect(() => {
    resetErrors();
  }, [isOpen]);

  return (
    <PopupWithForm isActiveSubmitButton={isValid} eventSubmit={handleSubmit} name="edit-avatar" title="Обновить аватар" submitButtonText={isLoading ? "Сохранение..." : "Сохранить"} onClose={onClose} isOpen={isOpen}>
      <input ref={avatarRef} onChange={handleChange} className="popup__input popup__input_type_link-avatar" id="avatar-input" type="url" name="link"
        placeholder="Ссылка на аватар" required />
      <span className={`popup__input-error avatar-input-error ${!isValid ? 'popup__input-error_active popup__input_type_error' : ''}`}>{errors.link}</span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;