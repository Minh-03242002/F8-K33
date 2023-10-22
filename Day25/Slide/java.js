var carousel = document.querySelector(".carousel");
var carouselInner = carousel.querySelector(".carousel-inner");
var carouselDots = carousel.querySelector(".carousel-dots");
var nextBtn = carousel.querySelector(".next");
var prevBtn = carousel.querySelector(".prev");
var itemWidth = carouselInner.clientWidth;
var items = carouselInner.children;
var totalWidth = items.length * itemWidth;
var position = 0;
carouselInner.style.width = `${totalWidth}px`;

for (var i = 0; i < items.length; i++) {
  var dot = document.createElement("span");
  dot.classList.add("dot");
  carouselDots.appendChild(dot);
}

var dots = carouselDots.querySelectorAll(".dot");

dots.forEach(function (dot, index) {
  dot.addEventListener("click", function () {
    position = -index * itemWidth;
    carouselInner.style.transform = `translateX(${position}px)`;

    dots.forEach(function (dot) {
      dot.classList.remove("active");
    });

    dot.classList.add("active");
  });
});

nextBtn.addEventListener("click", function () {
  if (position > -(totalWidth - itemWidth)) {
    position -= itemWidth;
    carouselInner.style.transform = `translateX(${position}px)`;

    dots.forEach(function (dot) {
      dot.classList.remove("active");
    });

    var activeIndex = Math.abs(position) / itemWidth;
    dots[activeIndex].classList.add("active");
  }
});

prevBtn.addEventListener("click", function () {
  if (position < 0) {
    position += itemWidth;
    carouselInner.style.transform = `translateX(${position}px)`;

    dots.forEach(function (dot) {
      dot.classList.remove("active");
    });

    var activeIndex = Math.abs(position) / itemWidth;
    dots[activeIndex].classList.add("active");
  }
});
