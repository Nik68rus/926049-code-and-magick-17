'use strict';

(function (load, debounce) {
  var coatColor;
  var eyesColor;
  var wizards = [];


  var getRank = function (wizard) {
    var rank = 0;
    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }
    return rank;
  };

  var getSimilarWizards = function (left, right) {
    var rankDiff = getRank(right) - getRank(left);
    return rankDiff === 0
      ? left.name.localeCompare(right.name, 'ru', {sensitivity: 'base'})
      : rankDiff;
  };

  var getSortedSimilarWizards = function (similarWizards) {
    return similarWizards.sort(getSimilarWizards);
  };

  var updateWizards = function () {
    window.render(getSortedSimilarWizards(wizards));
  };

  window.wizard.onEyesChange = debounce(function (color) {
    eyesColor = color;
    updateWizards();
  });

  window.wizard.onCoatChange = debounce(function (color) {
    coatColor = color;
    updateWizards();
  });

  var successHandler = function (data) {
    wizards = data;
    updateWizards();
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    node.classList.add('error-message');
    document.body.insertAdjacentElement('afterbegin', node);
    var loadErrorMessage = document.querySelector('.error-message');
    loadErrorMessage.addEventListener('click', function () {
      document.body.removeChild(loadErrorMessage);
    });
  };

  load(successHandler, errorHandler);
})(window.backend.load, window.util.debounce);
