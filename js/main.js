const presentation = document.querySelector(".presentation");
const abilities = document.querySelector(".abilities");
const projects = document.querySelector(".projects");
const education = document.querySelector(".education");
const educationCollege = education.querySelector("education__college");
const educationCourses = education.querySelector("education__courses");


const presentationBiography  = presentation.querySelector(".presentation__biography")
const presentationFront = presentation.querySelector(".presentation__front")
const projectsCarousel = document.getElementsByClassName("projects__carousel")[0];
const carouselLeftButton = document.querySelector(".left-button")
const carouselRightButton = document.querySelector(".right-button")
const collegeInformationSection = document.querySelector(".information-section")

console.log(carouselLeftButton, carouselRightButton, projectsCarousel)

function observerAppearAnimation (entries){
  entries.forEach(entry => {
    const element = entry.target;
    if (entry.isIntersecting){
      if (element.dataset.delay) element.style.animationDelay = element.dataset.delay
      element.classList.add("appeared")
    }
  })
}

function setObserver(){
  const observer = new IntersectionObserver (observerAppearAnimation)
  const elementsToObserve = [...document.querySelectorAll("[data-observe]")]
  elementsToObserve.forEach(element => element.classList.add("transparent"))
  elementsToObserve.forEach(element => observer.observe(element));
}

setObserver();

presentation.addEventListener("mouseover", (e) =>{
  if (e.target.closest(".presentation__container")){
    presentationBiography.classList.add("presentation__biography--visible");
    presentationBiography.style.transform = `translate(${presentationBiography.getBoundingClientRect().width/2}px)`
    presentationFront.style.transform = `translate(-${presentationBiography.getBoundingClientRect().width/2}px)`
  }
})

presentation.addEventListener("mouseout", (e) =>{
  if (e.target.closest(".presentation__container")){
    presentationBiography.style.transform = `translate(0px)`
    presentationFront.style.transform = `translate(0px)`
    presentationBiography.classList.remove("presentation__biography--visible");
  }
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

collegeInformationSection.addEventListener("mouseover", (e) =>{
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

collegeInformationSection.addEventListener("mouseout", (e) =>{
  if (e.target.matches(".question-mark")){
    const exampleBox = e.target.nextElementSibling;
    exampleBox.classList.add("hidden") 
  }
})
