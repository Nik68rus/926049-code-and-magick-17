'use strict';

(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var GAP = 10;
  var CLOUD_PADDING = 30;
  var LINE_HEIGHT = 20;
  var GIST_HEIGHT = 150;
  var BAR_WIDTH = 40;
  var SPACE_BETWEEN = 50;

  var gistBottom = CLOUD_Y + CLOUD_HEIGHT - CLOUD_PADDING;

  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  var getMaximum = function (raw) {
    var maximum = raw[0];
    for (var i = 1; i < raw.length; i++) {
      if (raw[i] > maximum) {
        maximum = raw[i];
      }
    }
    return maximum;
  };

  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';
    ctx.fillText('Ура вы победили!', CLOUD_X + CLOUD_PADDING, CLOUD_Y + CLOUD_PADDING);
    ctx.fillText('Список результатов:', CLOUD_X + CLOUD_PADDING, CLOUD_Y + CLOUD_PADDING + LINE_HEIGHT);
    var max = getMaximum(times);
    var colors = [];
    for (var i = 0; i < names.length; i++) {
      colors[i] = 'rgba(0,0,' + Math.round(Math.random() * 255) + ',1)';
      if (names[i] === 'Вы') {
        colors[i] = 'rgba(255, 0, 0, 1)';
      }
      times[i] = Math.round(times[i]);
      ctx.fillStyle = '#000';
      ctx.fillText(names[i], CLOUD_X + CLOUD_PADDING + (BAR_WIDTH + SPACE_BETWEEN) * i, gistBottom + LINE_HEIGHT);
      ctx.fillStyle = colors[i];
      ctx.fillRect(CLOUD_X + CLOUD_PADDING + (BAR_WIDTH + SPACE_BETWEEN) * i, gistBottom - GIST_HEIGHT * times[i] / max, BAR_WIDTH, GIST_HEIGHT * times[i] / max);
      ctx.fillStyle = '#000';
      ctx.fillText(times[i], CLOUD_X + CLOUD_PADDING + (BAR_WIDTH + SPACE_BETWEEN) * i, gistBottom - GIST_HEIGHT * times[i] / max - LINE_HEIGHT / 2);
    }
  };
})();
