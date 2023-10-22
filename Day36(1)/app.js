const config = {
  SERVER_API: "https://x2tqr6-8080.csb.app/data/",
};

const client = {
  send: async function (url, method = "GET", body = null) {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    const data = await response.json();
    return { response, data };
  },
  get: function (url) {
    return this.send(url);
  },
};

const startButton = document.querySelector(".start-game");
const main = document.querySelector(".main");
const questionElement = document.querySelector(".question");
const optionsContainer = document.querySelector(".options");
const nextButton = document.querySelector(".next");
const restartButton = document.querySelector(".restart");
let currentQuestionIndex = 0;
let score = 0;

let questions = [];

startButton.addEventListener("click", async function () {
  startButton.classList.add("none");
  main.classList.remove("none");

  restartButton.style.display = "none";

  try {
    const response = await client.get(`${config.SERVER_API}`);
    questions = response.data;

    // Hiển thị câu hỏi đầu tiên
    displayQuestion(currentQuestionIndex);
  } catch (error) {
    console.error("Lỗi khi lấy câu hỏi:", error);
  }
});

nextButton.addEventListener("click", function () {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion(currentQuestionIndex);
  } else {
    questionElement.innerHTML = `Kết thúc trò chơi! Số điểm của bạn: ${score}`;
    optionsContainer.innerHTML = "";
    nextButton.style.display = "none";

    restartButton.style.display = "block";
  }
});

restartButton.addEventListener("click", function () {
  score = 0;
  currentQuestionIndex = 0;

  restartButton.style.display = "none";
  nextButton.style.display = "block";

  questionElement.innerHTML = "";

  optionsContainer.innerHTML = "";

  displayQuestion(currentQuestionIndex);
});

function displayQuestion(index) {
  const questionData = questions[index];
  questionElement.textContent = questionData.question;

  optionsContainer.innerHTML = "";

  for (const [key, value] of Object.entries(questionData.options)) {
    const optionButton = document.createElement("button");
    optionButton.classList.add("option");
    optionButton.textContent = `${key}: ${value}`;
    optionButton.addEventListener("click", () =>
      checkAnswer(questionData, key)
    );
    optionsContainer.appendChild(optionButton);
  }
}

function checkAnswer(questionData, selectedOption) {
  const correctAnswer = questionData.answer;

  if (correctAnswer === selectedOption) {
    score += 2;
  }

  const optionButtons = document.querySelectorAll(".option");
  optionButtons.forEach((button) => {
    button.disabled = true;
  });

  nextButton.style.display = "block";
}
