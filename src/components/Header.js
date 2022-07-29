import logo from '../images/logo.svg';
import { NavLink } from 'react-router-dom';
function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип сайта" />
      {/* <nav className="menu">
        <NavLink exact to="/" activeClassName="menu__link_active" className="menu__link">Войти</NavLink>
        <NavLink to="/registr" activeClassName="menu__link_active" className="menu__link">Регистрация</NavLink>
      </nav> */}
    </header>
  )
}

export default Header;