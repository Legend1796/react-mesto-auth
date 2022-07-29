import PopupWithForm from "./PopupWithForm";

function ConfirmationPopup({ name, isOpen, onClose, buttonText, title, onDeleteCard }) {
  function handleSubmit() {
    onDeleteCard();
  }

  return (
    <PopupWithForm eventSubmit={handleSubmit} name={name} title={title} buttonText={buttonText} onClose={onClose} isOpen={isOpen} />
  )
}

export default ConfirmationPopup;