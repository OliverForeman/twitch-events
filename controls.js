const addSubTime = () => {
  localStorage.setItem('subTime', 1800);
};

const addFollowTime = () => {
  localStorage.setItem('followTime', 300);
};

const startTimer = () => {
  localStorage.setItem('timerActive', true);
};

const stopTimer = () => {
  localStorage.setItem('timerActive', false);
};
