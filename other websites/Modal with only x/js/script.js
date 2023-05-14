const closeButton = document.querySelector(".jsModalClose");
const modalOverlay = document.querySelector(".jsModalOverlay");
const clickMeButton = document.querySelector(".jsModalButton");

clickMeButton.addEventListener("click", () => {
  modalOverlay.classList.add("modal-overlay--open");
})  

closeButton.addEventListener("click", () => {
  modalOverlay.classList.remove("modal-overlay--open")
})

modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay){
    modalOverlay.classList.remove("modal-overlay--open")
  }
})