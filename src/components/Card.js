/** класс карточек */
export default class Card {
  constructor({ name, link, likes, owner, _id }, templateSelector, handleCardClick, putLike, deleteLike, handleClickBtnTrash, deleteCard) {
    this.name = name;
    this.link = link;
    this._likes = likes;
    this._owner = owner;
    this._id = _id;
    this._templateSelector = templateSelector;
    this._handleClickImagePlace = handleCardClick;
    this._putLike = putLike;
    this._deleteLike = deleteLike;
    this._deleteCard = deleteCard
    this._element = null;
    this._elementImage = null;
    this._elementTitle = null;
    this._elementBtnTrash = null;
    this._elementBtnLike = null;
    this._elementCountLike = null;
    this._handleClickBtnLike = this._handleClickBtnLike.bind(this);
    this._handleClickBtnTrash = handleClickBtnTrash;
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

  _initIsCardLiked(userId) {
    for (let i = 0; i < this._likes.length; i += 1) {
      if (this._likes[i]._id === userId) {
        this._toggled = true;
        this._elementBtnLike.classList.add('element__like-btn_active');
        return
      }
    }
    this._toggled = false;
    this._elementBtnLike.classList.remove('element__like-btn_active');
  };

  _initCanDelete(userId) {
    if (this._owner._id !== userId) {
      this._elementBtnTrash.remove();
    }
  }

  /** приватный метод - обработчик события - лайк */
  _handleClickBtnLike() {
    if (this._toggled) {
      this._deleteLike(this._id)
        .then(updatedCard => {
          this._likes = updatedCard.likes;
          this._elementCountLike.textContent = this._likes.length;
          this._toggled = false;
        })
        .then(
          this._elementBtnLike.classList.remove('element__like-btn_active')
        )
    } else {
      this._putLike(this._id)
        .then(updatedCard => {
          this._likes = updatedCard.likes;
          this._elementCountLike.textContent = this._likes.length;
          this._toggled = true;
        }).then(
          this._elementBtnLike.classList.add('element__like-btn_active')
        )
    }
  };

  deleteCard() {
    this._deleteCard(this._id).then(this._element.remove());
  }

  /** приватный метод - слушатели для карточки */
  _setEventListeners() {
    this._elementBtnTrash.addEventListener('click', () => this._handleClickBtnTrash(this));
    this._elementBtnLike.addEventListener('click', this._handleClickBtnLike);
    this._elementImage.addEventListener('click', () => this._handleClickImagePlace({ name: this.name, link: this.link }));
  };

  /** публичный метод формирования карточек со всеми их интерактивными элементами */
  createPlace(currentUserId) {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.element__image');
    this._elementTitle = this._element.querySelector('.element__text');
    this._elementBtnTrash = this._element.querySelector('.element__trash-btn');
    this._elementBtnLike = this._element.querySelector('.element__like-btn');
    this._elementCountLike = this._element.querySelector('.element__like-count');
    this._elementTitle.textContent = this.name;
    this._elementImage.src = this.link;
    this._elementImage.alt = this.name;
    this._elementCountLike.textContent = this._likes.length;
    this._setEventListeners();
    this._initIsCardLiked(currentUserId);
    this._initCanDelete(currentUserId);
    return this._element;
  };
}
