
(function() {

  var twicePI = Math.PI*2;

  var Ball = function(options) {
    if (this instanceof Ball) {
      this.canvas = options.canvas;
      this.context = options.context;
      this.radius = options.radius || 100;
      this.locateX = options.locateX || function() { return 0; };
      this.locateY = options.locateY || function() { return 0; };
      this.strokeColor = options.strokeColor || "#000000";
      this.fillColor = options.fillColor;
      this.lineWidth = options.lineWidth || 10;
      this.drawingFunction = options.drawingFunction || this.drawBasic;
    } else {
      return new Ball(options);
    }
  };

  Ball.prototype.locate = function() {
    this.x = this.locateX.call(this);
    this.y = this.locateY.call(this);
  };

  Ball.prototype.draw = function() {
    this.context.stokeStyle = this.strokeColor;
    if (this.fillColor) {
      this.context.fillStyle = this.fillColor;
    }
    this.context.lineWidth = this.lineWidth;
    return this.drawingFunction.call(this);
  };

  Ball.prototype.drawBasic = function () {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, twicePI, true);
    this.context.stroke();
  };

  Ball.prototype.drawPenSketch = function() {
    var x, y, radius;
    for (var i=0; i<Math.floor(this.lineWidth); i++) {
      this.canvas.context.beginPath();
      x = Math.floor(this.x + (20 + i/50) * Math.random());
      y = Math.floor(this.y + (20+ i/50) * Math.random());
      radius = Math.floor(this.radius +3 * Math.random());
      this.canvas.context.arc(x, y, this.radius, 0, twicePI, true);
      this.canvas.context.stroke();
    }
  };

  window.Ball = Ball;

})();