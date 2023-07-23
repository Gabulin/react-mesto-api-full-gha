import React from "react";
import usePopupClose from "../hooks/UsePopupClose";

function PopupWithForm({
  name,
  title,
  children,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
}) {
  usePopupClose(isOpen, onClose);
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__closed"
          onClick={onClose}
        ></button>
        <h3 className="popup__text">{`${title}`}</h3>

        <form name={`${name}`} className="popup__form" onSubmit={onSubmit}>
          {" "}
          {children}
          <button
            type="submit"
            className="popup__submit"
          >{`${buttonText}`}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
