
var pomodoro = {
  started : false,
  minutes : 0,
  seconds : 0,
  interval : null,
  minutesDom : null,
  secondsDom : null,
  init : function(){
    var self = this;
    this.minutesDom = document.querySelector('#minutes');
    this.secondsDom = document.querySelector('#seconds');
    this.interval = setInterval(function(){
      self.intervalCallback.apply(self);
    }, 1000);
    document.querySelector('#work').onclick = function(){
      self.startWork.apply(self);
    };
    document.querySelector('#shortBreak').onclick = function(){
      self.startShortBreak.apply(self);
    };
    document.querySelector('#longBreak').onclick = function(){
      self.startLongBreak.apply(self);
    };
    document.querySelector('#stop').onclick = function(){
      self.stopTimer.apply(self);
    };
  },
  resetVariables : function(mins, secs, started){
    this.minutes = mins;
    this.seconds = secs;
    this.started = started;
  },
  startWork: function() {
    this.resetVariables(25, 0, true);
  },
  startShortBreak : function(){
    this.resetVariables(5, 0, true);
  },
  startLongBreak : function(){
    this.resetVariables(15, 0, true);
  },
  stopTimer : function(){
    this.resetVariables(25, 0, false);
    this.updateDom();
  },
  toDoubleDigit : function(num){
    if(num < 10) {
      return "0" + parseInt(num, 10);
    }
    return num;
  },
  updateDom : function(){
    this.minutesDom.innerHTML = this.toDoubleDigit(this.minutes);
    this.secondsDom.innerHTML = this.toDoubleDigit(this.seconds);
  },
  intervalCallback : function(){
    if(!this.started) return false;
    if(this.seconds == 0) {
      if(this.minutes == 0) {
        this.timerComplete();
        return;
      }
      this.seconds = 59;
      this.minutes--;
    } else {
      this.seconds--;
    }
    this.updateDom();
  },
  timerComplete : function(){
    this.started = false;
  }
};
window.onload = function(){
pomodoro.init();
};


function addTask() {
  let input = document.getElementById('input').value;
  let elem = document.createElement('li');
  let btn1 = createButton("Done", markAsDone);
  let btn2 = createButton("Delete", deleteTask);
  let btn3 = createButton("Edit", toggleEdit);

 
  elem.innerText = input;
  elem.setAttribute("readonly", "readonly");
  elem.style.fontSize = "20px";
  elem.style.color = "#330d00";

  styleButton(btn1, "#AEE2FF");
  styleButton(btn2, "#FFB3B3");
  styleButton(btn3, "#CDF0EA");


  let ul = document.querySelector('ul');
  ul.appendChild(elem);
  elem.appendChild(btn1);
  elem.appendChild(btn2);
  elem.appendChild(btn3);

  document.getElementById('input').value = '';
}

function createButton(text, clickHandler) {
  let btn = document.createElement('button');
  btn.innerText = text;
  btn.addEventListener('click', clickHandler);
  return btn;
}


function styleButton(btn, backgroundColor) {
  btn.style.marginLeft = "5%";
  btn.style.marginTop = "3px";
  btn.style.color = "#330d00";
  btn.style.backgroundColor = backgroundColor;
}

function markAsDone() {
  let elem = this.parentElement;
  elem.style.textDecoration = "line-through";
}

function deleteTask() {
  let elem = this.parentElement;
  elem.remove();
}

function toggleEdit() {
  let elem = this.parentElement;

  if (this.innerText.toLowerCase() === "edit") {
      elem.contentEditable = "true";
      this.innerText = "Save";
  } else {
      elem.contentEditable = "false";
      this.innerText = "Edit";
  }
}
document.getElementById('btn').addEventListener('click', addTask);