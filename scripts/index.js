// находим форму и ее поля в DOM
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_job');
// данные из профиля
let titleProfile = document.querySelector('.profile__info-title');
let subtitleProfile = document.querySelector('.profile__info-subtitle');
// popup и кнопки edit, close
let editProfileBtn = document.querySelector('.profile__edit-btn');
let popup = document.querySelector('.popup');
let closePopupBtn = document.querySelector('.popup__close-btn');

// функция открытия Popup
function openPopup () {
  popup.classList.add('popup_opened');
  nameInput.value = titleProfile.textContent;
  jobInput.value = subtitleProfile.textContent;
}

// функция закрытия Popup
function closePopup () {
  popup.classList.remove('popup_opened');
}

// Функция редактирования информации профиля
function handleFormSubmit (evt) {
    evt.preventDefault(); // отменяем стандартную отправку формы, чтобы определить свою логику отправки.
    titleProfile.textContent = nameInput.value;
    subtitleProfile.textContent = jobInput.value;
    closePopup(); // после сохранения закрыть popup
}

// слушатель кнопки Close
closePopupBtn.addEventListener('click', closePopup);
// слушатель кнопки Edit
editProfileBtn.addEventListener('click', openPopup);
// слушатель submit в форме
formElement.addEventListener('submit', handleFormSubmit);
