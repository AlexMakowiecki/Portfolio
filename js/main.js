const presentation = document.querySelector(".presentation");
const abilities = document.querySelector(".abilities");
const projects = document.querySelector(".projects");
const education = document.querySelector(".education");
const educationCollege = education.querySelector("education__college");
const educationCourses = education.querySelector("education__courses");

const presentationContainer = presentation.querySelector(".presentation__container")
const presentationBiography  = presentation.querySelector(".presentation__biography")
const presentationFront = presentation.querySelector(".presentation__front")
const projectsCarousel = document.getElementsByClassName("projects__carousel")[0];
const carouselLeftButton = document.querySelector(".left-button")
const carouselRightButton = document.querySelector(".right-button")
const collegeInformationSection = document.querySelector(".information-section")


const mobileInfoButton = document.querySelector(".mobile-info-button");

mobileInfoButton.addEventListener("click", () => {
  const informationList = document.querySelector(".information-list");
  const header = document.querySelector("header")
  attachElement(informationList, header, 4, "bottom");
  console.log(informationList)
  informationList.classList.toggle("visible");
})


function getPosition(domElement){
  const elementRect = domElement.getBoundingClientRect();
  const x = elementRect.x;
  const y = elementRect.y + window.scrollY;
  return {x,y};
}

function attachElement(domElement, domElementReference, separation = 0, position){
  const elementRect = domElement.getBoundingClientRect();
  const referencePosition = getPosition(domElementReference);
  const referenceRect = domElementReference.getBoundingClientRect();
    const top = (position === "top")
      ? referencePosition.y - elementRect.height - separation
      : referencePosition.y + elementRect.height + separation;
  let left = referencePosition.x - ((elementRect.width-referenceRect.width)/2);
  const spaceTaken = left + elementRect.width;
  if (spaceTaken > window.innerWidth) left -= spaceTaken - window.innerWidth;
  domElement.style.top = top + "px";
  domElement.style.left = left + "px";
}

let previousExplanationBox;
document.addEventListener("click", (e) => {
  if (e.target.closest(".explanation-box")) return;
  if (e.target.matches(".info-box")) {
    const infoBox = e.target;
    const position = getPosition(infoBox);
    const explanationBox = document.querySelector(`[data-target = ${infoBox.dataset.theme}]`);
    attachElement(explanationBox, infoBox, 10,"top")
    explanationBox.classList.toggle("hidden");
    if (previousExplanationBox && (previousExplanationBox !== explanationBox)) previousExplanationBox.classList.add("hidden");
    previousExplanationBox = explanationBox;
  } else {
    if (previousExplanationBox) previousExplanationBox.classList.add("hidden");
  }
})


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

presentationContainer.addEventListener("mouseenter", () =>{
  console.log("enter")
  presentationBiography.classList.add("presentation__biography--visible");
  presentationBiography.style.transform = `translate(${presentationBiography.getBoundingClientRect().width/2}px)`
  presentationFront.style.transform = `translate(-${presentationBiography.getBoundingClientRect().width/2}px)`
})

presentationContainer.addEventListener("mouseleave", () =>{
  console.log("exit")
  presentationBiography.style.transform = `translate(0px)`
  presentationFront.style.transform = `translate(0px)`
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
