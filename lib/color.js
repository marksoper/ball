
(function() {

  var getRandomBrushColor = function (targetColor) {
    var random = {};
    var strRandom = "#";
    var seed = Math.random();
    var target = {
      r: parseInt(targetColor.substr(1,2), 16),
      g: parseInt(targetColor.substr(3,2), 16),
      b: parseInt(targetColor.substr(5,2), 16)
    };
    ["r","g","b"].forEach(function(c) {
      random[c] = Math.floor(Math.max(0, Math.min(255, ((255 - target[c]) / 255) + 100*seed + target[c] - 50)));
      strRandom = strRandom + random[c].toString(16);
    });
    return strRandom;
  };

  var Color = {
    getRandomBrushColor: getRandomBrushColor
  };

  window.Color = Color;

})();