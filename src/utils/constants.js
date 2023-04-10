/** кнопки на странице */
const buttonEditProfile = document.querySelector('.profile__edit-btn');
const buttonAddPlace = document.querySelector('.profile__add-btn');
const buttonEditAvatar = document.querySelector('.profile__avatar-btn');

/** формы */
const formPlace = document.forms.place;
const formProfile = document.forms.profile;
const formAvatar = document.forms.avatar;

/** селекторы элементов страницы */
const selectorPopupProfile = '#popup-profile';
const selectorUserName = '.profile__info-title';
const selectorUserJob ='.profile__info-subtitle';
const selectorUserAvatar ='.profile__avatar';

const selectorPopupView = '#popup-photo';

const selectorPopupAvatar = '#popup-avatar';

const selectorPopupConfirm = '#popup-confirm';

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
  buttonEditAvatar,
  formProfile,
  formPlace,
  formAvatar,
  formValidationConfig,
  selectorPopupProfile,
  selectorUserName,
  selectorUserJob,
  selectorUserAvatar,
  selectorPopupView,
  selectorPopupAvatar,
  selectorPopupConfirm,
  selectorCardTemplate,
  selectorPopupPlace,
  selectorCardSection
 }
