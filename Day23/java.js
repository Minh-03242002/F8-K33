var btn_main = document.querySelector(".btn_main");
var modal = document.querySelector(".modal");
var overlay = modal.querySelector(".overlay");
var register = modal.querySelector(".register");
var login = modal.querySelector(".login");
//
var form_register = modal.querySelector(".form_register");
var form_login = modal.querySelector(".form_login");

//
// ẩn hiện mật khẩu

var eye_off = document.querySelector(".eye_off");
var eye_on = document.querySelector(".eye_on");
var input = document.querySelector("input[type='password']");

btn_main.addEventListener("click", function () {
  modal.classList.add("show");
});
overlay.addEventListener("click", function () {
  modal.classList.remove("show");
});

login.addEventListener("click", function () {
  form_login.style.display = "flex";
  form_register.style.display = "none";
});

register.addEventListener("click", function () {
  form_register.style.display = "block";
  form_login.style.display = "none";
});


eye_on.addEventListener('click',function(){ 
    eye_on.style.display = "none";
    eye_off.style.display = "block";
    input.type = "text"; 
});


eye_off.addEventListener('click',function(){ 
    eye_on.style.display = "block";
    eye_off.style.display = "none";
    input.type = "password"; 
});