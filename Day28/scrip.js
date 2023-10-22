//tạo
var progressBar = document.querySelector(".progress-bar");
var progress = progressBar.querySelector(".progress");
var progressSpan = progress.querySelector("span");
var audio = document.querySelector("audio");

var timePreview = progressBar.querySelector(".time-preview");
var handleUpdateValue = function (value) {
  progress.style.width = `${value}%`;
};

var progressBarWidth = progressBar.clientWidth;

var isDrag = false;
var initialClientX = 0;
var current = 0;
var currentWidth;
var handleChange = function (width) {
  var value = (width * 100) / progressBarWidth;
  if (value < 0) {
    value = 0;
  }
  if (value > 100) {
    value = 100;
  }

  progress.style.width = `${value}%`;
  currentWidth = width;
  var currentTime = (value / 100) * audio.duration;
  currentTimeEL.innerText = getTime(currentTime);
};

progressBar.addEventListener("mousedown", function (e) {
  if (e.which === 1) {
    handleChange(e.offsetX);
    isDrag = true;
    initialClientX = e.clientX;
    current = e.offsetX;
    // var currentTime =( value / 100) * audio.duration;
    var currentTime = (currentWidth / progressBarWidth) * audio.duration;
    currentTimeEL.innerText = getTime(currentTime);
    audio.currentTime = currentTime;
  }
});
progressSpan.addEventListener("mousedown", function (e) {
  e.stopPropagation();
  isDrag = true;
  initialClientX = e.clientX;
});

// chống nổi bọt
progressSpan.addEventListener("mousemove", function (e) {
  e.stopPropagation();
});
document.addEventListener("mouseup", function () {
  if (isDrag) {
    isDrag = false;
    // initialValue = value;
    current = currentWidth;
    var value = (currentWidth * 100) / progressBarWidth;
    var currentTime = (value / 100) * audio.duration;
    audio.currentTime = currentTime;
  }
});
document.addEventListener("mousemove", function (e) {
  if (isDrag) {
    var moveWidth = e.clientX - initialClientX;
    handleChange(current + moveWidth);
  }
});
//xây dựng player
// var audio = new Audio("/Day28/Mp3/Haytraochoanh.mp3");
// console.log(audio);
var playBtn = document.querySelector(".play-btn");
var currentTimeEL = progressBar.previousElementSibling;
var durationEL = progressBar.nextElementSibling;
var getTime = function (seconds) {
  // tính số phút
  var mins = Math.floor(seconds / 60);
  // tính số giây còn lại
  seconds = Math.floor(seconds - mins * 60);
  return ` ${mins < 10 ? "0" + mins : mins}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
};
audio.addEventListener("loadeddata", function () {
  durationEL.innerText = getTime(audio.duration);
});

var pauseIcon = `<i class="fa-solid fa-pause"></i>`;
var playIcon = `<i class="fa-solid fa-play"></i>`;
playBtn.addEventListener("click", function () {
  //   console.log(audio.pause);
  if (audio.paused) {
    audio.play();
    this.innerHTML = pauseIcon;
  } else {
    audio.pause();

    this.innerHTML = playIcon;
  }
});
audio.addEventListener("timeupdate", function () {
  // console.log(audio.currentTime);
  currentTimeEL.innerText = getTime(audio.currentTime);
  //
  var value = (audio.currentTime * 100) / audio.duration;
  if (!isDrag) {
    currentTimeEL.innerText = getTime(audio.currentTime);
  }
  progress.style.width = `${value}%`;
});

// Khai báo biến để theo dõi trạng thái kéo tua nhạc
var isSeeking = false;
var seekPosition = 0;

// Khai báo biến cho icon play và pause
var pauseIcon = `<i class="fa-solid fa-pause"></i>`;
var playIcon = `<i class="fa-solid fa-play"></i>`;

// Khai báo biến cho hiển thị thời gian hiện tại
var timerDisplay = currentTimeEL;

// Hàm chuyển đổi thời gian từ giây thành định dạng mm:ss
function getTime(seconds) {
  var mins = Math.floor(seconds / 60);
  seconds = Math.floor(seconds - mins * 60);
  return `${mins < 10 ? "0" + mins : mins}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
}

// Hàm xử lý sự kiện khi kéo thanh tua nhạc
function handleChange(width) {
  timePreview.classList.remove("show");
  timePreview.innerText = 0;
  timePreview.style.left = 0;

  var value = (width * 100) / progressBarWidth;
  if (value < 0) {
    value = 0;
  }
  if (value > 100) {
    value = 100;
  }
  progress.style.width = `${value}%`;
  currentWidth = width;
}

progressBar.addEventListener("mousemove", function (e) {
  timePreview.classList.add("show");
  var rate = (e.offsetX * 100) / progressBarWidth;
  var currentTime = (rate / 100) * audio.duration;
  timePreview.innerText = getTime(currentTime);

  timePreview.style.left = `${e.offsetX}px`;
});
progressBar.addEventListener("mouseout", function () {
  timePreview.classList.remove("show");
  timePreview.innerText = 0;
  timePreview.style.left = 0;
});
audio.addEventListener("ended", function () {
  playBtn.innerHTML = playIcon;
  handleUpdateValue(0);
  audio.currentTime = 0;
});

//xây dựng ELM
var karaoke = document.querySelector(".karaoke");
var karaokeInner = karaoke.querySelector(".karaoke-inner");
var karaokePlayBtn = karaoke.querySelector(".karaoke-play");
var karaokeCloseBtn = karaoke.querySelector(".close");
var player = document.querySelector(".player");
var lyric = karaokePlayBtn.addEventListener("click", function () {
  karaokeInner.style.top = 0;
  player.classList.add("bottom");
});
karaokeCloseBtn.addEventListener("click", function () {
  karaokeInner.style.top = `100%`;
  player.classList.remove("bottom");
});
var karaokeInterval;
// lắng nghe sự kiện play
audio.addEventListener("play", function () {
  console.log("play");

  karaokeInterval = setInterval(handleKaraoke, 100);
});
// lắng nghe sự kiện pause
audio.addEventListener("pause", function () {
  console.log("pause");
  clearInterval(karaokeInterval);
});
var handleKaraoke = function () {
  var currentTime = audio.currentTime * 1000;
  var index = lyric.findIndex(function (lyricItem) {
    return (
      currentTime >= lyricItem.words[0].startTime &&
      currentTime <= lyricItem.words[lyricItem.words.length - 1].endTime
    );
  });
  console.log(index);
};

// ===============
