import { openPopup } from './util.js';


/** класс карточек */
export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._element = ''
  }

  /** приватный метод получения шаблона */
  _getTemplate() {
    const cardPlace = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    return cardPlace;
  }

  /** приватный метод - обработчик события - лайк */
  _handleClickBtnLike(evt) {
    evt.target.classList.toggle('element__like-btn_active');
  };

  /** приватный метод - обработчик события - клик по картинке */
  _handleClickImagePlace() {
    const popupView = document.querySelector('#popup-photo');
    const titleView = popupView.querySelector('.popup__title_type_photo');
    const imageView = popupView.querySelector('.popup__photo');
    titleView.textContent = this._name;
    imageView.src = this._link;
    imageView.alt = this._name;
    openPopup(popupView);
  };

  /** приватный метод - обработчик события - лайк */
  _handleClickBtnTrash() {
    this._element.remove();
  };

  /** приватный метод - слушатели для карточки */
  _setEventListeners() {
    const buttonDeletePlace = this._element.querySelector('.element__trash-btn');
    const buttonLikePlace = this._element.querySelector('.element__like-btn');
    const imagePlace = this._element.querySelector('.element__image');
    buttonDeletePlace.addEventListener('click', () => this._handleClickBtnTrash());
    buttonLikePlace.addEventListener('click', this._handleClickBtnLike);
    imagePlace.addEventListener('click', () => this._handleClickImagePlace());
  };

  /** публичный метод формирования карточек со всеми их интерактивными элементами */
  createPlace() {
    this._element = this._getTemplate();
    const titlePlace = this._element.querySelector('.element__text');
    const imagePlace = this._element.querySelector('.element__image');
    titlePlace.textContent = this._name;
    imagePlace.src = this._link;
    imagePlace.alt = this._name;
    this._setEventListeners();
    return this._element;
  };
}
