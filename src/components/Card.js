/** класс карточек */
export default class Card {
  constructor({name, link}, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleClickImagePlace = handleCardClick;
    this._element = null;
    this._elementImage = null;
    this._elementTitle = null;
    this._elementBtnTrash = null;
    this._elementBtnLike = null;
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

  /** приватный метод - обработчик события - удалить */
  _handleClickBtnTrash() {
    this._element.remove();
  };

  /** приватный метод - слушатели для карточки */
  _setEventListeners() {
    this._elementBtnTrash.addEventListener('click', () => this._handleClickBtnTrash());
    this._elementBtnLike.addEventListener('click', this._handleClickBtnLike);
    this._elementImage.addEventListener('click', () => this._handleClickImagePlace({name: this._name, link: this._link}));
  };

  /** публичный метод формирования карточек со всеми их интерактивными элементами */
  createPlace() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.element__image');
    this._elementTitle = this._element.querySelector('.element__text');
    this._elementBtnTrash = this._element.querySelector('.element__trash-btn');
    this._elementBtnLike = this._element.querySelector('.element__like-btn');
    this._elementTitle.textContent = this._name;
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._setEventListeners();
    return this._element;
  };
}
