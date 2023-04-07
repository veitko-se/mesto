export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._authorization = headers.authorization;
    this._headers = headers;
  }

  /** UserInfo публичный метод - получение аватарки+информации о пользователе с сервера */
  loadUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._authorization
      }
    })
      .then(res => {
        if (res.ok) { return res.json(); }
        return Promise.reject(res.status);
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`)
      })
  }

  /** Section публичный метод - загрузка карточек с сервера */
  loadInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._authorization
      }
    })
      .then(res => {
        if (res.ok) { return res.json(); }
        return Promise.reject(res.status);
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`)
      });
  }

  /** UserInfo публичный метод - обновление информации о пользователе */
  updateUserInfo(newInfo) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: newInfo.titleProfile,
        about: newInfo.subtitleProfile
      })
    })
      .then(res => {
        if (res.ok) { return res.json(); }
        return Promise.reject(res.status);
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`)
      });
  }

  /** UserInfo публичный метод - обновление аватара */
  updateUserAvatar(newAvatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: newAvatar
      })
    })
      .then(res => {
        if (res.ok) { return res.json(); }
        return Promise.reject(res.status);
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`)
      });
  }


  /** Card публичный метод - отправить карточку на сервер */
  pushCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => {
        if (res.ok) { return res.json(); }
        return Promise.reject(res.status);
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`)
      });
  }

  putLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers
      })
        .then(res => {
          if (res.ok) { return res.json(); }
          return Promise.reject(res.status);
        })
        .catch(err => {
          console.log(`Ошибка: ${err}`)
        });
    }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => {
        if (res.ok) { return res.json(); }
        return Promise.reject(res.status);
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`)
      });
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => {
        if (res.ok) { return res.json(); }
        return Promise.reject(res.status);
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`)
      });
  }

}
