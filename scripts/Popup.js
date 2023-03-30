/** Родительский класс попапа */
export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
  }

  /** приватный метод - обработчик события - закрыть popup при нажатии Esc */
  _handleEscClose(evt) {
    if(evt.key === 'Escape') {
      this.close();
    }
  };

  /** приватный метод - обработчик события - закрыть popup при клике на оверлей или крестик*/
  _handleMousedownClose(evt) {
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-btn')) {
      this.close();
    };
  };

  /** публичный метод - функция открытия Popup */
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  /** публичный метод - функция закрытия Popup */
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  }

  /** публичный метод - слушатель popup-ов для событий закрытия по крестику и оверлею */
  setEventListeners() {
    this._popup.addEventListener('mousedown', this._handleMousedownClose.bind(this));
  }
}
