'use strict';

(function () {
  var COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];

  var EYE_COLORS = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];

  var FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  var noop = function () {};

  var wizard = {
    onEyesChange: noop,
    onCoatChange: noop,
  };

  var setup = document.querySelector('.setup');

  var curentWizardCoat = document.querySelector('.setup-wizard .wizard-coat');
  var curentWizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
  var curentWizardFireball = document.querySelector('.setup-fireball-wrap');

  var coatInput = setup.querySelector('input[name=coat-color]');
  var eyeInput = setup.querySelector('input[name=eyes-color]');
  var fireballInput = setup.querySelector('input[name=fireball-color]');

  // изменение цвета по нажатию
  var coatColorIndex = 0;
  var eyeColorIndex = 0;
  var fireballColorIndex = 0;

  // изменение цвета мантии по нажатию

  curentWizardCoat.addEventListener('click', function () {
    coatColorIndex++;
    if (coatColorIndex === COAT_COLORS.length) {
      coatColorIndex = 0;
    }
    coatInput.value = curentWizardCoat.style.fill = COAT_COLORS[coatColorIndex];
    wizard.onCoatChange(COAT_COLORS[coatColorIndex]);
  });

  // изменение цвета глаз по нажатию

  curentWizardEyes.addEventListener('click', function () {
    eyeColorIndex++;
    if (eyeColorIndex === EYE_COLORS.length) {
      eyeColorIndex = 0;
    }
    eyeInput.value = curentWizardEyes.style.fill = EYE_COLORS[eyeColorIndex];
    wizard.onEyesChange(EYE_COLORS[eyeColorIndex]);
  });

  // изменение цвета фаербола по нажатию

  curentWizardFireball.addEventListener('click', function () {
    fireballColorIndex++;
    if (fireballColorIndex === FIREBALL_COLORS.length) {
      fireballColorIndex = 0;
    }
    fireballInput.value = curentWizardFireball.style.backgroundColor = FIREBALL_COLORS[fireballColorIndex];
  });

  window.wizard = wizard;
})();
