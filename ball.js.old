

console.log("hi out");

(function() {

  console.log("hi");

  var canvas;
  var canvasEl;

  var Canvas = function(options) {
    for (var prop in options) {
      this[prop] = options[prop];
    }
    this.aspectRatio = this.aspectRatio || 1.5;
    this.el = this.el || canvasEl;
    this.context = this.context || this.el.getContext('2d');
    window.addEventListener("resize", this.resize);
  };

  Canvas.prototype.resize = function() {
    console.log("resizing ...");
    this.el.width  = window.innerWidth;
    this.el.height = Math.floor(this.el.width / this.aspectRatio);
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
    var canvasEl = document.getElementById('canvas');
    var canvas = new Canvas();
    var ball = new Ball();
  };

  window.onload = main;

  window.b = {
    canvas: canvas,
    context: context,
    Ball: Ball,
    ball: ball
  };

})();