'use strict';

(function () {

  var getRandomColor = function (colors) {
    return colors[Math.floor(colors.length * Math.random())];
  };

  window.colorize = function (element, colorList) {
    element.addEventListener('click', function () {
      var color = getRandomColor(colorList);
      if (element.tagName.toLowerCase() === 'div') {
        element.style.backgroundColor = color;
      } else {
        element.style.fill = color;
      }
    });
  };
})();
