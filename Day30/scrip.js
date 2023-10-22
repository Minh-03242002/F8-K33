var controls = document.querySelector(".controls"); 
var content = document.querySelector("#content"); 
var controlBtns = controls.querySelectorAll(".control-btn"); 
var dropdownToggle = controls.querySelector(".dropdown-toggle"); 
var dropdownMenu = controls.querySelector(".dropdown-menu"); 
var dropdownItems = dropdownMenu.querySelectorAll(".dropdown-item");
var fileName = controls.querySelector("#filename-input"); 
var count = document.querySelector(".count");
const modifyText = function (command, defaultUi, value) {
  document.execCommand(command, defaultUi, value);
};

function resetEditor() {
  fileName.value = "untitled";
  content.textContent = "";
}
//donw text
function saveTextAsTxt() {
  var blob = new Blob([content.innerText]);
  var url = URL.createObjectURL(blob);
  var link = document.createElement("a");
  link.href = url;
  link.download = `${fileName.value}.txt`;
  link.click();
}
//down pdf
function saveAsPdf() {
  html2pdf(content).save(fileName.value);
}

var handlefile = function (value) {
  var action = value.id.split("-")[0];
  dropdownMenu.classList.remove("show");
  switch (action) {
    case "new":
      resetEditor();
      break;
    case "txt":
      saveTextAsTxt();
      break;
    case "pdf":
      saveAsPdf();
      break;
    default:
      break;
  }
};
dropdownToggle.addEventListener("click", function () {
  if (dropdownMenu.classList.contains("show")) {
    dropdownMenu.classList.remove("show");
  } else {
    dropdownMenu.classList.add("show");
  }
});
controlBtns.forEach(function (controlBtn) {
  if (controlBtn.id === "color-btn") {
    controlBtn.addEventListener("change", function () {
      modifyText("foreColor", false, controlBtn.value);
    });
  } else {
    const action = controlBtn.id.split("-")[0];
    controlBtn.addEventListener("click", function () {
      modifyText(action, false, null);
    });
  }
});

dropdownItems.forEach(function (dropdownItem) {
  dropdownItem.addEventListener("click", function () {
    handlefile(this);
  });
});


