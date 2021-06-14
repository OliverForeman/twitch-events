// Timer stuff - Start
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
  if (drift > this.that.interval) {
    if (this.errorFunc) this.errorFunc();
  }
  this.workFunc();
  this.expected += this.that.interval;
  this.timeout = setTimeout(this.step.bind(this), Math.max(0, this.that.interval - drift));
}
// Timer stuff - End

// Set up timer for use - Start
let timeRemaining = 5; // Provide time to count down in seconds

const timerOutput = document.getElementById('timer');
const updateTimeDisplay = () => {
  const hours = Math.floor(timeRemaining / (60 * 60));
  const minutes = Math.floor((timeRemaining % (60 * 60)) / 60);
  const seconds = Math.floor((timeRemaining % (60 * 60)) % 60);
  timerOutput.innerText = formatTime(hours) + ':' + formatTime(minutes) + ':' + formatTime(seconds);
};
const formatTime = time => {
  return time > 9 ? time : '0' + time;
};
updateTimeDisplay();

const doWork = () => {
  --timeRemaining;
  if (timeRemaining > -1) {
    updateTimeDisplay();
  }
};

const onError = () => {
  console.error('Drift exceeds the interval.');
};

const counter = new AdjustingInterval(doWork, 1000, onError);
// Set up timer for use - End

// Timer controls for page - Start
const startTimer = () => {
  counter.start();
};
const stopTimer = () => {
  counter.stop();
};
const addFollowTime = () => {
  timeRemaining += 5;
  updateTimeDisplay();
};
// Timer controls for page - End
