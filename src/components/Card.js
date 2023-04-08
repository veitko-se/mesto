/** класс карточек */
export default class Card {
  constructor({ name, link, likes, owner, _id }, templateSelector, handleCardClick, handleClickBtnTrash, putLike, deleteLike, deleteCard) {
    this.name = name;
    this.link = link;
    this._likes = likes;
    this._owner = owner;
    this._idCard = _id;
    this._templateSelector = templateSelector;
    this._handleClickImagePlace = handleCardClick;
    this._handleClickBtnTrash = handleClickBtnTrash;
    this._putLike = putLike;
    this._deleteLike = deleteLike;
    this._deleteCard = deleteCard;
    this._handleClickBtnLike = this._handleClickBtnLike.bind(this);
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.element__image');
    this._elementTitle = this._element.querySelector('.element__text');
    this._elementBtnTrash = this._element.querySelector('.element__trash-btn');
    this._elementBtnLike = this._element.querySelector('.element__like-btn');
    this._elementCountLike = this._element.querySelector('.element__like-count');
    this._toggled = false;
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

  /** приватный метод - обновление состояния кнопки Лайк */
  _updateLikeStatus(updatedCard, toggled) {
      this._likes = updatedCard.likes;
      this._elementCountLike.textContent = this._likes.length;
      this._toggled = toggled;
  };

  /** приватный метод - обработчик события - Лайк */
  _handleClickBtnLike() {
    if (this._toggled) {
      this._deleteLike(this._idCard)
        .then(updatedCard => this._updateLikeStatus(updatedCard, false))
        .then(this._elementBtnLike.classList.remove('element__like-btn_active'))
        .catch(err => console.log(`Ошибка: ${err}`));
    } else {
      this._putLike(this._idCard)
        .then(updatedCard => this._updateLikeStatus(updatedCard, true))
        .then(this._elementBtnLike.classList.add('element__like-btn_active'))
        .catch(err => console.log(`Ошибка: ${err}`));
    }
  };

  /** приватный метод - слушатели для карточки */
  _setEventListeners() {
    this._elementBtnTrash.addEventListener('click', () => this._handleClickBtnTrash(this));
    this._elementBtnLike.addEventListener('click', this._handleClickBtnLike);
    this._elementImage.addEventListener('click', () => this._handleClickImagePlace({ name: this.name, link: this.link }));
  };

  /** приватный метод - инициализация состояния лайка */
  _initIsCardLiked(currentUserId) {
    if (this._likes.some(likeUser => {return likeUser._id === currentUserId})) {
      this._toggled = true;
      this._elementBtnLike.classList.add('element__like-btn_active');
    } else {
      this._toggled = false;
      this._elementBtnLike.classList.remove('element__like-btn_active');
    };
  };

  /** приватный метод - инициализация возможности удаления */
  _initCanDelete(currentUserId) {
    if (this._owner._id !== currentUserId) {
      this._elementBtnTrash.remove();
    }
  }

  /** публичный метод - формирование карточек со всеми их интерактивными элементами */
  createPlace(currentUserId) {
    this._elementTitle.textContent = this.name;
    this._elementImage.src = this.link;
    this._elementImage.alt = this.name;
    this._elementCountLike.textContent = this._likes.length;
    this._initIsCardLiked(currentUserId);
    this._initCanDelete(currentUserId);
    this._setEventListeners();
    return this._element;
  };

  /** публичный метод - возвращает промис для удаления карточки */
  deleteCard() {
    return this._deleteCard(this._idCard)
      .then(this._element.remove());
  }
}
