import { initialPlaces } from '../utils/places.js';
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
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';


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
/** функция для добавления карточки */
const renderCard = (item) => {
  const card = new Card(item, selectorCardTemplate, popupView.open.bind(popupView));
  const cardElement = card.createPlace();
  cardList.addItem(cardElement);
};
/** экземляр класса: попап для открытия карточки места*/
const popupView = new PopupWithImage(selectorPopupView);
/** экземляр класса: секция с карточками мест*/
const cardList = new Section({renderer: renderCard}, selectorCardSection);
/** экземляр класса: попап для добавления нового места*/
const popupPlace = new PopupWithForm({
  selector: selectorPopupPlace,
  handleFormSubmit: (formData) => {
    renderCard({name: formData.namePlace, link: formData.linkPlace}); //renderCard() использует метод addItem()
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
