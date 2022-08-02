import logo from '../images/logo.svg';
import { Link, Route } from 'react-router-dom';
function Header({ userEmail, exitProfile }) {

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип сайта" />
      <Route exact path="/main">
        <div className="header__nav">
          <p className="header__email">{userEmail}</p>
          <button className="header__link" onClick={exitProfile}>Выйти</button>
        </div>
      </Route>
      <Route path="/sign-up">
        <Link className="header__link" to="sign-in">Войти</Link>
      </Route>
      <Route path="/sign-in">
        <Link className="header__link" to="sign-up">Регистрация</Link>
      </Route>
    </header>
  )
}

export default Header;