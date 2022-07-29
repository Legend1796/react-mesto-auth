import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isLoading, isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();
  const [isActiveSubmitButton, setActiveSubmitButton] = React.useState(false);
  const [isValid, setValid] = React.useState(true);
  const [validationMessageLink, setValidationMessageLink] = React.useState('');

  function handleChangeLink(e) {
    setValid(avatarRef.current.validity.valid);
    if (e.target.validity.valid) {
      setValidationMessageLink('');
      setActiveSubmitButton(true)
    } else {
      setValidationMessageLink(e.target.validationMessage);
      setActiveSubmitButton(false)
    }
  }
  function handleSubmit() {
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  React.useEffect(() => {
    avatarRef.current.value = '';
    setValid(true);
    setValidationMessageLink('');
    setActiveSubmitButton(false);
  }, [isOpen]);

  return (
    <PopupWithForm activeSubmitButton={isActiveSubmitButton} eventSubmit={handleSubmit} name="edit-avatar" title="Обновить аватар" buttonText={isLoading ? "Сохранение..." : "Сохранить"} onClose={onClose} isOpen={isOpen} children={
      <>
        <input ref={avatarRef} onChange={handleChangeLink} className="popup__input popup__input_type_link-avatar" id="avatar-input" type="url" name="link"
          placeholder="Ссылка на аватар" required />
        <span className={`popup__input-error avatar-input-error ${!isValid ? 'popup__input-error_active popup__input_type_error' : ''}`}>{validationMessageLink}</span>

      </>
    } />
  )
}

export default EditAvatarPopup;