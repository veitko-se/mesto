import { initialPlaces } from './places.js';
import {
  titleProfile,
  subtitleProfile,
  buttonEditProfile,
  buttonAddPlace,
  containerPlaces,
  popupList,
  popupProfile,
  formProfile,
  inputNameProfile,
  inputJobProfile,
  popupPlace,
  formPlace,
  inputNamePlace,
  inputLinkPlace,
  formValidationConfig
} from './constants.js';
import { openPopup, closePopup } from './util.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';


/** включение валидации на странице для каждой из форм*/
const profileFormValidator = new FormValidator(formValidationConfig, formProfile);
const placeFormValidator = new FormValidator(formValidationConfig, formPlace);
profileFormValidator.enableValidation();
placeFormValidator.enableValidation();

/** обработчик события - открыть popup для редактирования профиля */
function handleButtonEditProfile() {
  inputNameProfile.value = titleProfile.textContent;
  inputJobProfile.value = subtitleProfile.textContent;
  profileFormValidator.resetValidation();
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
  placeFormValidator.resetValidation();
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
  const inputsPlace = {   //создаем объект для передачи его на вход функции renderPlace()
    name: inputNamePlace.value,
    link: inputLinkPlace.value
  };
  renderPlace(inputsPlace, '#element-template');
  closePopup(popupPlace);
  //после Submit не сбрасываем форму, т.к. сбросим ее при открытии
};

/** обработчик события - закрыть popup при клике на оверлей или крестик*/
function handleMousedownForClose(evt, popup) {
  if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-btn')) {
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
