import headerLogo from "../image/logo.svg";
import { Routes, Route, Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Место Россия" />
      <div className="header__navbar">
        <p className="header__email">{props.email}</p>
        <Routes>
          <Route
            path="/"
            element={
              <Link
                className="header__link"
                to="/sign-in"
                onClick={props.onLogout}
              >
                Выйти
              </Link>
            }
          />
          <Route
            path="/sign-in"
            element={
              <Link className="header__link" to="/sign-up">
                Регистрация
              </Link>
            }
          />
          <Route
            path="/sign-up"
            element={
              <Link className="header__link" to="/sign-in">
                Войти
              </Link>
            }
          />
        </Routes>
      </div>
    </header>
  );
}

export default Header;
