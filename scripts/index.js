import { initialPlaces } from './places.js';
import {
  buttonEditProfile,
  buttonAddPlace,
  formProfile,
  inputNameProfile,
  inputJobProfile,
  formPlace,
  formValidationConfig,
  selectorPopupProfile,
  selectorUserName,
  selectorUserJob,
  selectorPopupView,
  selectorCardTemplate,
  selectorPopupPlace,
  selectorCardSection
} from './constants.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import UserInfo from './UserInfo.js';


/** Объявление переменных */
/** 1. Валидация */
/** экземляр класса: валидация для формы с информацией о пользователе*/
const profileFormValidator = new FormValidator(formValidationConfig, formProfile);
/** экземляр класса: валидация для формы добавления нового места*/
const placeFormValidator = new FormValidator(formValidationConfig, formPlace);

/** 2. Пользователь */
/** экземляр класса: информация о пользователе*/
const userInfo = new UserInfo({
  selectorUserName: selectorUserName,
  selectorUserJob: selectorUserJob
});
/** экземляр класса: попап с информацией о пользователе*/
const popupProfile = new PopupWithForm({
  selector: selectorPopupProfile,
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo(formData);
  }
});

/** 3. Карточки мест */
/** экземляр класса: попапа для открытия карточки места*/
const popupView = new PopupWithImage(selectorPopupView);
/** экземляр класса: секция с карточками мест*/
const cardList = new Section({
  renderer: (item) => {
    const card = new Card(item, selectorCardTemplate, popupView.open.bind(popupView));
    const cardElement = card.createPlace();
    cardList.addItem(cardElement);
  }
}, selectorCardSection);
/** экземляр класса: попап для добавления нового места*/
const popupPlace = new PopupWithForm({
  selector: selectorPopupPlace,
  handleFormSubmit: (formData) => {
    cardList.renderItems([{name: formData.namePlace, link: formData.linkPlace}]);
  }
});


/** Логика страницы */
/** включение валидации на странице для каждой из форм*/
profileFormValidator.enableValidation();
placeFormValidator.enableValidation();

/** обработчик события - открыть popup для добавления нового места */
function handleButtonAddPlace() {
  placeFormValidator.resetValidation();
  popupPlace.open();
};

/** обработчик события - открыть popup для редактирования профиля */
function handleButtonEditProfile() {
  const user = userInfo.getUserInfo();
  inputNameProfile.value = user.name;
  inputJobProfile.value = user.job;
  profileFormValidator.resetValidation();
  popupProfile.open();
};

/** заполнение 6 карточек из коробки */
cardList.renderItems(initialPlaces);


/**Слушатели */
/** слушатели popup-ов */
popupProfile.setEventListeners();
popupView.setEventListeners();
popupPlace.setEventListeners();

/** слушатель кнопки Edit */
buttonEditProfile.addEventListener('click', handleButtonEditProfile);

/** слушатель кнопки Add **/
buttonAddPlace.addEventListener('click', handleButtonAddPlace);
