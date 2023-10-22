document.addEventListener("DOMContentLoaded", function () {
  const button = document.querySelector("button");
  const counter = document.querySelector(".counter");
  let countdown = 30;
  let waiting = false;

  // hàm cập nhật giá trị cho counter
  function updateCounter() {
    counter.textContent = countdown;
  }
  // hàm tắt bật
  function toggleButton(enabled) {
    button.disabled = !enabled;
    if (enabled) {
      button.classList.remove("disabled");
      button.style.backgroundColor = "transparent";
      button.style.color = "#fff";
    } else {
      button.classList.add("disabled");
    }
  }
  function getLink() {
    if (countdown === 0) {
      window.location.href = "https://www.facebook.com/";
    }
  }
  button.addEventListener("click", function () {
    if (!waiting) {
      getLink();
    }
  });
  //hàm đếm thời gian
  function countdownInSeconds() {
    if (countdown > 0) {
      updateCounter();
      countdown--;
      setTimeout(countdownInSeconds, 1000);
    } else {
      toggleButton(true);
      waiting = false;
    }
  }

  countdownInSeconds();
  // kiểm tea chuyển tab;
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      waiting = true;
    } else {
      countdownInSeconds();
    }
  });
});
