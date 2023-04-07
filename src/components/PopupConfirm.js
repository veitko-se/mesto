import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
  constructor({selector, handleFormSubmit}) {
    super(selector);
    this._selector = selector;
    this._handleFormSubmit = handleFormSubmit;
    this._element = null;
    this._inputList = null;
    this._formValues = {};
  }
  /** приватный метод получения элемента формы */
  _getElement() {
  	const formElement = document
      .querySelector(this._selector)
      .querySelector('form');
    return formElement;
  }

  /** приватный метод - слушатель submit в форме */
  _setEventListenersForForm() {
    this._element = this._getElement();
    this._element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
      this.close();
    })
  }

  /** перезапись родительского метода setEventListeners */
  setEventListeners() {
    super.setEventListeners();
    this._setEventListenersForForm();
  }

}
