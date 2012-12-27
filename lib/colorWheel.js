
(function() {

  var twicePI = Math.PI*2;

  var colorWheel = function(options) {

    var ball = {};

    ball.context = options.context;
    ball.x = options.x || 400;
    ball.y = options.y || 300;
    ball.radius = options.radius || 400;
    ball.tickWidth = options.tickWidth || 40;
    ball.bandWidth = options.bandWidth || ball.radius/2;
    ball.tickCount = twicePI * ball.radius / ball.tickWidth;
    ball.tickAngle = ball.tickWidth / ball.radius;

    ball.ticks = [];

    var startAngle, tickLength, startRadius, endRadius, sin, cos;
    for (var i=0; i<ball.tickCount; i++) {
      startAngle = i * ball.tickAngle;
      tickLength = Math.random() * ball.bandWidth /11 + 11 * ball.bandWidth / 12;
      startRadius = ball.radius - tickLength/2;
      endRadius = ball.radius + tickLength/2;
      cos = Math.cos(startAngle);
      sin = Math.sin(startAngle);
      ball.ticks[i] = {
        start: {
          x: ball.x + cos * startRadius,
          y: ball.y + sin * startRadius
        },
        end: {
          x: ball.x + cos * endRadius,
          y: ball.y + sin * endRadius
        },
        color: "#660033"
      };
    }

    ball.draw = function() {
      ball.context.lineWidth = ball.tickWidth + 10;
      ball.context.lineCap = "round";
      ball.ticks.forEach(function(tick) {
        ball.context.strokeStyle = tick.color;
        ball.context.beginPath();
        ball.context.moveTo(tick.start.x, tick.start.y);
        ball.context.lineTo(tick.end.x, tick.end.y);
        ball.context.closePath();
        ball.context.stroke();
      });
    };

    return ball;

  };

  window.colorWheel = colorWheel;

})();