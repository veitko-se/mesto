/** раздел Профиль + кнопка Add */
const titleProfile = document.querySelector('.profile__info-title');
const subtitleProfile = document.querySelector('.profile__info-subtitle');
const buttonEditProfile = document.querySelector('.profile__edit-btn');
const buttonAddPlace = document.querySelector('.profile__add-btn');

/** раздел Места */
const containerPlaces = document.querySelector('.elements');
const templatePlace = document.querySelector('#element-template').content;

/** popup-ы */
const buttonsClosePopup = document.querySelectorAll('.popup__close-btn');

const popupProfile = document.querySelector('#popup-profile');
const formProfile = document.querySelector('#form-profile');
const inputNameProfile = formProfile.querySelector('#input-profile-name');
const inputJobProfile = formProfile.querySelector('#input-profile-job');

const popupView = document.querySelector('#popup-photo');
const titleView = popupView.querySelector('.popup__title_type_photo');
const imageView = popupView.querySelector('.popup__photo');

const popupPlace = document.querySelector('#popup-place');
const formPlace = document.querySelector('#form-place');
const namePlace = formPlace.querySelector('#input-place-name');
const linkPlace = formPlace.querySelector('#input-place-link');


/** функция открытия Popup */
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

/** функция закрытия Popup */
function closePopup(popup) {
  popup.classList.remove('popup_opened');
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
function addPlace(name, link) {
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
  buttonLikePlace.addEventListener('click', evt => handleClickBtnLike(evt));

  return cardPlace;
};

/** функция генерации карточки в нужном месте страницы */
function renderPlace(name, link) {
  containerPlaces.prepend(addPlace(name, link));
};

/** обработчик события - создание карточки из заполненных input */
function handleSubmitFormPlace(evt) {
  evt.preventDefault();

  renderPlace(namePlace.value, linkPlace.value);
  closePopup(popupPlace);

  namePlace.value = '';
  linkPlace.value = '';
};


/** заполнение 6 карточек из коробки */
initialPlaces.forEach(function (item) {
  renderPlace(item.name, item.link);
});


/** слушатель кнопок Close */
buttonsClosePopup.forEach(function (item) {
  item.addEventListener('click', evt => {
    const popup = evt.target.closest('.popup');
    closePopup(popup);
  });
});

/** слушатель кнопки Edit */
buttonEditProfile.addEventListener('click', () => {
  inputNameProfile.value = titleProfile.textContent;
  inputJobProfile.value = subtitleProfile.textContent;
  openPopup(popupProfile);
});

/** слушатель кнопки Add **/
buttonAddPlace.addEventListener('click', () => openPopup(popupPlace));

/** слушатель submit в форме Profile */
formProfile.addEventListener('submit', evt => handleSubmitFormProfile(evt, popupProfile));

/** слушатель submit в форме Place */
formPlace.addEventListener('submit', evt => handleSubmitFormPlace(evt));
