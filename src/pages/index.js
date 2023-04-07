import './index.css';
import {
  buttonEditProfile,
  buttonAddPlace,
  buttonEditAvatar,
  formProfile,
  inputNameProfile,
  inputJobProfile,
  formPlace,
  formAvatar,
  formValidationConfig,
  selectorPopupProfile,
  selectorUserName,
  selectorUserJob,
  selectorUserAvatar,
  selectorPopupView,
  selectorPopupAvatar,
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
import Api from '../components/Api.js';


/********** API **********/
/** экземляр класса*/
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-62',
  headers: {
    authorization: 'c024f246-bb18-41cb-8ec3-55e361b94019',
    'Content-Type': 'application/json'
  }
});


/********** ПОЛЬЗОВАТЕЛЬ **********/
/** экземляр класса: информация о пользователе*/
const userInfo = new UserInfo({
  selectorUserName: selectorUserName,
  selectorUserJob: selectorUserJob,
  selectorUserAvatar: selectorUserAvatar,
});

/** загружаем информацию о пользователе с сервера */
api.loadUserInfo().then(res => userInfo.setUserInfo(res));


/********** Попап с информацией о пользователе **********/
/** экземляр класса*/
const popupProfile = new PopupWithForm({
  selector: selectorPopupProfile,
  handleFormSubmit: (formData) => {
    const originalText = popupProfile.findButtonOriginalText()
    popupProfile.setButtonText('Сохранение...')
    api.updateUserInfo(formData)
      .then(newUserInfo => {
        userInfo.setUserInfo(newUserInfo);
      })
      .finally(() => {
        popupProfile.close();
        popupProfile.setButtonText(originalText);
      });
  }
});

/** вешаем слушатель */
popupProfile.setEventListeners();

/** включаем валидацию */
const profileFormValidator = new FormValidator(formValidationConfig, formProfile);
profileFormValidator.enableValidation();

/** обработчик кнопки Edit - открыть popup */
function handleButtonEditProfile() {
  const userMe = userInfo.getUserInfo();
  inputNameProfile.value = userMe.name;
  inputJobProfile.value = userMe.about;
  profileFormValidator.resetValidation();
  popupProfile.open();
};

/** слушатель кнопки Edit */
buttonEditProfile.addEventListener('click', handleButtonEditProfile);


/********** Попап для редактирования аватара **********/
/** экземляр класса */
const popupAvatar = new PopupWithForm({
  selector: selectorPopupAvatar,
  handleFormSubmit: (formData) => {
    const originalText = popupAvatar.findButtonOriginalText()
    popupAvatar.setButtonText('Сохранение...')
    api.updateUserAvatar(formData.linkAvatar)
      .then(newUserInfo => {
        userInfo.setUserInfo(newUserInfo);
      })
      .finally(() => {
        popupAvatar.close();
        popupAvatar.setButtonText(originalText);
      });
  }
});

/** вешаем слушатель */
popupAvatar.setEventListeners();

/** включаем валидацию */
const avatarFormValidator = new FormValidator(formValidationConfig, formAvatar);
avatarFormValidator.enableValidation();

/** обработчик кнопки Edit Avatar - открыть popup */
function handleButtonEditAvatar() {
  avatarFormValidator.resetValidation();
  popupAvatar.open();
};

/** слушатель кнопки Edit Avatar **/
buttonEditAvatar.addEventListener('click', handleButtonEditAvatar);


/********** КАРТОЧКИ МЕСТ **********/
/********** Попап для просмотра карточек **********/
/** экземляр класса */
const popupView = new PopupWithImage(selectorPopupView);

/** вешаем слушатель */
popupView.setEventListeners();


/********** Попап для подтверждения удаления **********/
/** функция для создания экземпляра класса */
function createPopupConfirm(card) {
  const selectorPopupConfirm = '#popup-confirm';
  const popupConfirm = new PopupWithForm({
    selector: selectorPopupConfirm,
    handleFormSubmit: () => {
      card.deleteCard();
      popupConfirm.close();
    }
  });
  popupConfirm.setEventListeners();
  popupConfirm.open()
  return popupConfirm;
}


/********** Карточки **********/
/** функция для создания экземпляра класса карточки места*/
function createCard(cardInfo) {
  return new Card(
    cardInfo,
    selectorCardTemplate,
    popupView.open.bind(popupView),
    createPopupConfirm,
    api.putLike.bind(api),
    api.deleteLike.bind(api),
    api.deleteCard.bind(api)
  );
}


/********** Секция с карточками **********/
/** экземляр класса*/
const cardList = new Section({
  renderer: (item) => {
    const userMe = userInfo.getUserInfo();
    const card = createCard(item);
    const cardElement = card.createPlace(userMe._id);
    cardList.addItem(cardElement)
  }},
  selectorCardSection);

/** заполнение 6 карточек из коробки */
api.loadInitialCards().then(cards => cardList.renderItems(cards.reverse()));


/********** Попап для добавления нового места **********/
/** экземляр класса */
const popupPlace = new PopupWithForm({
  selector: selectorPopupPlace,
  handleFormSubmit: (formData) => {
    const userMe = userInfo.getUserInfo();
    const originalText = popupPlace.findButtonOriginalText()
    popupPlace.setButtonText('Сохранение...')
    api.pushCard({ name: formData.namePlace, link: formData.linkPlace })
      .then(newCard => createCard(newCard))
      .then(card => card.createPlace(userMe._id))
      .then(cardElement => cardList.addItem(cardElement))
      .finally(() => {
        popupPlace.close();
        popupPlace.setButtonText(originalText);
      });
  }
});

/** вешаем слушатель */
popupPlace.setEventListeners();

/** вкючаем валидацию*/
const placeFormValidator = new FormValidator(formValidationConfig, formPlace);
placeFormValidator.enableValidation();

/** обработчик кнопки Add - открыть popup*/
function handleButtonAddPlace() {
  placeFormValidator.resetValidation();
  popupPlace.open();
};

/** слушатель кнопки Add **/
buttonAddPlace.addEventListener('click', handleButtonAddPlace);
