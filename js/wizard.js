'use strict';

(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var wizard = {
    onEyesChange: function () {},
    onCoatChange: function () {}
  };

  // функция получения случайного элемента массива

  var getRandomElement = function (array) {
    var randomElementIndex = Math.floor(Math.random() * array.length);
    return array[randomElementIndex];
  };

  // изменение цвета по нажатию

  var curentWizardCoat = document.querySelector('.setup-wizard .wizard-coat');
  var curentWizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
  var curentWizardFireball = document.querySelector('.setup-fireball-wrap');

  // изменение цвета мантии по нажатию
  curentWizardCoat.addEventListener('click', function () {
    var newColor = getRandomElement(COAT_COLORS);
    curentWizardCoat.style.fill = newColor;
    wizard.onCoatChange(newColor);
  });

  // изменение цвета глаз по нажатию

  curentWizardEyes.addEventListener('click', function () {
    var newColor = getRandomElement(EYES_COLORS);
    curentWizardEyes.style.fill = newColor;
    wizard.onEyesChange(newColor);
  });

  // изменение цвета фаербола по нажатию

  curentWizardFireball.addEventListener('click', function () {
    var newColor = getRandomElement(FIREBALL_COLORS);
    curentWizardFireball.style.backgroundColor = newColor;
  });

  window.wizard = wizard;

  return window.wizard;
})();
