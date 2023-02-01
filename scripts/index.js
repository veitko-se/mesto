// раздел Профиль + кнопка Add
const titleProfile = document.querySelector('.profile__info-title');
const subtitleProfile = document.querySelector('.profile__info-subtitle');
const editProfileBtn = document.querySelector('.profile__edit-btn');
const addPlaceBtn = document.querySelector('.profile__add-btn');

// popup-ы
const popupProfile = document.querySelector('#popup-profile');
const formProfile = document.querySelector('#form-profile');
const inputNameProfile = formProfile.querySelector('#input-profile-name');
const inputJobProfile = formProfile.querySelector('#input-profile-job');

const closePopupBtns = document.querySelectorAll('.popup__close-btn');

const popupPlace = document.querySelector('#popup-place');
const formPlace = document.querySelector('#form-place');

//раздел Места
const containerPlaces = document.querySelector('.elements');
const initialPlaces = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


// функция открытия Popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// функция закрытия Popup
function closePopup(evt) {
  const popup = evt.target.closest('.popup');
  popup.classList.remove('popup_opened');
}

// Функция редактирования информации профиля
function editProfile(evt) {
  evt.preventDefault();
  titleProfile.textContent = inputNameProfile.value;
  subtitleProfile.textContent = inputJobProfile.value;
  closePopup(evt);
}

//функция добавления карточек со всеми их интерактивными элементами
function addPlace(name, link) {
  const templatePlace = document.querySelector('#element-template').content;
  const cardPlace = templatePlace.querySelector('.element').cloneNode(true);
  const deletePlaceBtn = cardPlace.querySelector('.element__trash-btn');
  const likePlaceBtn = cardPlace.querySelector('.element__like-btn');
  const imagePlace = cardPlace.querySelector('.element__image');
  const popupPhoto = document.querySelector('#popup-photo');

  cardPlace.querySelector('.element__text').textContent = name;
  imagePlace.src = link;
  imagePlace.alt = name;

  containerPlaces.prepend(cardPlace);

  imagePlace.addEventListener('click', () => {
    popupPhoto.querySelector('.popup__title_type_photo').textContent = name;
    popupPhoto.querySelector('.popup__photo').src = link;
    popupPhoto.querySelector('.popup__photo').alt = name;
    openPopup(popupPhoto);
  });
  deletePlaceBtn.addEventListener('click', () => cardPlace.remove());
  likePlaceBtn.addEventListener('click', evt =>
    evt.target.classList.toggle('element__like-btn_active')
  );
};

// функция генерации карточки из заполненных input по событию
function renderPlace(evt) {
  evt.preventDefault();
  const namePlace = formPlace.querySelector('#input-place-name');
  const linkPlace = formPlace.querySelector('#input-place-link');

  addPlace(namePlace.value, linkPlace.value);
  closePopup(evt);

  namePlace.value = '';
  linkPlace.value = '';
}


//6 карточек из коробки
initialPlaces.forEach(function (item) {
  addPlace(item.name, item.link);
});


// слушатель кнопок Close
closePopupBtns.forEach(function (item) {
  item.addEventListener('click', evt => closePopup(evt));
});
// слушатель кнопки Edit
editProfileBtn.addEventListener('click', () => {
  openPopup(popupProfile);
  inputNameProfile.value = titleProfile.textContent;
  inputJobProfile.value = subtitleProfile.textContent;
});
// слушатель кнопки Add
addPlaceBtn.addEventListener('click', () => openPopup(popupPlace));
// слушатель submit в форме Profile
formProfile.addEventListener('submit', evt => editProfile(evt, popupProfile));
// слушатель submit в форме Place
formPlace.addEventListener('submit', evt => renderPlace(evt));
