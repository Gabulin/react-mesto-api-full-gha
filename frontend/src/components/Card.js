import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const elementButtonClass = `element__button ${
    isLiked && "element__button_active"
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className="element">
      {isOwn && (
        <button
          type="button"
          className="element__trash"
          onClick={handleDeleteClick}
        ></button>
      )}
      <img
        className="element__image"
        alt={`${card.name}`}
        src={`${card.link}`}
        onClick={handleClick}
      />
      <div className="element__info">
        <h2 className="element__title">{`${card.name}`}</h2>
        <div className="element__like-container">
          <button
            type="button"
            className={elementButtonClass}
            onClick={handleLikeClick}
          ></button>
          <span className="element__button-counter">{`${card.likes.length}`}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
