'use strict';

(function (makeOnMouseDown) {
  var setup = document.querySelector('.setup');
  var setupUpload = setup.querySelector('.upload');

  var onUploadMouseMove = function (x, y) {
    setup.style.left = setup.offsetLeft - x + 'px';
    setup.style.top = setup.offsetTop - y + 'px';
  };

  var preventDefaultClick = function (evt) {
    evt.preventDefault();
  };

  var onUploadMouseUp = function () {
    setupUpload.addEventListener('click', preventDefaultClick, {once: true});
  };

  var onUploadMouseDown = makeOnMouseDown(onUploadMouseMove, onUploadMouseUp);

  setupUpload.addEventListener('mousedown', onUploadMouseDown);

  // реализуем перетаскивание в рюкзак

  var shopElement = setup.querySelector('.setup-artifacts-shop');
  var draggedItem = null;

  shopElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
  });

  var artifactsElement = setup.querySelector('.setup-artifacts');

  artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
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
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
  });

  shopElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
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
})(window.util.makeOnMouseDown);

