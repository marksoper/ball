
(function() {

  var twicePI = Math.PI*2;

  var Ball = function(options) {
    if (this instanceof Ball) {
      this.canvas = options.canvas;
      this.context = options.context;
      this.calcRadius = options.calcRadius || function() { return 100; };
      this.calcX = options.calcX || function() { return 0; };
      this.calcY = options.calcY || function() { return 0; };
      this.strokeColor = options.strokeColor || "#000000";
      this.fillColor = options.fillColor;
      this.calcLineWidth = options.calcLineWidth ||function() { return 10; };
      this.drawingStyle = options.drawingStyle || "basic";
    } else {
      return new Ball(options);
    }
  };

  Ball.prototype.locate = function() {
    this.x = this.calcX.call(this);
    this.y = this.calcY.call(this);
  };

  Ball.prototype.resize = function() {
    this.radius = this.calcRadius.call(this);
    this.lineWidth = this.calcLineWidth.call(this);
  };

  Ball.prototype.draw = function() {
    this.context.strokeStyle = this.strokeColor;
    if (this.fillColor) {
      this.context.fillStyle = this.fillColor;
    }
    this.context.lineWidth = this.lineWidth;
    return Ball.styles[this.drawingStyle].call(this);
  };

  Ball.styles = {
    basic: function () {
      this.context.beginPath();
      this.context.arc(this.x, this.y, this.radius, twicePI, true);
      this.context.stroke();
    },
    penSketch: function() {
      var x, y, radius;
      for (var i=0; i<Math.floor(this.lineWidth); i++) {
        this.context.beginPath();
        x = Math.round(this.x + (35) * Math.random());
        y = Math.round(this.y + (35) * Math.random());
        radius = Math.round(this.radius + 3 * Math.random());
        this.context.arc(x, y, this.radius, 0, twicePI, true);
        this.context.stroke();
      }
    },
    paint: function() {
      var targetColor = this.strokeColor;
      for (var i=0; i<Math.floor(60*this.lineWidth); i++) {
        if (targetColor) {
          this.context.strokeStyle = Color.getRandomBrushColor(targetColor);
        }
        this.context.beginPath();
        x = Math.round(this.x + (55) * Math.random());
        y = Math.round(this.y + (55) * Math.random());
        radius = Math.round(this.radius + 10 * Math.random());
        var startAngle = twicePI * Math.random();
        var endAngle = startAngle + twicePI/4 * Math.random();
        this.context.arc(x, y, radius, startAngle, endAngle, true);
        this.context.stroke();
      }
    }

  };

  window.Ball = Ball;

})();