/** Класс информации о пользователе */
export default class UserInfo {
  constructor({ selectorUserName, selectorUserJob, selectorUserAvatar }) {
    this._userNameContainer = document.querySelector(selectorUserName);
    this._userJobContainer = document.querySelector(selectorUserJob);
    this._userAvatarContainer = document.querySelector(selectorUserAvatar);
    this._userInfo = null;
  }

  /** публичный метод - вернуть объект с информацией о пользователе */
  getUserInfo() {
    return this._userInfo;
  }

  setUserInfo(newUserInfo) {
    this._userInfo = newUserInfo;
    this._setUserInfo({titleProfile: this._userInfo.name, subtitleProfile: this._userInfo.about});
    this._setUserAvatar({photoProfile: this._userInfo.avatar});
    this._renderLoading();
  }

  /** приватный метод - запись новой информации о пользователе в DOM*/
  _setUserInfo({ titleProfile, subtitleProfile }) {
    this._userNameContainer.textContent = titleProfile;
    this._userJobContainer.textContent = subtitleProfile;
  }

  /** приватный метод - запись нового фото пользователя в DOM*/
  _setUserAvatar({ photoProfile }) {
    this._userAvatarContainer.src = photoProfile;
  }

  /** приватный метод - убрать анимацию загрузки текста*/
  _renderLoading() {
    this._userNameContainer.classList.remove('placeholder-loading');
    this._userJobContainer.classList.remove('placeholder-loading');
  };

}
