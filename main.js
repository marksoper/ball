
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

  var randomColor = function() {
    return "#" + (Math.floor(255*Math.random())).toString(16) + (Math.floor(255*Math.random())).toString(16) + (Math.floor(255*Math.random())).toString(16);
  };

  var main = function() {
    var defaultRadius = 100;
    var defaultLineWidth = 10;
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var canvasResizing;
    var aspectRatio = 1.5;
    resizeCanvas(canvas, aspectRatio);
    var initialCanvasWidth = canvas.width;
    var initialCanvasHeight = canvas.height;
    var initialBallX = randomLocate(canvas.width, canvas.width / 4);
    var initialBallY = randomLocate(canvas.height, canvas.width / 4);
    var loop = new Loop();
    var balls = [];
    //
    var makeBall = function() {
      var ball = new Ball({
        canvas: canvas,
        context: context,
        radius: defaultRadius,
        calcX: function() {
          return Math.floor( (initialBallX/initialCanvasWidth) * canvas.width );
        },
        calcY: function() {
          return Math.floor( (initialBallY/initialCanvasHeight) * canvas.height );
        },
        calcRadius: function() {
          return Math.floor(canvas.width / 8);
        },
        calcLineWidth: function() {
          return Math.floor(canvas.width / 80);
        },
        strokeColor: randomColor(),
        lineWidth: defaultLineWidth,
        drawingStyle: "penSketch"
      });
      return ball;
    };
    //
    var makeGround = function() {
      var initialBeginX = 0;
      var initialBeginY = initialBallY + defaultRadius + defaultLineWidth * defaultLineWidth - 3*defaultLineWidth;
      var initialEndX = canvas.width;
      var initialEndY = initialBallY + defaultRadius + defaultLineWidth * defaultLineWidth;
      var ground = new Line({
        canvas: canvas,
        context: context,
        calcBeginX: function() {
          return initialBeginX;
        },
        calcBeginY: function() {
          return Math.floor( (initialBeginY/initialCanvasHeight) * canvas.height );
        },
        calcEndX: function() {
          return initialEndX;
        },
        calcEndY: function() {
          return Math.floor( (initialEndY/initialCanvasHeight) * canvas.height );
        },
        lineWidth: 10,
        drawingStyle: "penSketch"
      });
      return ground;
    };
    //
    //for (var i=0; i<1+Math.floor(Math.random()*3); i++) {
    for (var i=0; i<=0; i++) {
      balls.push(makeBall());
    }
    var ground = makeGround();
    //
    loop.register("redraw", function() {
      clearCanvas(canvas, context);
      balls.forEach(function(ball) {
        ball.locate.call(ball);
        ball.resize.call(ball);
        ball.draw.call(ball);
      });
      ground.locate.call(ground);
      ground.resize.call(ground);
      ground.draw.call(ground);
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
          ground.locate.call(ground);
          ground.resize.call(ground);
          ground.draw.call(ground);
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