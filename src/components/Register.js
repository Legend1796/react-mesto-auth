import React from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isValidPassword, setValidPassword] = React.useState(false);
  const [isValidLink, setValidLink] = React.useState(false);
  const [validationMessagePassword, setValidationMessagePassword] = React.useState('');
  const [validationMessageLink, setValidationMessageLink] = React.useState('');
  const [isActiveSubmitButton, setActiveSubmitButton] = React.useState(false);

  function handleChangeEmail(e) {
    setEmail(e.target.value);
    setValidLink(e.target.validity.valid);
    if (e.target.validity.valid) {
      setValidationMessageLink('');
    } else { setValidationMessageLink(e.target.validationMessage) }

  }
  function handleChangePassword(e) {
    setPassword(e.target.value);
    setValidPassword(e.target.validity.valid);
    if (e.target.validity.valid) {
      setValidationMessagePassword('');
    } else { setValidationMessagePassword(e.target.validationMessage) }
  }
  function handleSubmit(e) {
    e.preventDefault();
    onRegister(email, password);
  }

  React.useEffect(() => {
    setEmail('');
    setPassword('');
    setValidPassword(true);
    setValidLink(true);
    setValidationMessagePassword('');
    setValidationMessageLink('');
    setActiveSubmitButton(false);
  }, []);

  React.useEffect(() => {
    if (validationMessagePassword || validationMessageLink) {
      setActiveSubmitButton(false);
    } else { setActiveSubmitButton(true) }
  }, [validationMessagePassword, validationMessageLink]);

  return (
    <div className="login">
      <p className="login__title">Регистрация</p>
      <form onSubmit={handleSubmit} className="login__form">
        <input className="login__input login__input_type_email" required id="email" name="email" type="email" value={email} onChange={handleChangeEmail} placeholder="Email" />
        <span className={`login__input-error url-input-error ${!isValidLink ? 'login__input-error_active popup__input_type_error' : ''}`}>{validationMessageLink}</span>
        <input className="login__input login__input_type_password" required id="password" name="password" type="password" value={password} onChange={handleChangePassword} placeholder="Пароль" />
        <span className={`login__input-error password-input-error ${!isValidPassword ? 'login__input-error_active popup__input_type_error' : ''}`}>{validationMessagePassword}</span>
        <button className={`login__btn ${!isActiveSubmitButton ? 'popup__save-btn_disabled' : ''}`} type="submit" disabled={!isActiveSubmitButton}>Зарегистрироваться</button>
      </form>
      <div className="login__signup">
        <p className="login__signup-text">Уже зарегистрированы?</p>
        <Link to="/sign-in" className="login__link">Войти</Link>
      </div>
    </div>
  )
}

export default Register;