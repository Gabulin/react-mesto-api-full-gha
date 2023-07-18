import { Link } from "react-router-dom";
import { useState } from "react";

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailInput(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordInput(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(email, password);
  }

  return (
    <div className="login">
      <div className="login__container">
        <h2 className="login__heading">Регистрация</h2>
        <form className="login__form" name="register" onSubmit={handleSubmit}>
          <input
            id="input-email"
            className="login__text"
            name="email"
            type="email"
            placeholder="Email"
            minLength="2"
            required
            value={email}
            onChange={handleEmailInput}
          />
          <input
            id="input-password"
            className="login__text"
            name="password"
            type="password"
            placeholder="Пароль"
            minLength="6"
            maxLength="16"
            required
            value={password}
            onChange={handlePasswordInput}
          />
          <div className="login__button-container">
            <button className="login__button" type="submit">
              Зарегистрироваться
            </button>
            <p className="login__send-text">
              Уже зарегистрированы?&nbsp;
              <Link to="/sign-in" className="login__send-link">
                Войти
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
