import Popup from './Popup.js';

/** Дочерний класс попапа с картинкой */
export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._title = this._popup.querySelector('.popup__title_type_photo');
    this._image = this._popup.querySelector('.popup__photo');
  }

  /** перезапись родительского метода open */
  open({name, link}) {
    this._title.textContent = name;
    this._image.src = link;
    this._image.alt = name;
    super.open();
  }
}
