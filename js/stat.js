'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var NAME_X = 150;
var TEXT_GAP = 50;
var BAR_WIDTH = 40;
var MAX_BAR_HEIGHT = 150;
var NAME_Y = CLOUD_HEIGHT - 10;
var BAR_Y = CLOUD_HEIGHT - 170;
var TEXT_VICTORY = 'Ура вы победили!';
var TEXT_VICTORY_X = 140;
var TEXT_VICTORY_Y = 40;
var TEXT_RESULT = 'Список результатов:';
var COLOR_SHADOW = 'rgba(0, 0, 0, 0.7)';
var COLOR_CLOUD = '#ebebeb';
var COLOR_NAMES = '#000';
var COLOR_MY_BAR = 'rgba(255, 0, 0, 1)';


var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, COLOR_SHADOW);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, COLOR_CLOUD);

  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.textBaseline = 'hanging';
  ctx.fillText(TEXT_VICTORY, TEXT_VICTORY_X, TEXT_VICTORY_Y);
  ctx.fillText(TEXT_RESULT, TEXT_VICTORY_X, TEXT_VICTORY_Y + GAP * 2);

  var maxTime = getMaxElement(times);


  for (var i = 0; i < names.length; i++) {
    var barHeight = (MAX_BAR_HEIGHT * times[i]) / maxTime;
    var barTopGap = BAR_Y + (MAX_BAR_HEIGHT - barHeight);
    var score = Math.round(times[i]);
    if (names[i] === 'Вы') {
      ctx.fillStyle = COLOR_NAMES;
      ctx.fillText(names[i], NAME_X + (BAR_WIDTH + TEXT_GAP) * i, NAME_Y);
      ctx.fillText(score, NAME_X + (BAR_WIDTH + TEXT_GAP) * i, barTopGap - GAP * 2);
      ctx.fillStyle = COLOR_MY_BAR;
      ctx.fillRect(NAME_X + (BAR_WIDTH + TEXT_GAP) * i, barTopGap, BAR_WIDTH, barHeight);

    } else {
      ctx.fillStyle = COLOR_NAMES;
      ctx.fillText(names[i], NAME_X + (BAR_WIDTH + TEXT_GAP) * i, NAME_Y);
      ctx.fillText(score, NAME_X + (BAR_WIDTH + TEXT_GAP) * i, barTopGap - GAP * 2);
      ctx.fillStyle = 'rgba(0, 125, 255, 0.9)';
      ctx.fillRect(NAME_X + (BAR_WIDTH + TEXT_GAP) * i, barTopGap, BAR_WIDTH, barHeight);
    }
  }
};
