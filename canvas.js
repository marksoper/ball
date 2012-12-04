



(function() {

  var defaultAspectRatio = 1.5;

  var Canvas = function(options) {
    if ( this instanceof Canvas ) {
      this.aspectRatio = options.aspectRatio || defaultAspectRatio;
      this.el = options.el;
      this.context = this.context || this.el.getContext('2d');
    } else {
      return new Canvas(options);
    }
  };

  Canvas.prototype.resize = function() {
    this.el.width  = window.innerWidth;
    this.el.height = Math.floor(this.el.width / this.aspectRatio);
    console.log("resizing to " + this.el.width + " by " + this.el.height);
  };

  Canvas.prototype.clear = function() {
    this.context.clearRect(0, 0, this.el.width, this.el.height);
  };


  var Ball = function(options) {
    for (var prop in options) {
      this[prop] = options[prop];
    }
    this.canvas = this.canvas || canvas;
    this.radius = this.radius || 100;
    this.x = this.x || Math.floor(this.canvas.el.width / 2);
    this.y = this.y || Math.floor(this.canvas.el.height / 4);
  };

  Ball.prototype.locate = function() {
    this.x = Math.floor(this.canvas.el.width / 2);
    this.y = Math.floor(this.canvas.el.height / 4);
  };

  Ball.prototype.draw = function() {
    var x, y, radius;
    for (var i=0; i<10; i++) {
      this.canvas.context.beginPath();
      x = Math.floor(this.x + (20 + i/50) * Math.random());
      y = Math.floor(this.y + (20+ i/50) * Math.random());
      radius = Math.floor(this.radius +3 * Math.random());
      this.canvas.context.arc(x,y,this.radius,0,Math.PI*2,true);
      this.canvas.context.stroke();
    }
  };

  var main = function() {
    canvasEl = document.getElementById('canvas');
    canvas = new Canvas();
    canvas.resize();
    var loop = new Loop();
    var ball = new Ball();
    loop.register("redraw", function() {
      canvas.clear.call(canvas);
      ball.locate.call(ball);
      ball.draw.call(ball);
    });
    window.addEventListener("resize", function() {
      if (canvas.resizing) {
        console.log("window resize event ignored");
        return;
      }
      console.log("window resize event NOT ignored");
      canvas.resizing = true;
      loop.register(
        "resizeCanvas",
        function() {
          canvas.resize.call(canvas);
          ball.locate.call(ball);
          ball.draw.call(ball);
          loop.unregister("resizeCanvas");
          delete canvas.resizing;
        },
        0
      );
    });
   loop.start();
    window.b = {
      loop: loop,
      ball: ball
    };
  };

  window.onload = main;

})();