import { useEffect } from "react";

function UsePopupClose(isOpen, closePopup) {
  useEffect(() => {
    if (!isOpen) return;

    const onOverlay = (event) => {
      if (event.target.classList.contains("popup_opened")) {
        closePopup();
      }
      if (event.target.classList.contains("popup__close")) {
        closePopup();
      }
    };

    const onEscape = (evt) => {
      if (evt.key === "Escape") {
        closePopup();
      }
    };

    document.addEventListener("mousedown", onOverlay);
    document.addEventListener("keydown", onEscape);

    return () => {
      document.removeEventListener("mousedown", onOverlay);
      document.removeEventListener("keydown", onEscape);
    };
  }, [isOpen, closePopup]);
}

export default UsePopupClose;
