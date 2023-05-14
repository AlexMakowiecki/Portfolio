function buttonsFunctionality (){

  const previousButton = document.querySelector(".previous-button");
  const nextButton = document.querySelector(".next-button");
  const carousel = document.querySelector(".carousel")
  const carouselContents = carousel.getElementsByClassName("carousel__contents")[0];
  const arrayOfSlides = [...carouselContents.querySelectorAll(".carousel__slide")];
  const carouselDots = createDots();
  const arrayOfDots = [...carouselDots.children];
  console.log(arrayOfDots);

  // dots creation
  function createDots (){
    const dotsFragment = document.createDocumentFragment();
    const dotsContainer = document.createElement("div");
    dotsContainer.classList.add("carousel__dots");

    arrayOfSlides.forEach((element, index) => {
      const dot = document.createElement("button");
      dot.classList.add("carousel__dot");
      dot.setAttribute("data-position", index);
      dotsContainer.appendChild(dot);
      console.log(index);
    })

    dotsContainer.firstChild.classList.add("is-selected");
    dotsFragment.appendChild(dotsContainer);
    carousel.appendChild(dotsFragment);
    return dotsContainer;
  }

  function setSlidesPosition(){
    const slidesWidth = arrayOfSlides[0].getBoundingClientRect().width;
    arrayOfSlides.forEach((slide, index) => {
      slide.style.left = slidesWidth * index + "px";
    })
  }
  setSlidesPosition();
  
  nextButton.addEventListener("click", () => {
    const currentSlide = carouselContents.querySelector(".is-selected");
    const nextSlide = currentSlide.nextElementSibling;

    // Slides actualization
    currentSlide.classList.remove("is-selected");
    nextSlide.classList.add("is-selected");

    // Content movement
    carouselContents.style.transform = `translateX(-${getComputedStyle(nextSlide).left})`

    /** Dots actualization */
    const actualDot = carouselDots.querySelector(".is-selected");
    const nextDot = actualDot.nextElementSibling;
    actualDot.classList.remove("is-selected");
    nextDot.classList.add("is-selected");

    // Arrow buttons visibility
    previousButton.hidden = false;
    if (!nextSlide.nextElementSibling)
      nextButton.hidden = true;
  })

  previousButton.addEventListener("click", () => {
    const currentSlide = carouselContents.querySelector(".is-selected");
    const previousSlide = currentSlide.previousElementSibling;
    
    // Slides actualization
    currentSlide.classList.remove("is-selected");
    previousSlide.classList.add("is-selected");

    // Content movement
    carouselContents.style.transform = `translateX(-${getComputedStyle(previousSlide).left})`

    // Dots actualization
    const actualDot = carouselDots.querySelector(".is-selected");
    const previousDot = actualDot.previousElementSibling;
    actualDot.classList.remove("is-selected");
    previousDot.classList.add("is-selected");    

    // Arrow buttons visibility
    nextButton.hidden = false;
    if (!previousSlide.previousElementSibling)
      previousButton.hidden = true;
  })

  carouselDots.addEventListener("click", (e) => {
    if (e.target === carouselDots) return;
    
    const selectedDot = e.target;
    const previousDot = document.querySelector(".carousel__dot.is-selected");
    const selectedIndex = arrayOfDots.findIndex(dot => dot === selectedDot);
    const previousSlide = carouselContents.querySelector(".carousel__slide.is-selected");
    const selectedSlide = arrayOfSlides[selectedIndex];
    const movement = getComputedStyle(selectedSlide).left;
  
  
    // Dots buttons actualization
    arrayOfDots[selectedIndex].classList.add("is-selected");
    previousDot.classList.remove("is-selected");
  
    // Slides actualization
    previousSlide.classList.remove("is-selected");
    selectedSlide.classList.add("is-selected");
  
    // Content movement
    carouselContents.style.transform = `translateX(-${movement})`
  
    // Arrow buttons visibility
    if (selectedIndex === 0){
      previousButton.hidden = true;
      nextButton.hidden = false;
    } else{
      if (selectedIndex === arrayOfDots.length-1){
        nextButton.hidden = true;
        previousButton.hidden = false;
      }
      else{
        nextButton.hidden = false;
        previousButton.hidden = false;
      }
    }

  })

}

buttonsFunctionality();
