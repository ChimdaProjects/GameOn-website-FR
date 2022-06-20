function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalBtnClosed = document.querySelectorAll(".close");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// issue #1: fermer la modale 
// close modal event
modalBtnClosed.forEach((btn)=> btn.addEventListener("click", closeModal));

// close modal form
function closeModal() {
  modalbg.style.display="none";
  removeErrorsMsg();
  clearValuesForm()
}

