import Popup from './Popup.js';

/** Дочерний класс попапа с формой */
export default class PopupWithForm extends Popup {
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

  /** приватный метод получения значений полей формы */
  _getInputValues() {
    this._inputList = this._element.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  /** перезапись родительского метода close */
  close() {
    super.close();
    this._element.reset();
  }

  /** приватный метод - слушатель submit в форме */
  _setEventListenersForForm() {
    this._element = this._getElement();
    this._element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    })
  }

  /** перезапись родительского метода setEventListeners */
  setEventListeners() {
    super.setEventListeners();
    this._setEventListenersForForm();
  }
}
