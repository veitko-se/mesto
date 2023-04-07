import './index.css';
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
  selectorUserAvatar,
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
import PopupConfirm from '../components/PopupConfirm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-62',
  headers: {
    authorization: 'c024f246-bb18-41cb-8ec3-55e361b94019',
    'Content-Type': 'application/json'
  }
});

function createPopupConfirm(card) {
  const selectorPopupConfirm = '#popup-confirm';
  const popupConfirm = new PopupConfirm({
    selector: selectorPopupConfirm,
    handleFormSubmit: () => {
      card.deleteCard()
    }
  });
  popupConfirm.setEventListeners();
  popupConfirm.open()
  return popupConfirm;
}

/** Объявление переменных */
/** 1. Валидация */
/** экземляр класса: валидация для формы с информацией о пользователе*/
const profileFormValidator = new FormValidator(formValidationConfig, formProfile);
/** экземляр класса: валидация для формы добавления нового места*/
const placeFormValidator = new FormValidator(formValidationConfig, formPlace);

const formAvatar = document.forms.avatar;
const avatarFormValidator = new FormValidator(formValidationConfig, formAvatar);

/** 2. Пользователь */
/** экземляр класса: информация о пользователе*/
const userInfo = new UserInfo({
  selectorUserName: selectorUserName,
  selectorUserJob: selectorUserJob,
  selectorUserAvatar: selectorUserAvatar,
});
// /** загружаем информацию о пользователе с сервера */
api.loadUserData().then(res => userInfo.setUserInfo(res));

/** экземляр класса: попап с информацией о пользователе*/
const popupProfile = new PopupWithForm({
  selector: selectorPopupProfile,
  handleFormSubmit: (formData) => {
    const originalText = popupProfile.findButtonOriginalText()
    popupProfile.setButtonText('Сохранение...')
    api.updateUserInfo(formData)
      .then(updatedUSerData => {
        userInfo.setUserInfo(updatedUSerData);
      })
      .finally(() => {
        popupProfile.close();
        popupProfile.setButtonText(originalText);
      });
  }
});

function createCard(cardInfo) {
  return new Card(
    cardInfo,
    selectorCardTemplate,
    popupView.open.bind(popupView),
    api.putLike.bind(api),
    api.deleteLike.bind(api),
    createPopupConfirm,
    api.deleteCard.bind(api)
  );
}

/** 3. Карточки мест */
/** экземляр класса: попап для открытия карточки места*/
const popupView = new PopupWithImage(selectorPopupView);
/** экземляр класса: секция с карточками мест*/
const cardList = new Section({
  renderer: (item) => {
    const userMe = userInfo.getUserInfo();
    const card = createCard(item);
    const cardElement = card.createPlace(userMe._id);
    cardList.addItem(cardElement)
  }
},
  selectorCardSection);
/** экземляр класса: попап для добавления нового места*/
const popupPlace = new PopupWithForm({
  selector: selectorPopupPlace,
  handleFormSubmit: (formData) => {
    const userMe = userInfo.getUserInfo();
    const originalText = popupPlace.findButtonOriginalText()
    popupPlace.setButtonText('Сохранение...')
    api.pushCard({ name: formData.namePlace, link: formData.linkPlace })
      .then(newCard => {return createCard(newCard)})
      .then(card => card.createPlace(userMe._id))
      .then(cardElement => {
        cardList.addItem(cardElement);
      })
      .finally(() => {
        popupPlace.close();
        popupPlace.setButtonText(originalText);
      });
  }
});

/** Логика страницы */
/** включение валидации на странице для каждой из форм*/
profileFormValidator.enableValidation();
placeFormValidator.enableValidation();
avatarFormValidator.enableValidation();

/** обработчик события - открыть popup для добавления нового места */
function handleButtonAddPlace() {
  placeFormValidator.resetValidation();
  popupPlace.open();
};

const selectorPopupAvatar = '#popup-avatar'
const popupAvatar = new PopupWithForm({
  selector: selectorPopupAvatar,
  handleFormSubmit: (formData) => {
    const originalText = popupAvatar.findButtonOriginalText()
    popupAvatar.setButtonText('Сохранение...')
    api.updateUserAvatar(formData.linkAvatar)
      .then(newUserMe => {
        userInfo.setUserInfo(newUserMe);
      })
      .finally(() => {
        popupAvatar.close();
        popupAvatar.setButtonText(originalText);
      });
  }
})
function handleButtonEditAvatar() {
  avatarFormValidator.resetValidation();
  popupAvatar.open();
};

/** обработчик события - открыть popup для редактирования профиля */
function handleButtonEditProfile() {
  const userMe = userInfo.getUserInfo();
  inputNameProfile.value = userMe.name;
  inputJobProfile.value = userMe.about;
  profileFormValidator.resetValidation();
  popupProfile.open();
};

/** заполнение 6 карточек из коробки */
api.loadInitialCards().then(cards => cardList.renderItems(cards.reverse()));


/**Слушатели */
/** слушатели popup-ов */
popupProfile.setEventListeners();
popupView.setEventListeners();
popupPlace.setEventListeners();
popupAvatar.setEventListeners();

/** слушатель кнопки Edit */
buttonEditProfile.addEventListener('click', handleButtonEditProfile);

/** слушатель кнопки Add **/
buttonAddPlace.addEventListener('click', handleButtonAddPlace);

const buttonEditAvatar = document.querySelector('.profile__avatar-btn');
buttonEditAvatar.addEventListener('click', handleButtonEditAvatar);

