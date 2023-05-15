const presentation = document.querySelector(".presentation")
const presentationBiography  = presentation.querySelector(".presentation__biography")
const projectsCarousel = document.getElementsByClassName("projects__carousel")[0];
const carouselLeftButton = document.querySelector(".left-button")
const carouselRightButton = document.querySelector(".right-button")
const universityInformationSection = document.querySelector(".information-section")


function setAppearAnimation(){
  const observer = new IntersectionObserver ((entries, observer) =>{
    entries.forEach(entry => {
      const element = entry.target;
      if (entry.isIntersecting){
        if (element.dataset.delay) element.style.animationDelay = element.dataset.delay
        element.classList.add("appeared")
      }
    })
  })
  const presentationFrontContent = [...(presentation.querySelector(".presentation__front").children)];
  const objectives = [...document.querySelectorAll(".objective")];
  const carouselBoxes = [...document.querySelectorAll(".image-box")].slice(0, projectsCarousel.dataset.maxElements)
  const noAnimatedCarouselBoxes = [...document.querySelectorAll(".image-box")].slice(projectsCarousel.dataset.maxElements);
  const sectionTitles = [...document.querySelectorAll("h2")]
  const educationUniversityTitleContent = [...document.querySelector(".education__university__title").children]
  const educationArrows = document.querySelector(".arrows-section");
  const educationCoursesTitle = document.querySelector(".education__courses__title")
  const coursesBoxes = [...document.querySelector(".courses-list").children]
  noAnimatedCarouselBoxes.forEach(box => box.style.opacity = 1)

  observer.observe(educationCoursesTitle)
  observer.observe(educationArrows);
  observer.observe(universityInformationSection);
  coursesBoxes.forEach(box => observer.observe(box))
  educationUniversityTitleContent.forEach(containedElement => observer.observe(containedElement))
  presentationFrontContent.forEach(containedElement => observer.observe(containedElement));
  sectionTitles.forEach(title => observer.observe(title))
  objectives.forEach(objective => observer.observe(objective))
  carouselBoxes.forEach(box => observer.observe(box))
}

setAppearAnimation();


presentation.addEventListener("mouseover", () =>{
  presentationBiography.hidden = false;
  presentationBiography.classList.add("presentation__biography--visible");
})

presentation.addEventListener("mouseout", () =>{
  presentationBiography.hidden = true;
  presentationBiography.classList.remove("presentation__biography--visible");
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
