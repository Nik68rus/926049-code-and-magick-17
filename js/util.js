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

  window.util = {
    isEscEvent: function (evt, action) {
      return isEscapeKey && action();
    },

    isEnterEvent: function (evt, action) {
      return isEnterKey && action();
    },

    debounce: debounce,
  };
})();
