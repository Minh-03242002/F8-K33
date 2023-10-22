// tạo tất cả các element
var progressBar = document.querySelector(".progress-bar");
var progress = progressBar.querySelector(".progress");
var progressSpan = progressBar.querySelector("span");
var isDrag = false;
var initialClientX = 0;
var current = 0;
var progressBarWidth = progressBar.clientWidth;
var currentWidth;
var playBtn = document.querySelector(".play-btn");
var currentTime = progressBar.previousElementSibling;
var durationEL = progressBar.nextElementSibling;

var handleChange = function (width) {
  var value = (width * 100) / progressBarWidth;
  if (value < 0) {
    value = 0;
  }
  if (value > 100) {
  }
  progress.style.width = `${value}%`;
  currentWidth = width;
};
progressBar.addEventListener("mousedown", function (e) {
  if (e.which === 1) {
    handleChange(e.offsetX);
    isDrag = true;
    initialClientX = e.clientX;
    current = e.offsetX;
    if (!audio.paused()) {
      audio.paused();
    }
  }
});
progressSpan.addEventListener("mousedown", function (e) {
  e.stopPropagation();
  isDrag = true;
  initialClientX = e.clientX;
});
document.addEventListener("mouseup", function () {
  
    isDrag = false;
  current = currentWidth;
  audio.currentTime = (currentWidth / progressBarWidth) * audio.duration;
  
  if (!audio.paused) {
    audio.play();
  }
});
document.addEventListener("mousemove", function (e) {
  if (isDrag) {
    var moveWidth = e.clientX - initialClientX;
    handleChange(current + moveWidth);
  }
});
var audio = new Audio("./Time.mp3");


var getTime = function (seconds) {
  var mins = Math.floor(seconds / 60);
  var seconds = Math.floor(seconds - mins * 60);
  return ` ${mins < 10 ? "0" + mins : mins}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
};
audio.addEventListener("loadeddata", function () {
  durationEL.innerText = getTime(audio.duration);
});
var playIcon = `<i class="fa-solid fa-play"></i>`;
var pauseIcon = `<i class="fa-solid fa-pause"></i>`;


playBtn.addEventListener("click", function () {
  if (audio.paused) {
    audio.play();
    this.innerHTML = pauseIcon;
  }
 
   else {
    audio.pause();
    this.innerHTML = playIcon;
  }
});
audio.addEventListener("timeupdate", function () {
  // console.log( audio.currentTime);
  currentTime.innerText = getTime(audio.currentTime);
  var value = (audio.currentTime * 100) / audio.duration;
  progress.style.width = `${value}%`;
});



  //
  audio.addEventListener("ended", function () {

 audio.currentTime = 0;
    playBtn.innerHTML = playIcon;
  
    
   
   
   
  });

  
//

