/** класс валидации форм */
export default class FormValidator {
  constructor(config, formElement) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  /** приватный метод показа ошибки */
  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  };

  /** приватный метод скрытия ошибки */
  _hideInputError = inputElement => {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  /** приватный метод проверки валидности поля для ввода */
  _checkInputValidity = inputElement => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  /** приватный метод - сообщает, есть ли в форме хоть один невалидный input */
  _hasInvalidInput = () => {
    return this._inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  };

  /** приватный метод переключения состояния кнопки в активное/неактивное */
  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  };

  /** приватный метод - слушатель input-ов - обеспечивает отзывчивость интерфейса */
  _setEventListeners = () => {
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  /** публичный метод включения валидации формы*/
  enableValidation = () => {
    this._toggleButtonState();
    this._setEventListeners();
  };

  /** публичный метод сброса предыдущей валидации при открытии popup-ов, без сброса полей формы */
  resetValidation = () => {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
    this._inputList.forEach(inputElement =>
      this._hideInputError(inputElement)
    );
  };
}
