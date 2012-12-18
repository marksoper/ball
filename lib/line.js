
(function() {

  var Line = function(options) {
    if (this instanceof Line) {
      this.canvas = options.canvas;
      this.context = options.context;
      this.calcBeginX = options.calcBeginX || function () { return 0; };
      this.calcBeginY = options.calcBeginY || function () { return 0; };
      this.calcEndX = options.calcEndX || function () { return 100; };
      this.calcEndY = options.calcEndY || function () { return 100; };
      this.strokeColor = options.strokeColor || "#000000";
      this.calcLineWidth = options.calcLineWidth || function() { return 10; };
      this.drawingStyle = options.drawingStyle || "basic";
    } else {
      return new Line(options);
    }
  };

  Line.prototype.locate = function() {
    this.beginX = this.calcBeginX.call(this);
    this.beginY = this.calcBeginY.call(this);
    this.endX = this.calcEndX.call(this);
    this.endY = this.calcEndY.call(this);
  };

  Line.prototype.resize = function() {
    this.lineWidth = this.calcLineWidth.call(this);
  };

  Line.prototype.draw = function() {
    this.context.strokeStyle = this.strokeColor;
    if (this.fillColor) {
      this.context.fillStyle = this.fillColor;
    }
    this.context.lineWidth = this.lineWidth;
    return Line.styles[this.drawingStyle].call(this);
  };

  Line.styles = {
    basic: function () {
      this.context.moveTo(this.beginX, this.beginY);
      this.context.beginPath();
      this.context.lineTo(this.endX, this.endY);
      this.context.stroke();
    },
    penSketch: function() {
      var beginX, beginY, endX, endY;
      for (var i=0; i<Math.floor(this.lineWidth); i++) {
        this.context.beginPath();
        beginX = this.beginX;
        beginY = Math.floor(this.beginY + (50 + i/50) * Math.random());
        endX = this.endX;
        endY = Math.floor(this.endY + (50 + i/50) * Math.random());
        this.context.moveTo(beginX, beginY);
        this.context.lineTo(endX, endY);
        this.context.stroke();
      }
    },
    paint: function() {
      var beginX, beginY, endX, endY;
      var targetColor = this.strokeColor;
      for (var i=0; i<Math.floor(this.lineWidth); i++) {
        if (targetColor) {
          this.context.strokeStyle = Color.getRandomBrushColor(targetColor);
        }
        this.context.beginPath();
        beginX = this.beginX;
        beginY = Math.floor(this.beginY + (50 + i/50) * Math.random());
        endX = this.endX;
        endY = Math.floor(this.endY + (50 + i/50) * Math.random());
        this.context.moveTo(beginX, beginY);
        this.context.lineTo(endX, endY);
        this.context.stroke();
      }
    }
  };

  window.Line = Line;

})();