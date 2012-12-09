
(function() {

  var resizeCanvas = function(canvas, aspectRatio) {
    canvas.width  = window.innerWidth;
    canvas.height = Math.floor(canvas.width / aspectRatio);
    console.log("resizing to " + canvas.width + " by " + canvas.height);
  };

  var clearCanvas = function(canvas, context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  var randomLocate = function(dimLength, border) {
    border = border || 100;
    return Math.floor(Math.random()*(dimLength - 2*border) + border);
  };

  var main = function() {
    var defaultRadius = 100;
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var canvasResizing;
    var aspectRatio = 1.5;
    resizeCanvas(canvas, aspectRatio);
    var loop = new Loop();
    var balls = [];
    //
    var makeBall = function() {
      var initialCanvasWidth = canvas.width;
      var initialCanvasHeight = canvas.height;
      var initialX = randomLocate(canvas.width, canvas.width / 4);
      var initialY = randomLocate(canvas.height, canvas.width / 4);
      var ball = new Ball({
        canvas: canvas,
        context: context,
        radius: defaultRadius,
        calcX: function() {
          return Math.floor( (initialX/initialCanvasWidth) * canvas.width );
        },
        calcY: function() {
          return Math.floor( (initialY/initialCanvasHeight) * canvas.height );
        },
        calcRadius: function() {
          return Math.floor(canvas.width / 8);
        },
        calcLineWidth: function() {
          return Math.floor(canvas.width / 80);
        },
        strokeColor: "#440000",
        lineWidth: 10,
        drawingStyle: "penSketch"
      });
      return ball;
    };
    //
    for (var i=0; i<1+Math.floor(Math.random()*3); i++) {
      balls.push(makeBall());
    }
    //
    loop.register("redraw", function() {
      clearCanvas(canvas, context);
      balls.forEach(function(ball) {
        ball.locate.call(ball);
        ball.resize.call(ball);
        ball.draw.call(ball);
      });
    });
    //
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
          balls.forEach(function(ball) {
            ball.locate.call(ball);
            ball.resize.call(ball);
            ball.draw.call(ball);
          });
          loop.unregister("resizeCanvas");
          canvasResizing = false;
        },
        0
      );
    });
    //
    loop.start();
    //
    window.b = {
      loop: loop,
      balls: balls
    };
    //
  };

  window.onload = main;

})();