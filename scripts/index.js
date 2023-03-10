import { initialPlaces } from './places.js';
import { openPopup, closePopup } from './util.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';


/** раздел Профиль + кнопка Add */
const titleProfile = document.querySelector('.profile__info-title');
const subtitleProfile = document.querySelector('.profile__info-subtitle');
const buttonEditProfile = document.querySelector('.profile__edit-btn');
const buttonAddPlace = document.querySelector('.profile__add-btn');

/** раздел Места */
const containerPlaces = document.querySelector('.elements');

/** popup-ы */
const popupList = Array.from(document.querySelectorAll('.popup'));
const formList = Array.from(document.querySelectorAll('.popup__form'));

const popupProfile = document.querySelector('#popup-profile');
const formProfile = document.forms.profile;
const inputNameProfile = formProfile.elements.titleProfile;
const inputJobProfile = formProfile.elements.subtitleProfile;

const popupPlace = document.querySelector('#popup-place');
const formPlace = document.forms.place;
const inputNamePlace = formPlace.elements.namePlace;
const inputLinkPlace = formPlace.elements.linkPlace;

/** список настроек форм, передается в экземпляр класса валидации */
const formValidationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

/** включение валидации на странице для каждой из форм*/
formList.forEach((formElement) => {
  const formValidator = new FormValidator(formValidationConfig, formElement);
  formValidator.enableValidation();
});

/** обработчик события - открыть popup для редактирования профиля */
function handleButtonEditProfile() {
  inputNameProfile.value = titleProfile.textContent;
  inputJobProfile.value = subtitleProfile.textContent;
  const formValidator = new FormValidator(formValidationConfig, formProfile);
  formValidator.resetValidation();
  openPopup(popupProfile);
};

/** обработчик события - обновление информации профиля из заполненных input */
function handleSubmitFormProfile(evt) {
  evt.preventDefault();
  titleProfile.textContent = inputNameProfile.value;
  subtitleProfile.textContent = inputJobProfile.value;
  closePopup(popupProfile);
}

/** обработчик события - открыть popup для добавления нового места */
function handleButtonAddPlace() {
  formPlace.reset();  //сбрасываем форму при каждом открытии, т.к. нет кнопки "очистить"
  const formValidator = new FormValidator(formValidationConfig, formPlace);
  formValidator.resetValidation();
  openPopup(popupPlace);
};

/** функция генерации карточки в нужном месте страницы */
function renderPlace(data, templateSelector) {
  const card = new Card(data, templateSelector);
  const cardPlace = card.createPlace();
  containerPlaces.prepend(cardPlace);
};

/** заполнение 6 карточек из коробки */
initialPlaces.forEach((item) => {
  renderPlace(item, '#element-template');
});

/** обработчик события - создание карточки из заполненных input */
function handleSubmitFormPlace(evt) {
  evt.preventDefault();
  const inputsPlace = {
    name: inputNamePlace.value,
    link: inputLinkPlace.value
  };
  renderPlace(inputsPlace, '#element-template');
  closePopup(popupPlace); //после Submit не сбрасываем форму, т.к. сбросим ее при открытии
  inputsPlace.name = '';
  inputsPlace.link = '';
};

/** обработчик события - закрыть popup при клике на оверлей или крестик*/
function handleMousedownForClose(evt, popup) {
  const overlay = evt.target.closest('.popup');
  const buttonClosePopup = evt.target.closest('.popup__close-btn');
  if ((evt.target === overlay)||(evt.target === buttonClosePopup)) {
    closePopup(popup);
  };
};


/** слушатель popup-ов для событий закрытия по крестику и оверлею */
popupList.forEach(popup => {
  popup.addEventListener('mousedown', evt => handleMousedownForClose(evt, popup));
});

/** слушатель кнопки Edit */
buttonEditProfile.addEventListener('click', handleButtonEditProfile);

/** слушатель кнопки Add **/
buttonAddPlace.addEventListener('click', handleButtonAddPlace);

/** слушатель submit в форме Profile */
formProfile.addEventListener('submit', handleSubmitFormProfile);

/** слушатель submit в форме Place */
formPlace.addEventListener('submit', handleSubmitFormPlace);
