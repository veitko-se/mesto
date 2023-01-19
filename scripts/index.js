// находим форму и ее поля в DOM
let formElement = document.querySelector('form');
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_job');
// данные из профиля
let titleProfile = document.querySelector('.profile__info-title');
let subtitleProfile = document.querySelector('.profile__info-subtitle');
// popup и кнопки edit, close
let editProfileBtn = document.querySelector('.profile__edit-btn');
let popup = document.querySelector('.popup');
let closePopupBtn = document.querySelector('.popup__close-btn');

// Открытие Popup
editProfileBtn.addEventListener('click', function(evt) {
  evt.preventDefault();
  popup.classList.add('popup_opened');
  nameInput.value = titleProfile.textContent;
  jobInput.value = subtitleProfile.textContent;
  }) ;

// Закрытие Popup
closePopupBtn.addEventListener('click', function(evt) {
  evt.preventDefault();
  popup.classList.remove('popup_opened');
  }) ;


// Редактирование информации профиля
// обработчик «отправки» формы
function handleFormSubmit (evt) {
    evt.preventDefault(); // Отменяем стандартную отправку формы, чтобы определить свою логику отправки.
    titleProfile.textContent = nameInput.value;
    subtitleProfile.textContent = jobInput.value;
    // закрыть popup
    popup.classList.remove('popup_opened');
}
// прикрепляем обработчик к форме
formElement.addEventListener('submit', handleFormSubmit);
