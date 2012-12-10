
(function() {

  var paths = {
    "M": [
      {
        begin: [0.0, 0.0],
        end: [0.0, 1.0]
      }, {
        end: [0.5, 0.4]
      }, {
        end: [1.0, 1.0]
      }, {
        end: [1.0, 0.0]
      }
    ],
    "B": [
      {
        segments: [
          {
            
          }
        ]
      },
      {

      },
      {

      }
    ]
  };

  var Letter = function(options) {
    if (this instanceof Letter) {
      this.canvas = options.canvas;
      this.context = options.context;
      this.letter = "M";
      this.calcWidth = options.calcWidth || function () { return 100; };
      this.calcHeight = options.calcHeight || function () { return 100; };
      this.calcX = options.calcX || function () { return 0; };
      this.calcY = options.calcY || function () { return 0; };
      this.paths = options.paths || paths;
      this.strokeColor = options.strokeColor || "#000000";
      this.calcLineWidth = options.calcLineWidth || function() { return 10; };
      this.drawingStyle = options.drawingStyle || "basic";
    } else {
      return new Letter(options);
    }
  };

  Letter.prototype.locate = function() {
    this.x = this.calcX.call(this);
    this.y = this.calcY.call(this);
  };

  Letter.prototype.resize = function() {
    this.lineWidth = this.calcLineWidth.call(this);
    this.width = this.calcWidth.call(this);
    this.height = this.calcHeight.call(this);
  };



  // START HERE



  Line.prototype.draw = function() {
    this.context.strokeStyle = this.strokeColor;
    if (this.fillColor) {
      this.context.fillStyle = this.fillColor;
    }
    this.context.lineWidth = this.lineWidth;
    return Letter.styles[this.drawingStyle].call(this);
  };

  Line.styles = {
    basic: function () {
      this.context.beginPath();
      this.context.moveTo(this.beginX, this.beginY);
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
    }
  };

  window.Line = Line;

})();