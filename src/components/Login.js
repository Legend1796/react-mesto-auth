import React from 'react';
import * as auth from '../utils/auth';
import { useHistory } from 'react-router-dom';

function Login({ onLoggedIn, setUserEmail, onAsseccDenied }) {
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
    onLoginIn(email, password);
  }

  function onLoginIn(email, password) {
    auth.autorise(email, password)
      .then((res) => {
        setUserEmail(email);
        localStorage.setItem('jwt', res.token);
        onLoggedIn(true);
        history.push('/main');
      })
      .catch((res) => {
        onAsseccDenied(res);
      });
  }

  return (
    <div className="login">
      <p className="login__title">Вход</p>
      <form onSubmit={handleSubmit} className="login__form">
        <input className="login__input login__input_type_email" required id="email" name="email" type="text" value={email} onChange={handleChangeEmail} placeholder="Email" />
        <input className="login__input login__input_type_password" required id="password" name="password" type="password" value={password} onChange={handleChangePassword} placeholder="Пароль" />
        <button className="login__btn" type="submit">Войти</button>
      </form>
    </div>

  )
}

export default Login;