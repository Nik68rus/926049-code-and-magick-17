'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан-Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setupWindow = document.querySelector('.setup');

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var wizards = [];

for (var i = 0; i < 4; i++) {
  wizards[i] = {
    name: WIZARD_NAMES[getRandomInRange(0, 7)] + ' ' + WIZARD_SURNAMES[getRandomInRange(0, 7)],
    coatColor: COAT_COLORS[getRandomInRange(0, 6)],
    eyesColor: EYES_COLORS[getRandomInRange(0, 5)]
  };
}

var similarListElement = setupWindow.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

setupWindow.querySelector('.setup-similar').classList.remove('hidden');

// Нажатие на элемент .setup-open удаляет класс hidden
// у блока setup. Нажатие на элемент .setup-close, расположенный
// внутри блока setup возвращает ему класс hidden.

var setupOpen = document.querySelector('.setup-open');
var setupClose = setupWindow.querySelector('.setup-close');
var userName = setupWindow.querySelector('.setup-user-name');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && !(userName === document.activeElement)) {
    closePopup();
  }
};

var openPopup = function () {
  setupWindow.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setupWindow.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup()
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// изменение цвета мантии по нажатию

var curentWizardCoat = document.querySelector('.setup-wizard .wizard-coat');
var curentWizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
var curentWizardFireball = document.querySelector('.setup-fireball-wrap');


curentWizardCoat.addEventListener('click', function () {
  curentWizardCoat.style.fill = COAT_COLORS[i % COAT_COLORS.length];
  document.querySelector('input[name="coat-color"]').value = COAT_COLORS[i % COAT_COLORS.length];
  i++;
  if (i === COAT_COLORS.length) {
    i = 0;
  }
});

// изменение цвета глаз по нажатию

curentWizardEyes.addEventListener('click', function () {
  curentWizardEyes.style.fill = EYES_COLORS[i % EYES_COLORS.length];
  document.querySelector('input[name="eyes-color"]').value = EYES_COLORS[i % EYES_COLORS.length];
  i++;
  if (i === EYES_COLORS.length) {
    i = 0;
  }
});

// изменение цвета фаербола по нажатию

curentWizardFireball.addEventListener('click', function () {
  curentWizardFireball.style.backgroundColor = FIREBALL_COLORS[i % FIREBALL_COLORS.length];
  document.querySelector('input[name="fireball-color"]').value = FIREBALL_COLORS[i % FIREBALL_COLORS.length];
  i++;
  if (i === FIREBALL_COLORS.length) {
    i = 0;
  }
});
