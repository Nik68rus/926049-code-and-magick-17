'use strict';

(function () {
  var Cloud = {
    WIDTH: 420,
    HEIGHT: 270,
    X: 100,
    Y: 10,
    PADDING: 30,
    SHADOW_OFFSET: 10,
    SHADOW_COLOR: 'rgba(0, 0, 0, 0.7)',
    HEADING: 'Ура вы победили!\nСписок результатов:',
  };

  var LINE_HEIGHT = 20;
  var GIST_HEIGHT = 150;
  var BAR_WIDTH = 40;
  var SPACE_BETWEEN = 50;

  var gistBottom = Cloud.Y + Cloud.HEIGHT - Cloud.PADDING;

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var renderCloud = function (ctx, x, y, color) {
    ctx.shadowColor = Cloud.SHADOW_COLOR;
    ctx.shadowOffsetX = Cloud.SHADOW_OFFSET;
    ctx.shadowOffsetY = Cloud.SHADOW_OFFSET;
    ctx.shadowBlur = 0;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, Cloud.WIDTH, Cloud.HEIGHT);
    ctx.shadowColor = 'rgba(0, 0, 0, 0)';
  };

  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, Cloud.X, Cloud.Y, '#fff');

    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';
    Cloud.HEADING.split('\n').forEach(function (line, i) {
      ctx.fillText(line, Cloud.X + Cloud.PADDING, Cloud.Y + Cloud.PADDING + i * LINE_HEIGHT);
    });

    var max = Math.max.apply(null, times);
    for (var i = 0; i < Math.min(names.length, times.length); i++) {
      var time = Math.round(times[i]);
      var name = names[i];
      ctx.fillStyle = '#000';
      ctx.fillText(name, Cloud.X + Cloud.PADDING + (BAR_WIDTH + SPACE_BETWEEN) * i, gistBottom + LINE_HEIGHT);
      ctx.fillStyle = (name === 'Вы') ? 'rgb(255, 0, 0)' : 'rgba(0, 0, 255, 0.' + getRandomNumber(40, 90) + ')';
      ctx.fillRect(Cloud.X + Cloud.PADDING + (BAR_WIDTH + SPACE_BETWEEN) * i, gistBottom - GIST_HEIGHT * time / max, BAR_WIDTH, GIST_HEIGHT * time / max);
      ctx.fillStyle = '#000';
      ctx.fillText(time, Cloud.X + Cloud.PADDING + (BAR_WIDTH + SPACE_BETWEEN) * i, gistBottom - GIST_HEIGHT * time / max - LINE_HEIGHT / 2);
    }
  };
})();
