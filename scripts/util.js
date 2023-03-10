/** обработчик события - закрыть popup при нажатии Esc */
function handleKeydownEscForClose(evt) {
  if(evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
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

export { openPopup, closePopup };
