



(function() {

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

  Canvas.prototype.resize = function() {
    this.el.width  = window.innerWidth;
    this.el.height = Math.floor(this.el.width / this.aspectRatio);
    console.log("resizing to " + this.el.width + " by " + this.el.height);
  };


  var Ball = function(options) {
    for (var prop in options) {
      this[prop] = options[prop];
    }
    this.radius = this.radius || 100;
    this.x = this.x || 0;
    this.y = this.y || 0;
    this.canvas = this.canvas || canvas;
  };

  Ball.prototype.draw = function() {

  };

  var main = function() {
    canvasEl = document.getElementById('canvas');
    canvas = new Canvas();
    canvas.resize();
    window.addEventListener("resize", function() {
      canvas.resize.call(canvas);
    });
    var ball = new Ball();
    window.b = {
      ball: ball
    };
  };

  window.onload = main;

})();