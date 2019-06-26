'use strict';

(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан-Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var SETUP_START_X = '50%';
  var SETUP_START_Y = '80px';

  var setupWindow = document.querySelector('.setup');

  function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
/*
  var wizards = [];

  for (var i = 0; i < 4; i++) {
    wizards[i] = {
      name: WIZARD_NAMES[getRandomInRange(0, 7)] + ' ' + WIZARD_SURNAMES[getRandomInRange(0, 7)],
      coatColor: COAT_COLORS[getRandomInRange(0, 6)],
      eyesColor: EYES_COLORS[getRandomInRange(0, 5)]
    };
  }
*/
  var similarListElement = setupWindow.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  var successHandler = function (wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 4; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);
    setupWindow.querySelector('.setup-similar').classList.remove('hidden');
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);

  // Нажатие на элемент .setup-open удаляет класс hidden
  // у блока setup. Нажатие на элемент .setup-close, расположенный
  // внутри блока setup возвращает ему класс hidden.

  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setupWindow.querySelector('.setup-close');

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  var openPopup = function () {
    setupWindow.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    setupWindow.style.left = SETUP_START_X;
    setupWindow.style.top = SETUP_START_Y;
  };

  var closePopup = function () {
    setupWindow.classList.add('hidden');
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

  // изменение цвета по нажатию

  var curentWizardCoat = document.querySelector('.setup-wizard .wizard-coat');
  var curentWizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
  var curentWizardFireball = document.querySelector('.setup-fireball-wrap');

  // изменение цвета мантии по нажатию

  curentWizardCoat.addEventListener('click', function () {
    window.colorize(curentWizardCoat, COAT_COLORS);
  });

  // изменение цвета глаз по нажатию

  curentWizardEyes.addEventListener('click', function () {
    window.colorize(curentWizardEyes, EYES_COLORS);
  });

  // изменение цвета фаербола по нажатию

  curentWizardFireball.addEventListener('click', function () {
    window.colorize(curentWizardFireball, FIREBALL_COLORS);
  });

  var form = setupWindow.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), function (response) {
      setupWindow.classList.add('hidden');
    });
  });
})();
