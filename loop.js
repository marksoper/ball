
(function() {

  var Loop = function(options) {
    for (var opt in options) {
      this[opt] = options[opt];
    }
    this.registered = this.registered || [];
    this.active = this.active || false;
    this.interval = this.interval || 50;
  };

  Loop.prototype.register = function(name, fn, order) {
    for (var i in this.registered) {
      if (this.registered[i].name === name) {
        console.log("attempt to make duplicate registration for fn with name: " + name);
        return;
      }
    }
    order = order || this.registered.length;
    this.registered.splice(order, 0, {name: name, fn: fn});
  };

  Loop.prototype.unregister = function(name) {
    for (var i in this.registered) {
      if (this.registered[i].name === name) {
        this.registered.splice(i,1);
        return;
      }
    }
  };

  Loop.prototype.start = function(interval) {
    console.log("loop start");
    this.interval = interval || this.interval;
    this.active = true;
    this._run();
  };

  Loop.prototype.stop = function() {
    console.log("loop stop");
    this.active = false;
  };

  Loop.prototype._next = function() {
    var self = this;
    setTimeout(function() {
      self._run();
    }, this.interval);
  };

  Loop.prototype._runRegistered = function() {
    for (var i in this.registered) {
      this.registered[i].fn();
    }
  };

  Loop.prototype._run = function() {
    if (this.active) {
      this._runRegistered();
      this._next();
    }
  };

  window.Loop = Loop;

}());
