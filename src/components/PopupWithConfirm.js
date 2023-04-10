import PopupWithForm from './PopupWithForm.js';

/** Дочерний класс попапа с подтверждением */
export default class PopupWithConfirm extends PopupWithForm {
//** перезапись родительского метода open */
  open(cardId, cardElement) {
    super.open();
    this._idCard = cardId;
    this._cardElement = cardElement;
  }

  //** перезапись родительского метода _setEventListenersForForm */
  _setEventListenersForForm() {
    this._element = super._getElement();
    this._element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._idCard)
        .then(super.close())
        .then(this._cardElement.remove())
        .catch(err => console.log(`Ошибка: ${err}`));
    })
  }
}
