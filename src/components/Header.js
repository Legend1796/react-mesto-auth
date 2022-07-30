import logo from '../images/logo.svg';
import { useLocation, Link } from 'react-router-dom';
function Header({ loggedIn, userEmail }) {
  const location = useLocation();
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип сайта" />
      {loggedIn &&
        <nav className="header__nav">
          <button className="header__menu" />
          <p className="header__email">{userEmail}</p>
          <Link className="header__link" to="/sign-in">Выйти</Link>
        </nav>
      }
      {!loggedIn &&
        <nav className="header__nav">
          {location.pathname === "/sign-in" && (<Link to="/sign-up" className="header__link">Регистрация</Link>)}
          {location.pathname === "/sign-up" && (<Link to="/sign-in" className="header__link">Войти</Link>)}
        </nav>
      }
    </header>
  )
}

export default Header;