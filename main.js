(()=>{"use strict";var e=document.querySelector(".profile__edit-btn"),t=document.querySelector(".profile__add-btn"),n=document.querySelector(".profile__avatar-btn"),r=document.forms.place,o=document.forms.profile,i=document.forms.avatar,u={inputSelector:".popup__input",submitButtonSelector:".popup__save-btn",inactiveButtonClass:"popup__save-btn_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function l(e){return l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},l(e)}function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==l(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==l(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r.key),"symbol"===l(o)?o:String(o)),r)}var o}var s=function(){function e(t,n,r,o,i,u){var l=t.name,a=t.link,s=t.likes,c=t.owner,f=t._id;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.name=l,this.link=a,this._likes=s,this._owner=c,this._idCard=f,this._templateSelector=n,this._handleClickImagePlace=r,this._handleClickBtnTrash=o,this._putLike=i,this._deleteLike=u,this._handleClickBtnLike=this._handleClickBtnLike.bind(this),this._element=this._getTemplate(),this._elementImage=this._element.querySelector(".element__image"),this._elementTitle=this._element.querySelector(".element__text"),this._elementBtnTrash=this._element.querySelector(".element__trash-btn"),this._elementBtnLike=this._element.querySelector(".element__like-btn"),this._elementCountLike=this._element.querySelector(".element__like-count"),this._toggled=!1}var t,n;return t=e,(n=[{key:"_getTemplate",value:function(){return document.querySelector(this._templateSelector).content.querySelector(".element").cloneNode(!0)}},{key:"_updateLikeStatus",value:function(e,t){this._likes=e.likes,this._elementCountLike.textContent=this._likes.length,this._toggled=t}},{key:"_handleClickBtnLike",value:function(){var e=this;this._toggled?this._deleteLike(this._idCard).then((function(t){return e._updateLikeStatus(t,!1)})).then(this._elementBtnLike.classList.remove("element__like-btn_active")).catch((function(e){return console.log("Ошибка: ".concat(e))})):this._putLike(this._idCard).then((function(t){return e._updateLikeStatus(t,!0)})).then(this._elementBtnLike.classList.add("element__like-btn_active")).catch((function(e){return console.log("Ошибка: ".concat(e))}))}},{key:"_setEventListeners",value:function(){var e=this;this._elementBtnTrash.addEventListener("click",(function(){return e._handleClickBtnTrash(e._idCard,e._element)})),this._elementBtnLike.addEventListener("click",this._handleClickBtnLike),this._elementImage.addEventListener("click",(function(){return e._handleClickImagePlace({name:e.name,link:e.link})}))}},{key:"_initIsCardLiked",value:function(e){this._likes.some((function(t){return t._id===e}))?(this._toggled=!0,this._elementBtnLike.classList.add("element__like-btn_active")):(this._toggled=!1,this._elementBtnLike.classList.remove("element__like-btn_active"))}},{key:"_initCanDelete",value:function(e){this._owner._id!==e&&this._elementBtnTrash.remove()}},{key:"createPlace",value:function(e){return this._elementTitle.textContent=this.name,this._elementImage.src=this.link,this._elementImage.alt=this.name,this._elementCountLike.textContent=this._likes.length,this._initIsCardLiked(e),this._initCanDelete(e),this._setEventListeners(),this._element}}])&&a(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function c(e){return c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},c(e)}function f(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,y(r.key),r)}}function p(e,t,n){return t&&f(e.prototype,t),n&&f(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function h(e,t,n){return(t=y(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function y(e){var t=function(e,t){if("object"!==c(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==c(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"===c(t)?t:String(t)}var m=p((function e(t,n){var r=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),h(this,"_showInputError",(function(e,t){var n=r._formElement.querySelector("#".concat(e.id,"-error"));e.classList.add(r._inputErrorClass),n.classList.add(r._errorClass),n.textContent=t})),h(this,"_hideInputError",(function(e){var t=r._formElement.querySelector("#".concat(e.id,"-error"));e.classList.remove(r._inputErrorClass),t.classList.remove(r._errorClass),t.textContent=""})),h(this,"_checkInputValidity",(function(e){e.validity.valid?r._hideInputError(e):r._showInputError(e,e.validationMessage)})),h(this,"_hasInvalidInput",(function(){return r._inputList.some((function(e){return!e.validity.valid}))})),h(this,"_toggleButtonState",(function(){r._hasInvalidInput()?(r._buttonElement.classList.add(r._inactiveButtonClass),r._buttonElement.disabled=!0):(r._buttonElement.classList.remove(r._inactiveButtonClass),r._buttonElement.disabled=!1)})),h(this,"_setEventListeners",(function(){r._inputList.forEach((function(e){e.addEventListener("input",(function(){r._checkInputValidity(e),r._toggleButtonState()}))}))})),h(this,"enableValidation",(function(){r._toggleButtonState(),r._setEventListeners()})),h(this,"resetValidation",(function(){r._buttonElement.classList.add(r._inactiveButtonClass),r._buttonElement.disabled=!0,r._inputList.forEach((function(e){return r._hideInputError(e)}))})),this._formSelector=t.formSelector,this._inputSelector=t.inputSelector,this._submitButtonSelector=t.submitButtonSelector,this._inactiveButtonClass=t.inactiveButtonClass,this._inputErrorClass=t.inputErrorClass,this._errorClass=t.errorClass,this._formElement=n,this._inputList=Array.from(this._formElement.querySelectorAll(this._inputSelector)),this._buttonElement=this._formElement.querySelector(this._submitButtonSelector)}));function b(e){return b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},b(e)}function d(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==b(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==b(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r.key),"symbol"===b(o)?o:String(o)),r)}var o}var v=function(){function e(t,n){var r=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderer=r,this._container=document.querySelector(n)}var t,n;return t=e,(n=[{key:"renderItems",value:function(e){var t=this;e.forEach((function(e){return t._renderer(e)}))}},{key:"addItem",value:function(e){this._container.prepend(e)}}])&&d(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function _(e){return _="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_(e)}function S(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==_(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==_(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r.key),"symbol"===_(o)?o:String(o)),r)}var o}var g=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popup=document.querySelector(t),this._handleEscClose=this._handleEscClose.bind(this),this._handleMousedownClose=this._handleMousedownClose.bind(this)}var t,n;return t=e,(n=[{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"_handleMousedownClose",value:function(e){(e.target===e.currentTarget||e.target.classList.contains("popup__close-btn"))&&this.close()}},{key:"open",value:function(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"setEventListeners",value:function(){this._popup.addEventListener("mousedown",this._handleMousedownClose)}}])&&S(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function k(e){return k="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},k(e)}function w(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==k(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==k(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r.key),"symbol"===k(o)?o:String(o)),r)}var o}function E(){return E="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=P(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},E.apply(this,arguments)}function C(e,t){return C=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},C(e,t)}function P(e){return P=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},P(e)}var L=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&C(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=P(r);if(o){var n=P(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return function(e,t){if(t&&("object"===k(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}(this,e)});function u(e){var t,n=e.selector,r=e.handleFormSubmit;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(t=i.call(this,n))._selector=n,t._handleFormSubmit=r,t._element=t._getElement(),t._buttonElement=t._element.querySelector(".popup__save-btn"),t._inputList=t._element.querySelectorAll(".popup__input"),t._formValues={},t}return t=u,(n=[{key:"_getElement",value:function(){return document.querySelector(this._selector).querySelector("form")}},{key:"_getInputValues",value:function(){var e=this;return this._formValues={},this._inputList.forEach((function(t){return e._formValues[t.name]=t.value})),this._formValues}},{key:"setInputValues",value:function(e){this._inputList.forEach((function(t){return t.value=e[t.name]}))}},{key:"close",value:function(){E(P(u.prototype),"close",this).call(this),this._element.reset()}},{key:"_setEventListenersForForm",value:function(){var e=this;this._element.addEventListener("submit",(function(t){t.preventDefault();var n=e._buttonElement.textContent;e._buttonElement.textContent="Сохранение...",e._handleFormSubmit(e._getInputValues()).then(e.close()).catch((function(e){return console.log("Ошибка: ".concat(e))})).finally((function(){e._buttonElement.textContent=n}))}))}},{key:"setEventListeners",value:function(){E(P(u.prototype),"setEventListeners",this).call(this),this._setEventListenersForForm()}}])&&w(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),u}(g);function j(e){return j="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},j(e)}function O(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==j(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==j(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r.key),"symbol"===j(o)?o:String(o)),r)}var o}function I(){return I="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=R(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},I.apply(this,arguments)}function T(e,t){return T=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},T(e,t)}function R(e){return R=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},R(e)}var B=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&T(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=R(r);if(o){var n=R(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return function(e,t){if(t&&("object"===j(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}(this,e)});function u(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),i.apply(this,arguments)}return t=u,(n=[{key:"open",value:function(e,t){I(R(u.prototype),"open",this).call(this),this._idCard=e,this._cardElement=t}},{key:"_setEventListenersForForm",value:function(){var e=this;this._element=I(R(u.prototype),"_getElement",this).call(this),this._element.addEventListener("submit",(function(t){t.preventDefault(),e._handleFormSubmit(e._idCard).then(I(R(u.prototype),"close",e).call(e)).then(e._cardElement.remove()).catch((function(e){return console.log("Ошибка: ".concat(e))}))}))}}])&&O(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),u}(L);function U(e){return U="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},U(e)}function q(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==U(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==U(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r.key),"symbol"===U(o)?o:String(o)),r)}var o}function x(){return x="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=V(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},x.apply(this,arguments)}function A(e,t){return A=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},A(e,t)}function V(e){return V=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},V(e)}var F=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&A(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=V(r);if(o){var n=V(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return function(e,t){if(t&&("object"===U(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}(this,e)});function u(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(t=i.call(this,e))._title=t._popup.querySelector(".popup__title_type_photo"),t._image=t._popup.querySelector(".popup__photo"),t}return t=u,(n=[{key:"open",value:function(e){var t=e.name,n=e.link;this._title.textContent=t,this._image.src=n,this._image.alt=t,x(V(u.prototype),"open",this).call(this)}}])&&q(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),u}(g);function D(e){return D="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},D(e)}function N(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==D(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==D(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r.key),"symbol"===D(o)?o:String(o)),r)}var o}var J=function(){function e(t){var n=t.selectorUserName,r=t.selectorUserJob,o=t.selectorUserAvatar;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._userNameContainer=document.querySelector(n),this._userJobContainer=document.querySelector(r),this._userAvatarContainer=document.querySelector(o),this._userInfo=null}var t,n;return t=e,(n=[{key:"setUserInfo",value:function(e){this._userInfo=e,this._userNameContainer.textContent=this._userInfo.name,this._userJobContainer.textContent=this._userInfo.about,this._userAvatarContainer.src=this._userInfo.avatar,this._renderLoading()}},{key:"getUserInfo",value:function(){return this._userInfo}},{key:"_renderLoading",value:function(){this._userNameContainer.classList.remove("placeholder-loading"),this._userJobContainer.classList.remove("placeholder-loading")}}])&&N(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function z(e){return z="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},z(e)}function M(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==z(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==z(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r.key),"symbol"===z(o)?o:String(o)),r)}var o}function H(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var $=new(function(){function e(t){var n=t.baseUrl,r=t.headers;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._baseUrl=n,this._authorization=r.authorization,this._headers=r}var t,n;return t=e,(n=[{key:"_checkResponse",value:function(e){return e.ok?e.json():Promise.reject(e.status)}},{key:"loadUserInfo",value:function(){return fetch("".concat(this._baseUrl,"/users/me"),{headers:{authorization:this._authorization}}).then(this._checkResponse)}},{key:"updateUserInfo",value:function(e){return fetch("".concat(this._baseUrl,"/users/me"),{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e.titleProfile,about:e.subtitleProfile})}).then(this._checkResponse)}},{key:"updateUserAvatar",value:function(e){return fetch("".concat(this._baseUrl,"/users/me/avatar"),{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e})}).then(this._checkResponse)}},{key:"loadInitialCards",value:function(){return fetch("".concat(this._baseUrl,"/cards"),{headers:{authorization:this._authorization}}).then(this._checkResponse)}},{key:"pushCard",value:function(e){var t=e.name,n=e.link;return fetch("".concat(this._baseUrl,"/cards"),{method:"POST",headers:this._headers,body:JSON.stringify({name:t,link:n})}).then(this._checkResponse)}},{key:"deleteCard",value:function(e){return fetch("".concat(this._baseUrl,"/cards/").concat(e),{method:"DELETE",headers:this._headers}).then(this._checkResponse)}},{key:"putLike",value:function(e){return fetch("".concat(this._baseUrl,"/cards/").concat(e,"/likes"),{method:"PUT",headers:this._headers}).then(this._checkResponse)}},{key:"deleteLike",value:function(e){return fetch("".concat(this._baseUrl,"/cards/").concat(e,"/likes"),{method:"DELETE",headers:this._headers}).then(this._checkResponse)}}])&&M(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}())({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-62",headers:{authorization:"c024f246-bb18-41cb-8ec3-55e361b94019","Content-Type":"application/json"}}),G=new J({selectorUserName:".profile__info-title",selectorUserJob:".profile__info-subtitle",selectorUserAvatar:".profile__avatar"}),K=new L({selector:"#popup-profile",handleFormSubmit:function(e){return $.updateUserInfo(e).then((function(e){G.setUserInfo(e)}))}});K.setEventListeners();var Q=new m(u,o);Q.enableValidation(),e.addEventListener("click",(function(){var e=G.getUserInfo();K.setInputValues({titleProfile:e.name,subtitleProfile:e.about}),Q.resetValidation(),K.open()}));var W=new L({selector:"#popup-avatar",handleFormSubmit:function(e){return $.updateUserAvatar(e.linkAvatar).then((function(e){G.setUserInfo(e)}))}});W.setEventListeners();var X=new m(u,i);X.enableValidation(),n.addEventListener("click",(function(){X.resetValidation(),W.open()}));var Y=new F("#popup-photo");Y.setEventListeners();var Z=new B({selector:"#popup-confirm",handleFormSubmit:function(e){return $.deleteCard(e)}});function ee(e){return new s(e,"#element-template",Y.open.bind(Y),Z.open.bind(Z),$.putLike.bind($),$.deleteLike.bind($))}Z.setEventListeners();var te=new v({renderer:function(e){var t=G.getUserInfo(),n=ee(e).createPlace(t._id);te.addItem(n)}},".elements"),ne=new L({selector:"#popup-place",handleFormSubmit:function(e){var t=G.getUserInfo();return $.pushCard({name:e.namePlace,link:e.linkPlace}).then((function(e){return ee(e)})).then((function(e){return e.createPlace(t._id)})).then((function(e){te.addItem(e)}))}});ne.setEventListeners();var re=new m(u,r);re.enableValidation(),t.addEventListener("click",(function(){re.resetValidation(),ne.open()})),Promise.all([$.loadUserInfo(),$.loadInitialCards()]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i,u,l=[],a=!0,s=!1;try{if(i=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;a=!1}else for(;!(a=(r=i.call(n)).done)&&(l.push(r.value),l.length!==t);a=!0);}catch(e){s=!0,o=e}finally{try{if(!a&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(s)throw o}}return l}}(t,n)||function(e,t){if(e){if("string"==typeof e)return H(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?H(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],i=r[1];G.setUserInfo(o),te.renderItems(i.reverse())})).catch((function(e){return console.log("Ошибка: ".concat(e))}))})();