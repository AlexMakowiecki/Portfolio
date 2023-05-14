const foodList = document.querySelector(".FoodList")

foodList.addEventListener("click", (e) => {
  if (!e.target.matches(".FoodInformation > .header")) return;

  const foodInformation = e.target.parentElement;
  const foodContentContainer = foodInformation.querySelector(".content-container");
  const foodContent = foodContentContainer.querySelector(".content");
  const foodContentHeight = foodContent.getBoundingClientRect().height;

  foodInformation.classList.toggle("mOpen");
  foodContentContainer.style.height = foodInformation.matches(".mOpen") ? `${foodContentHeight}px` : 0
})