'use strict';

(function (makeDragStart) {
  var setup = document.querySelector('.setup');
  var setupUpload = setup.querySelector('.upload');

  var onSetupDragMove = function (x, y) {
    setup.style.left = setup.offsetLeft + x + 'px';
    setup.style.top = setup.offsetTop + y + 'px';
  };

  var preventDefaultClick = function (evt) {
    evt.preventDefault();
  };

  var onSetupDragEnd = function () {
    setupUpload.addEventListener('click', preventDefaultClick, {once: true});
  };

  var onSetupDragStart = makeDragStart(onSetupDragMove, onSetupDragEnd);

  setupUpload.addEventListener('mousedown', onSetupDragStart);

  // реализуем перетаскивание в рюкзак

  var shopElement = setup.querySelector('.setup-artifacts-shop');
  var draggedItem = null;

  shopElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
    }
  });

  var artifactsElement = setup.querySelector('.setup-artifacts');

  artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
  });

  artifactsElement.addEventListener('drop', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.target.appendChild(draggedItem);
    draggedItem = null;
  });


  artifactsElement.addEventListener('dragenter', function (evt) {
    evt.target.style.backgroundColor = 'yellow';
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
    } else {
      evt.preventDefault();
      return;
    }
  });

  shopElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
  });

  shopElement.addEventListener('drop', function (evt) {
    if (evt.target.classList.contains('setup-artifacts-cell')) {
      evt.target.style.backgroundColor = '';
      evt.target.appendChild(draggedItem);
      draggedItem = null;
    }
  });


  shopElement.addEventListener('dragenter', function (evt) {
    if (evt.target.classList.contains('setup-artifacts-cell')) {
      evt.target.style.backgroundColor = 'yellow';
      evt.preventDefault();
    }
  });

  shopElement.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });
})(window.util.makeDragStart);

