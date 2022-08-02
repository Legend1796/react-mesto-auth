import React from 'react';

function Login({ onLoginIn }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isValidPassword, setIsValidPassword] = React.useState(false);
  const [isValidLink, setIsValidLink] = React.useState(false);
  const [validationMessagePassword, setValidationMessagePassword] = React.useState('');
  const [validationMessageLink, setValidationMessageLink] = React.useState('');
  const [isActiveSubmitButton, setIsActiveSubmitButton] = React.useState(false);

  function handleChangeEmail(e) {
    setEmail(e.target.value);
    setIsValidLink(e.target.validity.valid);
    if (e.target.validity.valid) {
      setValidationMessageLink('');
    } else { setValidationMessageLink(e.target.validationMessage) }
  }
  function handleChangePassword(e) {
    setPassword(e.target.value);
    setIsValidPassword(e.target.validity.valid);
    if (e.target.validity.valid) {
      setValidationMessagePassword('');
    } else { setValidationMessagePassword(e.target.validationMessage) }
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLoginIn(email, password);
  }

  React.useEffect(() => {
    setEmail('');
    setPassword('');
    setIsValidPassword(true);
    setIsValidLink(true);
    setValidationMessagePassword('');
    setValidationMessageLink('');
    setIsActiveSubmitButton(false);
  }, []);

  React.useEffect(() => {
    if (validationMessagePassword || validationMessageLink) {
      setIsActiveSubmitButton(false);
    } else { setIsActiveSubmitButton(true) }
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