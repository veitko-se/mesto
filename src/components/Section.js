/** Класс Секция */
export default class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  /** публичный метод - генерация элементов секции с помощью передаваемой в конструктор функции */
  renderItems(items) {
    items.forEach(item => this._renderer(item))
  }

  /** публичный метод - добавление элемента секции в начало списка */
  addItem(element) {
    this._container.prepend(element);
  }
}
