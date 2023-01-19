// Открытие Popup
let editProfileBtn = document.querySelector('.profile__edit-btn');
let popup = document.querySelector('.popup');

editProfileBtn.addEventListener('click', function(evt) {
  evt.preventDefault();
  popup.classList.add('popup_opened');
  }) ;


// Закрытие Popup
let closePopupBtn = document.querySelector('.popup__close-btn');

closePopupBtn.addEventListener('click', function(evt) {
  evt.preventDefault();
  popup.classList.remove('popup_opened');
  }) ;


// Редактирование имени и информации о себе (до ближайшей перезагрузки страницы)
// -находим форму и ее поля в DOM
let formElement = document.querySelector('form');
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_job');

// -обработчик «отправки» формы
function handleFormSubmit (evt) {
    evt.preventDefault(); // Отменяем стандартную отправку формы, чтобы определить свою логику отправки.
    // -элементы, в к-рые должны быть вставлены значения полей
    let titleProfile = document.querySelector('.profile__info-title');
    let subtitleProfile = document.querySelector('.profile__info-subtitle');
    // -вставить в выбранные элементы новые значения
    titleProfile.textContent = nameInput.value;
    subtitleProfile.textContent = jobInput.value;
    // -закрыть popup
    popup.classList.remove('popup_opened');
}

// -прикрепляем обработчик к форме
formElement.addEventListener('submit', handleFormSubmit);

