
(function() {

  var Loop = function(options) {
    for (var opt in options) {
      this[opt] = options[opt];
    }
    this.registered = this.registered || [];
    this.active = this.active || false;
    this.interval = this.interval || 250;
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
    this.interval = interval || this.interval;
    this.started = true;
    this.next();
    console.log("loop start");
  };

  Loop.prototype.stop = function() {
    clearTimeout(this.timeout);
    this.started = false;
    console.log("loop stop");
  };

  Loop.prototype.next = function() {
    var self = this;
    for (var i in this.registered) {
      this.registered[i].fn();
    }
    if (this.started) {
      this.timeout = setTimeout(function() {
        self.next();
      }, this.interval);
    } else {
      console.log("loop next called while loop stopped");
    }
  };

  window.Loop = Loop;

}());
