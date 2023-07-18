import React, { useState } from "react";

function Login({ onLogin }) {
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
    onLogin(email, password);
  }

  return (
    <div className="login">
      <div className="login__container">
        <h2 className="login__heading">Вход</h2>
        <form className="login__form" name="login" onSubmit={handleSubmit}>
          <input
            id="email"
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
            id="password"
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
              Войти
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
