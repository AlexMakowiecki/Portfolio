const presentation = document.querySelector(".presentation")
const presentationBiography  = presentation.querySelector(".presentation__biography")
const projectsCarousel = document.getElementsByClassName("projects__carousel")[0];
const carouselLeftButton = document.querySelector(".left-button")
const carouselRightButton = document.querySelector(".right-button")
const universityInformationSection = document.querySelector(".information-section")


presentation.addEventListener("mouseover", () =>{
  presentationBiography.hidden = false;
})

presentation.addEventListener("mouseout", () =>{
  presentationBiography.hidden = true;
})


carouselRightButton.addEventListener("click", () => {
  const carouselVisibleWidth = projectsCarousel.clientWidth;
  const carouselRealWidth = projectsCarousel.scrollWidth - carouselVisibleWidth;
  const position = parseFloat(projectsCarousel.dataset.lengthPosition);
  const remainingDistance = (carouselRealWidth - position);
  const movement = (remainingDistance > carouselVisibleWidth) ? carouselVisibleWidth : remainingDistance;
  carouselLeftButton.classList.remove("hidden"); 
  projectsCarousel.style.transform = `translate(-${position + movement}px)`
  projectsCarousel.dataset.lengthPosition = position + movement;
  if (parseFloat(projectsCarousel.dataset.lengthPosition) === carouselRealWidth)
    carouselRightButton.classList.add("hidden");
})

carouselLeftButton.addEventListener("click", () => {
  const carouselVisibleWidth = projectsCarousel.clientWidth;
  const carouselRealWidth = projectsCarousel.scrollWidth - carouselVisibleWidth;
  const position = parseFloat(projectsCarousel.dataset.lengthPosition);
  const remainingDistance = position;
  const movement = (remainingDistance > carouselVisibleWidth) ? carouselVisibleWidth : remainingDistance;
  carouselRightButton.classList.remove("hidden")
  projectsCarousel.style.transform = `translate(-${position - movement}px)`
  projectsCarousel.dataset.lengthPosition = position - movement;
  if (parseFloat(projectsCarousel.dataset.lengthPosition) === 0)
    carouselLeftButton.classList.add("hidden");
})

universityInformationSection.addEventListener("mouseover", (e) =>{
  if (e.target.matches(".question-mark")){
    const questionMark = e.target;
    const exampleBox = e.target.nextElementSibling;
    const questionMarkRect = questionMark.getBoundingClientRect();
    const exampleBoxRect = exampleBox.getBoundingClientRect();
    const containerRect = exampleBox.parentElement.getBoundingClientRect();
    exampleBox.style.left = (questionMark.offsetLeft + questionMarkRect.width + 32)+ "px"
    exampleBox.style.top = (-exampleBoxRect.height/2 + containerRect.height/2) + "px"
    exampleBox.classList.remove("hidden") 
  }
})

universityInformationSection.addEventListener("mouseout", (e) =>{
  if (e.target.matches(".question-mark")){
    const exampleBox = e.target.nextElementSibling;
    exampleBox.classList.add("hidden") 
  }
})
