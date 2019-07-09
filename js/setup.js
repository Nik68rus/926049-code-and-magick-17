'use strict';

(function () {
  var SETUP_START_X = '50%';
  var SETUP_START_Y = '80px';
  var setupWindow = document.querySelector('.setup');

  // Нажатие на элемент .setup-open удаляет класс hidden
  // у блока setup. Нажатие на элемент .setup-close, расположенный
  // внутри блока setup возвращает ему класс hidden.

  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setupWindow.querySelector('.setup-close');
  var wizardName = setupWindow.querySelector('.setup-user-name');

  var onPopupEscPress = function (evt) {
    if (wizardName !== document.activeElement) {
      window.util.isEscEvent(evt, closePopup);
    }
  };

  var openPopup = function () {
    window.util.showElement(setupWindow);
    document.addEventListener('keydown', onPopupEscPress);
    setupWindow.style.left = SETUP_START_X;
    setupWindow.style.top = SETUP_START_Y;
  };

  var closePopup = function () {
    window.util.hideElement(setupWindow);
    document.removeEventListener('keydown', onPopupEscPress);
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  var form = setupWindow.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), function () {
      window.util.hideElement(setupWindow);
    });
  });
})();
