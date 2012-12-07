



(function() {

  var loop;
  var canvas;
  var canvasEl;

  var Canvas = function(options) {
    for (var prop in options) {
      this[prop] = options[prop];
    }
    this.aspectRatio = this.aspectRatio || 1.5;
    this.el = this.el || canvasEl;
    this.context = this.context || this.el.getContext('2d');
  };

  var resizeCanvas = function(canvas, aspectRatio) {
    canvas.width  = window.innerWidth;
    canvas.height = Math.floor(canvas.width / aspectRatio);
    console.log("resizing to " + canvas.width + " by " + canvas.height);
  };

  var clearCanvas = function(canvas, context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
  };


  var main = function() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var canvasResizing;
    var aspectRatio = 1.5;
    //
    canvas.resize();
    var loop = new Loop();
    var ball = new Ball({
      canvas: canvas,
      context: context,
      radius: 100,
      locateX: function() {
        Math.floor(this.canvas.width / 2);
      },
      locateY: function() {
        Math.floor(this.canvas.height / 4);
      },
      strokeColor: "#ff0000",
      lineWidth: 10,
      drawingStyle: "penSketch"
    });
    loop.register("redraw", function() {
      clearCanvas(canvas, context);
      ball.locate.call(ball);
      ball.draw.call(ball);
    });
    window.addEventListener("resize", function() {
      if (canvasResizing) {
        console.log("window resize event ignored");
        return;
      }
      console.log("window resize event NOT ignored");
      canvasResizing = true;
      loop.register(
        "resizeCanvas",
        function() {
          resizeCanvas(canvas, aspectRatio);
          ball.locate.call(ball);
          ball.draw.call(ball);
          loop.unregister("resizeCanvas");
          canvasResizing = false;
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