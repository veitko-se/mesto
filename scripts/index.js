/** раздел Профиль + кнопка Add */
const titleProfile = document.querySelector('.profile__info-title');
const subtitleProfile = document.querySelector('.profile__info-subtitle');
const buttonEditProfile = document.querySelector('.profile__edit-btn');
const buttonAddPlace = document.querySelector('.profile__add-btn');

/** раздел Места */
const containerPlaces = document.querySelector('.elements');

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
const inputsPlace = {};
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






class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._element = ''
  }


  /** функция получения шаблона */
  _getTemplate() {
    const cardPlace = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardPlace;
  }


  /** обработчик события - лайк */
  _handleClickBtnLike(evt) {
    evt.target.classList.toggle('element__like-btn_active');
  };


  /** обработчик события - клик по картинке */
  _handleClickImagePlace() {
    titleView.textContent = this._name;
    imageView.src = this._link;
    imageView.alt = this._name;
    openPopup(popupView);
  };


  /** обработчик события - лайк */
  _handleClickBtnTrash() {
    this._element.remove();
  };


  /** слушатели для карточки */
  _setEventListeners() {
    const buttonDeletePlace = this._element.querySelector('.element__trash-btn');
    const buttonLikePlace = this._element.querySelector('.element__like-btn');
    const imagePlace = this._element.querySelector('.element__image');

    buttonDeletePlace.addEventListener('click', () => this._handleClickBtnTrash());
    buttonLikePlace.addEventListener('click', this._handleClickBtnLike);
    imagePlace.addEventListener('click', () => this._handleClickImagePlace());
  };


  /** функция формирования карточек со всеми их интерактивными элементами */
  createPlace() {
    this._element = this._getTemplate();
    const titlePlace = this._element.querySelector('.element__text');
    const imagePlace = this._element.querySelector('.element__image');

    titlePlace.textContent = this._name;
    imagePlace.src = this._link;
    imagePlace.alt = this._name;

    this._setEventListeners();

    return this._element;
  };
}







/** функция генерации карточки в нужном месте страницы */
function renderPlace(data, templateSelector) {
  const card = new Card(data, templateSelector);
  const cardPlace = card.createPlace();
  containerPlaces.prepend(cardPlace);
};


/** заполнение 6 карточек из коробки */
initialPlaces.forEach((item) => {
  renderPlace(item, '#element-template');
});


/** обработчик события - создание карточки из заполненных input */
function handleSubmitFormPlace(evt) {
  evt.preventDefault();

  inputsPlace.name = inputNamePlace.value;
  inputsPlace.link = inputLinkPlace.value;

  renderPlace(inputsPlace, '#element-template');

  closePopup(popupPlace); //после Submit не сбрасываем форму, т.к. сбросим ее при открытии

  inputsPlace.name = '';
  inputsPlace.link = '';
};





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
