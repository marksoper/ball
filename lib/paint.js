
(function() {

  var N = 4;
  var R = 1000;

  var Brush = function(options) {
    if (this instanceof Brush) {
      this.canvas = options.canvas;
      this.context = options.context;
    } else {
      return new Brush(options);
    }
  };

  Brush.prototype.rect = function(x,y,width,height,context,color) {
    this.color = color || this.color;
    var n = Math.floor(N * width * height / 100);
    var xMax = x + width;
    var yMax = y + height;
    var xMid = Math.floor(xMax / 2);
    var yMid = Math.floor(yMax / 2);
    var xTrim = function(xCoord) {
      return Math.floor(Math.max(x, Math.min(xMax, xCoord)));
    };
    var yTrim = function(yCoord) {
      return Math.floor(Math.max(y, Math.min(yMax, yCoord)));
    };
    for (i=0;i<n;i++) {
      var startX = xTrim(Math.random()*width + x);
      var startY = yTrim(Math.random()*height + y);
      var randomMidpointX = Math.floor(Math.random()*R);
      var randomMidpointY = Math.floor(Math.random()*R);
      var arcRad = Math.sqrt( (startX - randomMidpointX) * (startX - randomMidpointX) + (startY - randomMidpointY) * (startY - randomMidpointY) );
      var startAngle = Math.acos( (startX - randomMidpointX) / arcRad );
      var endAngle = startAngle + 3.56;
      this.context.strokeStyle = Color.getRandomBrushColor(color);
      this.context.lineWidth = 10 * Math.random();
      this.context.beginPath();
      this.context.arc(randomMidpointX, randomMidpointY, arcRad, startAngle, endAngle, true);
      this.context.stroke();
    }
  };

  window.Brush = Brush;

  var main = function() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    var brush = new Brush({
      canvas: canvas,
      context: context
    });

    brush.rect(300,300,300,300,context,"#440000");

  };

  window.onload = main;

})();