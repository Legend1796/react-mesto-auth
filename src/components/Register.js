import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as auth from '../utils/auth';

function Register({ onLoggedIn, setUserEmail }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const history = useHistory();

  function handleChangeEmail(e) {
    setEmail(e.target.value);

  }
  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(email, password);
  }

  function onRegister(email, password) {
    auth.register(email, password)
      .then((res) => {
        if (res) {
          setUserEmail(email);
          onLoggedIn(true);
          history.push('/main');
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="login">
      <p className="login__title">Регистрация</p>
      <form onSubmit={handleSubmit} className="login__form">
        <input className="login__input login__input_type_email" required id="email" name="email" type="text" value={email} onChange={handleChangeEmail} placeholder="Email" />
        <input className="login__input login__input_type_password" required id="password" name="password" type="password" value={password} onChange={handleChangePassword} placeholder="Пароль" />
        <button className="login__btn" type="submit">Зарегистрироваться</button>
      </form>
      <div className="login__signup">
        <p className="login__signup-text">Уже зарегистрированы?</p>
        <Link to="/sign-in" className="login__link">Войти</Link>
      </div>
    </div>

  )
}

export default Register;