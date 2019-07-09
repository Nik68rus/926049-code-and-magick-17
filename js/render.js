'use strict';

(function () {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarListElement = document.querySelector('.setup-similar-list');
  var similar = document.querySelector('.setup-similar');

  var renderWizard = function (wizard) {
    var node = similarWizardTemplate.cloneNode(true);
    node.querySelector('.setup-similar-label').textContent = wizard.name;
    node.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    node.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return node;
  };

  window.render = function (wizards) {
    var fragment = document.createDocumentFragment();
    wizards.slice(0, 4).forEach(function (wizard) {
      fragment.appendChild(renderWizard(wizard));
    });

    similarListElement.innerHTML = '';
    similarListElement.appendChild(fragment);
    window.util.showElement(similar);
  };
})();
