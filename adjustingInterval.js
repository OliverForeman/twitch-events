function AdjustingInterval(workFunc, interval, errorFunc) {
  this.expected = 0;
  this.timeout = null;
  this.that = this;
  this.workFunc = workFunc;
  this.interval = interval;
  this.errorFunc = errorFunc;
}

AdjustingInterval.prototype.start = function() {
  this.expected = Date.now() + this.interval;
  this.timeout = setTimeout(this.step.bind(this), this.interval);
}

AdjustingInterval.prototype.stop = function() {
  clearTimeout(this.timeout);
}

AdjustingInterval.prototype.step = function() {
  const drift = Date.now() - this.expected;
  console.log('Drift:', drift)
  if (drift > this.that.interval) {
    if (this.errorFunc) this.errorFunc();
  }
  this.workFunc();
  this.expected += this.that.interval;
  this.timeout = setTimeout(this.step.bind(this), Math.max(0, this.that.interval - drift));
}

module.exports = AdjustingInterval;
