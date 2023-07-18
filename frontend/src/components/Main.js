import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  cards,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar">
          <button
            className="profile__avatar-edit"
            type="button"
            onClick={onEditAvatar}
          ></button>
          <img
            className="profile__avatar-img"
            src={currentUser.avatar}
            alt="Аватар"
          />
        </div>
        <div className="profile__info">
          <div className="profile__edit">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              type="button"
              className="profile__button"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="profile__add-card"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements">
        {" "}
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}
export default Main;
