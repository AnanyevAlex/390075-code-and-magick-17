'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var GAP_TITLE = 25;
var USER_NAME_POSITION_X = 150;
var USER_NAME_POSITION_Y = CLOUD_HEIGHT - 10;
var TEXT_GAP = 50;
var BAR_WIDTH = 40;
var MAX_BAR_HEIGHT = 150;
var BAR_Y = CLOUD_HEIGHT - 170;
var TEXT_VICTORY = 'Ура вы победили!';
var TEXT_VICTORY_POSITION_X = 140;
var TEXT_VICTORY_POSITION_Y = 5;
var TEXT_RESULTS = 'Список результатов:';
var COLOR_SHADOW = 'rgba(0, 0, 0, 0.7)';
var COLOR_CLOUD = '#ebebeb';
var FONT_COLOR = '#000';
var USER_BAR_COLOR = 'rgba(255, 0, 0, 1)';

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

  var victoryText = function (text, line) {
    return ctx.fillText(text, TEXT_VICTORY_POSITION_X, TEXT_VICTORY_POSITION_Y + GAP_TITLE * line);
  };

  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.textBaseline = 'hanging';
  victoryText(TEXT_VICTORY, 1);
  victoryText(TEXT_RESULTS, 2);

  var maxTime = getMaxElement(times);

  var getColorBar = function (playerName) {
    if (playerName === 'Вы') {
      return USER_BAR_COLOR;
    } else {
      var randomColorBar = Math.floor(Math.random() * (255 - 160 + 1)) + 160;
      var playersBarColor = 'rgba(0, 125,' + randomColorBar + ', 0.9)';
      return playersBarColor;
    }
  };

  var createPlayerBar = function (playerName, position) {
    ctx.fillStyle = FONT_COLOR;
    ctx.fillText(playerName, USER_NAME_POSITION_X + (BAR_WIDTH + TEXT_GAP) * position, USER_NAME_POSITION_Y);
    ctx.fillText(score, USER_NAME_POSITION_X + (BAR_WIDTH + TEXT_GAP) * position, barTopGap - GAP * 2);
    ctx.fillStyle = getColorBar(playerName);
    ctx.fillRect(USER_NAME_POSITION_X + (BAR_WIDTH + TEXT_GAP) * position, barTopGap, BAR_WIDTH, barHeight);
  };

  for (var i = 0; i < names.length; i++) {
    var barHeight = (MAX_BAR_HEIGHT * times[i]) / maxTime;
    var barTopGap = BAR_Y + (MAX_BAR_HEIGHT - barHeight);
    var score = Math.round(times[i]);
    createPlayerBar(names[i], i);

  }
};
