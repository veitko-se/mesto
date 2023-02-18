/** список настроек форм, передается в функцию валидации */
const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};


/** функция показа ошибки */
const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.classList.add(config.errorClass);
  errorElement.textContent = errorMessage;
};

/** функция скрытия ошибки */
const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

/** функция проверки валидности поля для ввода */
const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

/** функция сообщает, есть ли в форме хоть один невалидный input */
const hasInvalidInput = inputList => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
};

/** функция переключения состояния кнопки в активное/неактивное */
const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};

/** слушатель input-ов - обеспечивает отзывчивость интерфейса, запрещает отправлять невалидную форму по Enter */
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
    inputElement.addEventListener('keypress', evt => {
      if ((evt.key === 'Enter')&&(hasInvalidInput(inputList))) {
        evt.preventDefault();
      };
    })
  });
};

/** функция включения валидации для всех форм */
const enableValidation = config => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => setEventListeners(formElement, config));
};

/** функция сброса предыдущей валидации при открытии popup-ов, без сброса полей формы */
const resetValidation = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  buttonElement.classList.add(config.inactiveButtonClass);
  inputList.forEach(inputElement =>
    hideInputError(formElement, inputElement, config)
  );
};


/** включение валидации на странице */
enableValidation(formValidationConfig);
