import React, { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatarRef.current.value);
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="input-avatar"
        type="url"
        ref={avatarRef}
        className="popup__input popup__input_link"
        name="avatar"
        placeholder="Ссылка на картинку"
        required
      />
      <span id="input-avatar-error" className="popup__input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
