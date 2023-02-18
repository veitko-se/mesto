/** раздел Профиль + кнопка Add */
const titleProfile = document.querySelector('.profile__info-title');
const subtitleProfile = document.querySelector('.profile__info-subtitle');
const buttonEditProfile = document.querySelector('.profile__edit-btn');
const buttonAddPlace = document.querySelector('.profile__add-btn');

/** раздел Места */
const containerPlaces = document.querySelector('.elements');
const templatePlace = document.querySelector('#element-template').content;

/** popup-ы */
const popups = document.querySelectorAll('.popup');

const popupProfile = document.querySelector('#popup-profile');
const formProfile = document.forms.profile;
const inputNameProfile = formProfile.elements.titleProfile;
const inputJobProfile = formProfile.elements.subtitleProfile;

const popupView = document.querySelector('#popup-photo');
const titleView = popupView.querySelector('.popup__title_type_photo');
const imageView = popupView.querySelector('.popup__photo');

const popupPlace = document.querySelector('#popup-place');
const formPlace = document.forms.place;
const inputNamePlace = formPlace.elements.namePlace;
const inputLinkPlace = formPlace.elements.linkPlace;


/** обработчик события - закрыть popup при нажатии Esc */
function handleKeydownEscForClose(evt) {
  if(evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
};

/** обработчик события - закрыть popup при клике на оверлей или крестик*/
function handleMousedownForClose(evt, popup) {
  const overlay = evt.target.closest('.popup');
  const buttonClosePopup = evt.target.closest('.popup__close-btn');
  if ((evt.target === overlay)||(evt.target === buttonClosePopup)) {
    closePopup(popup);
  };
};

/** функция открытия Popup */
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleKeydownEscForClose);
}

/** функция закрытия Popup */
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleKeydownEscForClose);
}

/** обработчик события - обновление информации профиля из заполненных input */
function handleSubmitFormProfile(evt) {
  evt.preventDefault();
  titleProfile.textContent = inputNameProfile.value;
  subtitleProfile.textContent = inputJobProfile.value;
  closePopup(popupProfile);
}

/** обработчик события - лайк */
function handleClickBtnLike(evt) {
  evt.target.classList.toggle('element__like-btn_active');
};

/** функция формирования карточек со всеми их интерактивными элементами */
function createPlace(name, link) {
  const cardPlace = templatePlace.querySelector('.element').cloneNode(true);
  const buttonDeletePlace = cardPlace.querySelector('.element__trash-btn');
  const buttonLikePlace = cardPlace.querySelector('.element__like-btn');
  const imagePlace = cardPlace.querySelector('.element__image');
  const titlePlace = cardPlace.querySelector('.element__text');

  titlePlace.textContent = name;
  imagePlace.src = link;
  imagePlace.alt = name;

  imagePlace.addEventListener('click', () => {
    titleView.textContent = name;
    imageView.src = link;
    imageView.alt = name;
    openPopup(popupView);
  });
  buttonDeletePlace.addEventListener('click', () => cardPlace.remove());
  buttonLikePlace.addEventListener('click', handleClickBtnLike);

  return cardPlace;
};

/** функция генерации карточки в нужном месте страницы */
function renderPlace(name, link) {
  containerPlaces.prepend(createPlace(name, link));
};

/** обработчик события - создание карточки из заполненных input */
function handleSubmitFormPlace(evt) {
  evt.preventDefault();
  renderPlace(inputNamePlace.value, inputLinkPlace.value);
  closePopup(popupPlace); //после Submit не сбрасываем форму, т.к. сбросим ее при открытии
};

/** обработчик события - открыть popup для редактирования профиля */
function handleButtonEditProfile() {
  inputNameProfile.value = titleProfile.textContent;
  inputJobProfile.value = subtitleProfile.textContent;
  resetValidation(formProfile, formValidationConfig);
  openPopup(popupProfile);
};

/** обработчик события - открыть popup для добавления нового места */
function handleButtonAddPlace() {
  formPlace.reset();  //сбрасываем форму при каждом открытии, т.к. нет кнопки "очистить"
  resetValidation(formPlace, formValidationConfig);
  openPopup(popupPlace);
};


/** заполнение 6 карточек из коробки */
initialPlaces.forEach(item =>
  renderPlace(item.name, item.link)
);


/** слушатель popup-ов для событий закрытия по крестику и оверлею */
popups.forEach(popup => {
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
