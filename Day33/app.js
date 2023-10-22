document.addEventListener("DOMContentLoaded", () => {
  const recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.lang = "vi-VN";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  const action = document.querySelector(".action");
  const result = document.querySelector(".result");

  recognition.onresult = (event) => {
    const text = event.results[0][0].transcript.toLowerCase();
    result.innerText = `đang thực hiện: ` + text;
    result.classList.remove("none");
    action.innerText = "Đã nói xong. Hy vọng kết quả như ý bạn";

    setTimeout(() => {
      result.innerText = `đã thực hiện: ` + text + ` xong`;
      action.innerText = "Đã nói xong. Hy vọng kết quả như ý bạn";

      if (text.includes("google")) {
        window.open("https://www.google.com", "_blank");
      } else if (text.includes("facebook")) {
        window.open("https://www.facebook.com", "_blank");
      } else if (text.includes("youtube")) {
        window.open("https://www.youtube.com", "_blank");
      } else if (text.includes("google drive")) {
        window.open("https://drive.google.com", "_blank");
      } else if (text.includes("google maps") || text.includes("bản đồ")) {
        window.open("https://maps.google.com", "_blank");
      } else if (text.includes("chỉ đường")) {
        const location = text
          .replace(/(chỉ đường|đường tới|tới|điểm đến)/g, "")
          .trim();
        if (location !== "") {
          window.open(
            `https://maps.google.com/maps/dir//${encodeURIComponent(location)}`,
            "_blank"
          );
        }
      } else if (text.includes("bài hát") || text.includes("nghe")) {
        const song = text.replace(/(bài hát|nghe)/g, "").trim();
        if (song !== "") {
          window.open(
            `https://zingmp3.vn/tim-kiem/bai-hat.html?q=${encodeURIComponent(
              song
            )}`,
            "_blank"
          );
        }
      } else if (
        text.includes("video") ||
        text.includes("xem") ||
        text.includes("mở")
      ) {
        const video = text.replace(/(video|xem)/g, "").trim();
        if (video !== "") {
          window.open(
            `https://www.youtube.com/results?search_query=${encodeURIComponent(
              video
            )}`,
            "_blank"
          );
        }
      } else {
        action.innerText = "Không thực hiện được yêu cầu";
        result.innerText = "";
        result.classList.add("none");
      }
    }, 1000); // Đợi 1 giây
  };

  recognition.onspeechend = () => {
    recognition.stop();
  };

  const btn = document.getElementById("btn");

  // add sự kiện
  btn.addEventListener("click", () => {
    action.innerText = "Hãy nói nội dung bạn muốn";
    action.classList.remove("none");
    recognition.start();
  });
});
