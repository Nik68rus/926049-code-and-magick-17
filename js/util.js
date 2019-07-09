'use strict';

(function () {
  var DEBOUNCE_DELAY = 300; // ms

  var debounce = function (onTimeout, delay) {
    var lastTieoutId = null;
    return function () {
      var parameters = arguments;
      if (lastTieoutId !== null) {
        clearTimeout(lastTieoutId);
      }
      lastTieoutId = setTimeout(function () {
        onTimeout.apply(null, parameters);
      }, delay || DEBOUNCE_DELAY);
    };
  };

  var isEnterKey = function (evt) {
    return evt.key === 'Enter';
  };

  var isEscapeKey = function (evt) {
    return evt.key === 'Escape' || evt.key === 'Esc';
  };

  // проверка на движение
  var hasMove = function (start, end) {
    return start.clientX !== end.clientX
      || start.clientY !== end.clientY;
  };

  var makeDragStart = function (onMove, onEnd) {
    return function (evt) {
      evt.preventDefault();
      var start = {
        clientX: evt.clientX,
        clientY: evt.clientY,
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        onMove(moveEvt.movementX, moveEvt.movementY);
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        return hasMove(start, upEvt) && onEnd();
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp, {once: true});
    };
  };

  var showElement = function (element) {
    element.classList.remove('hidden');
  };

  var hideElement = function (element) {
    element.classList.add('hidden');
  };

  window.util = {
    isEscEvent: function (evt, action) {
      return isEscapeKey && action();
    },

    isEnterEvent: function (evt, action) {
      return isEnterKey && action();
    },

    makeDragStart: makeDragStart,
    debounce: debounce,
    showElement: showElement,
    hideElement: hideElement,
  };
})();
