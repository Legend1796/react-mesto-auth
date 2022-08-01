import React from 'react';
import * as auth from '../utils/auth';

function Login({ onLoggedIn, onAsseccDenied }) {
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
    onLoginIn(email, password);
  }

  function onLoginIn(email, password) {
    auth.autorise(email, password)
      .then((res) => {

        localStorage.setItem('jwt', res.token);
        onLoggedIn(true);
      })
      .catch((res) => {
        onAsseccDenied(res);
      });
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
      <p className="login__title">Вход</p>
      <form onSubmit={handleSubmit} className="login__form">
        <input className="login__input login__input_type_email" id="email" name="email" type="email" value={email} onChange={handleChangeEmail} placeholder="Email" required />
        <span className={`login__input-error url-input-error ${!isValidLink ? 'login__input-error_active popup__input_type_error' : ''}`}>{validationMessageLink}</span>
        <input className="login__input login__input_type_password" id="password" name="password" type="password" value={password} onChange={handleChangePassword} placeholder="Пароль" minLength="6" maxLength="20" required />
        <span className={`login__input-error password-input-error ${!isValidPassword ? 'login__input-error_active popup__input_type_error' : ''}`}>{validationMessagePassword}</span>
        <button className={`login__btn ${!isActiveSubmitButton ? 'popup__save-btn_disabled' : ''}`} type="submit" disabled={!isActiveSubmitButton}>Войти</button>
      </form>
    </div>

  )
}

export default Login;