/** раздел Профиль + кнопка Add */
const titleProfile = document.querySelector('.profile__info-title');
const subtitleProfile = document.querySelector('.profile__info-subtitle');
const buttonEditProfile = document.querySelector('.profile__edit-btn');
const buttonAddPlace = document.querySelector('.profile__add-btn');

/** раздел Места */
const containerPlaces = document.querySelector('.elements');

/** popup-ы */
const popupList = Array.from(document.querySelectorAll('.popup'));

const popupProfile = document.querySelector('#popup-profile');
const formProfile = document.forms.profile;
const inputNameProfile = formProfile.elements.titleProfile;
const inputJobProfile = formProfile.elements.subtitleProfile;

const popupPlace = document.querySelector('#popup-place');
const formPlace = document.forms.place;
const inputNamePlace = formPlace.elements.namePlace;
const inputLinkPlace = formPlace.elements.linkPlace;

const popupView = document.querySelector('#popup-photo');
const titleView = popupView.querySelector('.popup__title_type_photo');
const imageView = popupView.querySelector('.popup__photo');

/** список настроек форм, передается в экземпляр класса валидации */
const formValidationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export {
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
  popupView,
  titleView,
  imageView,
  formValidationConfig
 }
