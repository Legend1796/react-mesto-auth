import React from 'react';

function Form({ submitButtonText, isActiveSubmitButton, name, onSubmit, children }) {
  return (
    <form className="popup__form" name={name} noValidate onSubmit={onSubmit}>
      {children}
      <button className={`login__btn ${!isActiveSubmitButton ? 'popup__save-btn_disabled' : ''}`} type="submit" disabled={!isActiveSubmitButton}>{submitButtonText}</button>
    </form>
  );
}

export default Form;