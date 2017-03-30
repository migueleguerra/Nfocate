
// Objeto de cuenta regresiva
function Countdown(timeLimit){

  this.reduceOneSec = function(){
    this.remain--;
  }

  this.advanceStep = function() {
    if (this.currentStep > 0) {
      this.currentStep -= this.step;
    }
    return this.currentStep;
  }

  this.isHalf = function() {
    return (this.currentStep <= this.halfStep);
  }

  this.isQuarter = function() {
    return (this.currentStep <= this.quartStep);
  }

  this.setTime = function(timeLimit) {
    this.initial = timeLimit;
    this.remain = timeLimit * 60;
    this.step = 360 / this.remain;
    this.currentStep = 360;

    this.halfStep = Math.floor(this.currentStep / 2);
    this.quartStep = Math.floor(this.currentStep / 10);
  }

  this.reset = function() {
    this.setTime(this.initial);
  }

  this.getTimeRemain = function(){
    var minutes = Math.floor(this.remain / 60);
    var secs = this.remain % 60;

    return {
      'minutes' : minutes,
      'seconds' : secs
    }
  };

  this.parseTimeRemain = function() {
    var rtime = this.getTimeRemain();
    return ('0' + rtime.minutes).slice(-2) + ":" + ('0' + rtime.seconds).slice(-2);
  };
  // initialize values
  this.setTime(timeLimit);
}

function updateCounter(countTime) {

  var stroke = function() {
    var res;
    if (countTime.isHalf()) {
      res = "#b8cc56";
    }
    if (countTime.isQuarter()) {
      res = "#eb2c36";
    }
    return res;
  };
  
  $('#theCounter').animateLayer('clockGauge', {
    start: 0, end: countTime.currentStep,
  }, 0, function(layer) {
    // Callback function
    $(this).animateLayer(layer, {
      start: 0, end: countTime.advanceStep(),
      strokeStyle: stroke(),
    }, 1000, 'linear', function(layer) {
      countTime.reduceOneSec();
      $(this).setLayer('theText', {
        text: countTime.parseTimeRemain()
      });

      // repeat only if time remains
      if(countTime.remain > 0){
        updateCounter(countTime);
      } else {
        //clearInterval(timeInterval);
        resetCounter(countTime);
        $("#temporizador").scope().temporizadorTermino();
      }
    });
  });
}

function resetCounter(counter) {
  counter.reset();
  $('#theCounter').setLayer('theText', {
    text: counter.parseTimeRemain()
  }).setLayer('clockGauge', {
    strokeStyle: '#3d77ff',
    start: 0, end: 360
  });
  // make sure all is updated
  $('#theCounter').drawLayers();
}

function stopCounter() {
  $('#theCounter').stopLayer('clockGauge', true);
}

function startCounter(counter) {
  // if something is running stop first
  stopCounter();
  // set default state
  resetCounter(counter);
  // run counter
  updateCounter(counter);
}

$( document ).ready(function() {
  var Settings = {};
  Settings.timer = new Countdown(.1);

  var posx = 200;
  var posy = 200;
  var figSize = 300;
  //var timeinterval = setInterval(updateClock,1000);

  //console.log($.jCanvas.defaults);
  
  $('#theCounter').drawArc({
    layer: true,
    name: 'clockGauge',
    strokeStyle: '#3d77ff',
    strokeWidth: 26,
    x: posx, y: posy,
    radius: figSize/2,
    // start and end angles in degrees
    start: 0, end: 360

  }).drawRect({
    layer: true,
    name: 'pushEvent',
    fillStyle: 'rgba(255,255,255,0)',
    groups: ['counter'],
    x: posx, y: posy,
    width: figSize, height: figSize,
    click: function(layer) {
      startCounter(Settings.timer);
    }
  });

  $('#theCounter').drawText({
    name: 'theText',
    layer: true,
    groups: ['counter'],
    fillStyle: '#000',
    strokeWidth: 2,
    x: posx, y: posy,
    fontSize: 72,
    fontFamily: 'Helvetica, Verdana, sans-serif',
    text: Settings.timer.parseTimeRemain()
  });

  $("#counterButton").mousedown(function() {
      $('#theCounter').triggerLayerEvent('pushEvent', 'click');
  });

  $("#counterReset").mousedown(function() {
    stopCounter();
    resetCounter(Settings.timer);
  });

});
