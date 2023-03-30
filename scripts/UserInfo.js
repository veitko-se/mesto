/** Класс информации о пользователе */
export default class UserInfo {
  constructor({ selectorUserName, selectorUserJob }) {
    this._userName = document.querySelector(selectorUserName);
    this._userJob = document.querySelector(selectorUserJob);
    this._userInfo = null;
  }

  /** публичный метод - получение объекта с информацией о пользователе */
  getUserInfo() {
    this._userInfo = {
      name: this._userName.textContent,
      job: this._userJob.textContent
    };
    return this._userInfo;
  }

  /** публичный метод - запись новой информации о пользователе в DOM*/
  setUserInfo({titleProfile, subtitleProfile}) {
    this._userName.textContent = titleProfile;
    this._userJob.textContent = subtitleProfile;
  }
}
