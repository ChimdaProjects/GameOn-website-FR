
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
// Element of navbar
const navbar = document.getElementById('myTopnav');
// Element of div class hero-section
const bgsection = document.getElementsByClassName('hero-section');
// Elements of confirmation reservation
const modalMsg = document.querySelector(".confirmation");
const closeBtnConf = document.getElementById('close-conf');
const closeBtnMsg = document.getElementById('close-btn');

// not display confirmation modal
modalMsg.style.display="none";

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  // display the form
  modalbg.style.display = "block";
  // not display the navbar if max width more than 768px
  const mediaSize = window.matchMedia("(min-width:500px) and (max-width: 767px)");
  function changeBackgroundModal() {
    bgsection[0].style.display="none";
  }
  mediaSize.addEventListener('change', changeBackgroundModal) ;
}

// issue #1: fermer la modale 
// close modal event
modalBtnClosed.forEach((btn)=> btn.addEventListener("click", closeModal));
// close modal message confirmation
closeBtnConf.addEventListener("click", closeModalMsg);
// close modal message confirmation by button "fermer"
closeBtnMsg.addEventListener("click", closeModalMsg);
// close modal form
function closeModal() {
  modalbg.style.display="none";
  location.reload();
  
}

function closeModalSubmit() {
  modalbg.style.display="none";
}
function closeModalMsg() { 
    // close modal confirmation
    modalMsg.style.display="none";
    removeErrorsMsg();
    location.reload();
}
