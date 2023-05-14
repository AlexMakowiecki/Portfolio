{
  const mobileNav =  document.getElementsByTagName("nav")[0];
  function changeNav (mobileButton){
    mobileButton.classList.toggle("mobile-button--open");
    mobileNav.classList.toggle("nav--open")
  }
}

{
  const carrouselMovableBox = document.getElementsByClassName("content__movable-container")[0];
  const maxBoxesAmount = document.getElementsByClassName("movable-container__box").length - 1;
  let currentTransitionAmount = 0;

  function moveCarrousel(button){
    if (button.id == "right-button"){
      currentTransitionAmount-=100;
      carrouselMovableBox.style.transform = "translateX(" + currentTransitionAmount + "%)";
    }else{
      currentTransitionAmount+=100;
      carrouselMovableBox.style.transform = "translateX(" + currentTransitionAmount + "%)";
    }
  }
}

{
  function rotateCard(card){
    const face = card.getElementsByClassName("face");
    face[0].classList.toggle("no-visible");
    face[1].classList.toggle("visible");
  }
}

{
  let previousSelected = undefined;
  function changeDisplayAnswer(questionBox){
    let answer = questionBox.getElementsByClassName("question-box__answer")[0];
    let answerMaxHeight = answer.scrollHeight + "px"; // Initial = "24px"
    let answerMinHeight = answer.style.height; // Initial = ""
    let conditionResult = (answerMinHeight === answerMaxHeight) ? "0px" : answerMaxHeight;
    answer.style.height = conditionResult;
  }
}

window.onload= function() {
  Particles.init({
    selector: ".background",
    connectParticles: true,
    color: "#222222",
    responsive: [
      {
        breakpoint: 500,
        options: {
          maxParticles: 40,
        }
      },
      {
        breakpoint: 700,
        options: {
          maxParticles: 60,
        }
      },
      {
        breakpoint: 900,
        options: {
          maxParticles: 60,
        }
      }
    ]
  })
}