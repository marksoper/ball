
(function() {

  var main = function() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var initialCanvasWidth = canvas.width;
    var initialCanvasHeight = canvas.height;
    var initialBallX = canvas.width / 2;
    var initialBallY = canvas.height / 2;
    var clearCanvas = function(canvas, context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
    };
    var resizeCanvas = function(canvas, aspectRatio) {
      canvas.width  = window.innerWidth;
      canvas.height = Math.floor(canvas.width / aspectRatio);
      console.log("resizing to " + canvas.width + " by " + canvas.height);
    };
    var aspectRatio = 1.5;
    resizeCanvas(canvas, aspectRatio);
    var loop = new Loop();
    //
    var ball = colorWheel({
      canvas: canvas,
      context: context,
      x: canvas.width / 2,
      y: canvas.height / 2
    });
    //
    loop.register("redraw", function() {
      clearCanvas(canvas, context);
      ball.draw();
    });
    //
    loop.next();
    window.addEventListener("keypress", function() {
      loop.next.call(loop);
      console.log("onkeypress event");
    });
    //
    window.b = {
      loop: loop,
      ball: ball
    };
    //
  };

  window.onload = main;

})();