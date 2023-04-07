/** кнопки на странице */
const buttonEditProfile = document.querySelector('.profile__edit-btn');
const buttonAddPlace = document.querySelector('.profile__add-btn');

/** формы */
const formPlace = document.forms.place;
const formProfile = document.forms.profile;
const inputNameProfile = formProfile.elements.titleProfile;
const inputJobProfile = formProfile.elements.subtitleProfile;

/** селекторы элементов страницы */
const selectorPopupProfile = '#popup-profile';
const selectorUserName = '.profile__info-title';
const selectorUserJob ='.profile__info-subtitle';
const selectorUserAvatar ='.profile__avatar';

const selectorPopupView = '#popup-photo';

const selectorPopupPlace = '#popup-place';
const selectorCardTemplate = '#element-template';
const selectorCardSection = '.elements';

/** список настроек форм, передается в экземпляр класса валидации */
const formValidationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export {
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
 }
