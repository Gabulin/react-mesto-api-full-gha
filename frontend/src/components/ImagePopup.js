import usePopupClose from "../hooks/UsePopupClose";

function ImagePopup({ card, onClose }) {
  usePopupClose(card, onClose);
  return (
    <div
      className={`popup popup_image-open ${
        Object.keys(card).length !== 0 ? `popup_opened` : ""
      }`}
      id="popup_image-open"
    >
      <div className="image">
        <button
          type="button"
          className="popup__closed"
          onClick={onClose}
        ></button>
        <img
          className="image__opened"
          alt={`${card.name}`}
          src={`${card.link}`}
        />
        <h3 className="image__name">{`${card.name}`}</h3>
      </div>
    </div>
  );
}

export default ImagePopup;
