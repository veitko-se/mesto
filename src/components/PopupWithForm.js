import Popup from './Popup.js';

/** Дочерний класс попапа с формой */
export default class PopupWithForm extends Popup {
  constructor({selector, handleFormSubmit}) {
    super(selector);
    this._selector = selector;
    this._handleFormSubmit = handleFormSubmit;
    this._element = this._getElement();
    this._buttonElement = this._element.querySelector('.popup__save-btn');
    this._inputList = this._element.querySelectorAll('.popup__input');
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
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  /** публичный метод - записать данные в поля формы */
  setInputValues(data) {
    this._inputList.forEach(input => input.value = data[input.name]);
  }

  /** перезапись родительского метода close */
  close() {
    super.close();
    this._element.reset();
  }

  /** приватный метод - слушатель submit в форме */
  _setEventListenersForForm() {
    this._element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const initialText = this._buttonElement.textContent;
      this._buttonElement.textContent = 'Сохранение...';
      this._handleFormSubmit(this._getInputValues())
        .then(() => this.close())
        .catch(err => console.log(`Ошибка: ${err}`))
        .finally(() => {
          this._buttonElement.textContent = initialText;
        });
    })
  }

  /** перезапись родительского метода setEventListeners */
  setEventListeners() {
    super.setEventListeners();
    this._setEventListenersForForm();
  }
}
