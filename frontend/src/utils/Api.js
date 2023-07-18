class Api {
  constructor({ link, headers }) {
    this._link = link;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  addNewCard({ name, link }) {
    return fetch(`${this._link}cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({ name, link }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  getInitialCards() {
    return fetch(`${this._link}cards`, {
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._link}cards/${cardId}`, {
      headers: this._headers,
      method: "DELETE",
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  getUserData() {
    return fetch(`${this._link}users/me`, {
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  sendUserData({ name, about }) {
    return fetch(`${this._link}users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({ name: name, about: about }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  sendAvatarData(avatar) {
    return fetch(`${this._link}users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({ avatar }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  _sendCardLike(_id) {
    return fetch(`${this._link}cards/${_id}/likes`, {
      headers: this._headers,
      method: "PUT",
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  _deleteCardLike(id) {
    return fetch(`${this._link}cards/${id}/likes`, {
      headers: this._headers,
      method: "DELETE",
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  toggleCardLike(cardId, isLiked) {
    return isLiked ? this._sendCardLike(cardId) : this._deleteCardLike(cardId);
  }
}

const apiConfig = {
  link: "https://mesto.nomoreparties.co/v1/cohort-63/",
  headers: {
    authorization: "94aa74ad-5308-499e-afc4-7f416a23dd02",
    "Content-Type": "application/json",
  },
};

export const api = new Api(apiConfig);
