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

  var makeOnMouseDown = function (onMove, onUp) {
    return function (evt) {
      evt.preventDefault();

      var start = {
        x: evt.clientX,
        y: evt.clientY
      };

      var dragged = false;

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        onMove(start.x - moveEvt.clientX, start.y - moveEvt.clientY);

        start.x = moveEvt.clientX;
        start.y = moveEvt.clientY;
        dragged = true;
      };
      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        if (dragged) {
          onUp();
        }

        document.removeEventListener('mousemove', onMouseMove);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp, {once: true});
    };
  };

  window.util = {
    isEscEvent: function (evt, action) {
      return isEscapeKey && action();
    },

    isEnterEvent: function (evt, action) {
      return isEnterKey && action();
    },

    makeOnMouseDown: makeOnMouseDown,
    debounce: debounce,
  };
})();
