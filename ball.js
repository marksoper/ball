
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
      this.drawingStyle = options.drawingStyle || "basic";
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
        x = Math.floor(this.x + (20 + i/50) * Math.random());
        y = Math.floor(this.y + (20+ i/50) * Math.random());
        radius = Math.floor(this.radius +3 * Math.random());
        this.context.arc(x, y, this.radius, 0, twicePI, true);
        this.context.stroke();
      }
    }
  };

  var main = function() {
    canvasEl = document.getElementById('canvas');
    canvas = new Canvas();
    canvas.resize();
    var loop = new Loop();
    var ball = new Ball();
    loop.on("run", function() {
      canvas.clear.call(canvas);
      ball.locate.call(ball);
      ball.draw.call(ball);
    });
    window.addEventListener("resize", function() {
      console.log("window resize event ...");
      loop.on("run", function() {
        canvas.resize.call(canvas);
        loop.off("run", canvas.resize);
      });
    });
   loop.start();
    window.b = {
      loop: loop,
      ball: ball
    };
  };

  window.onload = main;

})();