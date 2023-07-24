import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [error, setError] = useState(false);
  
  const token = localStorage.getItem("token");
  
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      checkToken();
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      api(token)
        .getUserData(currentUser)
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => {
          console.log(err);
        });
      api(token)
        .getInitialCards(cards)
        .then((card) => {
          setCards(card.reverse());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard({});
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api(token)
      .toggleCardLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    const isOwn = card.owner._id === currentUser._id;
    api(token)
      .deleteCard(card._id, !isOwn)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleNewInfo(profileData) {
    api(token)
      .sendUserData(profileData)
      .then((newprofileData) => {
        setCurrentUser(newprofileData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleNewAvatar(avatar) {
    api(token)
      .sendAvatarData(avatar)
      .then((profileData) => {
        setCurrentUser(profileData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardSubmit(card) {
    api(token)
      .addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleRegister(email, password) {
    auth.register(email, password)
      .then(() => {
        navigate("/sign-in", { replace: true });
        setIsSuccessful(true);
      })
      .catch((err) => {
        console.log(err);
        setIsSuccessful(false);
      })
      .finally(() => {
        setIsInfoTooltipPopupOpen(true);
      });
  }

  function handleLogin(email, password) {
    auth.login(email, password)
      .then(data => {
        if (data.token) {
          checkToken();
          setLoggedIn(true);
          navigate("/");
        }
      })
      .catch((err) => {
        setError(true);
        console.log(err);
        setIsInfoTooltipPopupOpen(p => !p);
      });
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setUserEmail("");
    setLoggedIn(false);
    navigate("/sign-in");
  }

  function checkToken() {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");

      auth.checkValidityToken(token)
        .then(res => {
          if (res) {
            const email = res.email;
            setLoggedIn(true);
            setUserEmail(email);
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <Header email={userEmail} onLogout={handleLogout} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                element={Main}
                onEditProfile={handleEditProfileClick}
                onEditAvatar={handleEditAvatarClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                cards={cards}
                onCardDelete={handleCardDelete}
              />
            }
          />
          <Route path="/sign-in" element={<Login 
            onLogin={handleLogin} 
            setError={setError} 
            setIsInfoTooltipPopupOpen={setIsInfoTooltipPopupOpen} />} />
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegister} />}
          />
        </Routes>
        <PopupWithForm
          name="del-card"
          title="Вы уверены?"
          buttonText="Да"
          onClose={closeAllPopups}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleNewInfo}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleNewAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleCardSubmit}
        />
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          successful={isSuccessful}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
