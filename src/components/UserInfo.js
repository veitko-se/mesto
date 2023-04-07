/** Класс информации о пользователе */
export default class UserInfo {
  constructor({ selectorUserName, selectorUserJob, selectorUserAvatar }) {
    this._userNameContainer = document.querySelector(selectorUserName);
    this._userJobContainer = document.querySelector(selectorUserJob);
    this._userAvatarContainer = document.querySelector(selectorUserAvatar);
    this._userInfo = null;
  }

  /** публичный метод - записать новую информацию о пользователе */
  setUserInfo(newUserInfo) {
    this._userInfo = newUserInfo;
    this._userNameContainer.textContent = this._userInfo.name;
    this._userJobContainer.textContent = this._userInfo.about;
    this._userAvatarContainer.src = this._userInfo.avatar;
    this._renderLoading();
  }

  /** публичный метод - вернуть объект с информацией о пользователе */
  getUserInfo() {
    return this._userInfo;
  }

  /** приватный метод - убрать анимацию загрузки текста*/
  _renderLoading() {
    this._userNameContainer.classList.remove('placeholder-loading');
    this._userJobContainer.classList.remove('placeholder-loading');
  };
}
