import React from "react";
import { useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        placeholder="ФИО"
        id="input__name"
        className="popup__input popup__input_name"
        type="text"
        minLength="2"
        maxLength="30"
        name="name"
        required
        onChange={handleChangeName}
        value={name || ""}
      />
      <span className="name-error popup__input-error"> </span>
      <input
        placeholder="Род деятельности"
        id="input__job"
        className="popup__input popup__input_job"
        type="text"
        minLength="2"
        maxLength="200"
        name="info"
        required
        onChange={handleChangeDescription}
        value={description || ""}
      />
      <span className="popup__input-error hobby-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
