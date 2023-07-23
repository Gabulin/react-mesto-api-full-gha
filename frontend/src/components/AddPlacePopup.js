import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [placeName, setPlaceName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setPlaceName("");
    setLink("");
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name: placeName,
      link: link,
    });
  }

  function handlePlaceNameChange(evt) {
    setPlaceName(evt.target.value);
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        placeholder="Название"
        id="input__image"
        type="text"
        className="popup__input popup__input_image"
        minLength="2"
        maxLength="30"
        name="name"
        value={placeName}
        onChange={handlePlaceNameChange}
        required
      />
      <span className="popup__input-error place-error"></span>
      <input
        placeholder="Ссылка на картинку"
        id="input__link"
        type="url"
        className="popup__input popup__input_link"
        minLength="2"
        maxLength="200"
        name="link"
        value={link}
        onChange={handleLinkChange}
        required
      />
      <span className="popup__input-error link-place-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
