
(function() {

  var Brush = function(options) {
    if (this instanceof Brush) {
      this.canvas = options.canvas;
      this.context = options.context;
    } else {
      return new Brush(options);
    }
  };

  Brush.prototype.point = function(x,y,color) {
    
  };

  window.Brush = Brush;

})();