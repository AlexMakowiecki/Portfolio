{
  const offCanvasMenu = document.querySelector(".off-canvas-menu");
  const main = document.querySelector("main")
  const button = document.querySelector("button");
  button.addEventListener("click", toggleDisplayOffCanvasMenu);

  function toggleDisplayOffCanvasMenu (){
    offCanvasMenu.classList.toggle("displayed");
    main.classList.toggle("displayed");
  }
}