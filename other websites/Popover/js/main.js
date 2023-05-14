const container = document.querySelector(".container");
const popoverTriggers = [...document.querySelectorAll(".popover-trigger")]
const popovers = document.getElementsByClassName("popover");



function calculatePopoverPosition(popover, popoverTrigger){
  const {position} = popover.dataset;
  const popoverRect = popover.getBoundingClientRect();
  const popoverTriggerRect = popoverTrigger.getBoundingClientRect();

  const getHorizontalCenterPoint = elementClientRect => ( elementClientRect.width/2 );
  const getVerticalCenterPoint = elementClientRect => ( elementClientRect.height/2 );
  const getCenteredLeft = elementClientRect => ( elementClientRect.left + getHorizontalCenterPoint(elementClientRect));
  const getCenteredTop = elementClientRect => ( elementClientRect.top + getVerticalCenterPoint(elementClientRect))

  if (position === "top")
    return ({
      left: getCenteredLeft(popoverTriggerRect) - getHorizontalCenterPoint(popoverRect),
      top: popoverTriggerRect.top - popoverRect.height - 20})

  if (position === "bottom")
    return ({
      left: getCenteredLeft(popoverTriggerRect) - getHorizontalCenterPoint(popoverRect),
      top: popoverTriggerRect.top + popoverTriggerRect.height + 20})

  if (position === "left")
    return ({
      left: popoverTriggerRect.left + popoverTriggerRect.width + 20,
      top: getCenteredTop(popoverTriggerRect) - getVerticalCenterPoint(popoverRect)})

  if (position === "right")
    return ({
      left: popoverTriggerRect.left - popoverRect.width - 20,
      top: getCenteredTop(popoverTriggerRect) - getVerticalCenterPoint(popoverRect)})
}

function createPopover (popoverTrigger){
  const {content,target,popoverPosition} = popoverTrigger.dataset;
  const popover = document.createElement("div");
  const p = document.createElement("p");
  p.textContent = content;
  popover.appendChild(p);
  popover.classList.add("popover");
  popover.id = target;
  popover.dataset.position = popoverPosition;
  document.body.appendChild(popover);
  console.log(popover);
  const {left, top} = calculatePopoverPosition(popover, popoverTrigger);
  popover.style.left = `${left}px`;
  popover.style.top = `${top}px`;
  
  return popover;
}

// Close popover when click outside of popover/popover-trigger
document.addEventListener("click", (e) => {
  const popoversArray = [...popovers];
  if (!(e.target.matches(".popover-trigger") || e.target.matches(".popover"))){
    popoversArray.forEach (popover => popover.classList.remove("popover--active"));
    popoverTriggers.forEach(popoverTrigger => popoverTrigger.classList.remove("popover-trigger--active"));
  }
})

// Toggle popover when clicking popover-trigger
container.addEventListener("click", (e) => {
  if (e.target.matches(".popover-trigger")){
    const selectedPopoverTrigger = e.target;
    const selectedPopover = document.getElementById(`${selectedPopoverTrigger.dataset.target}`) || createPopover(selectedPopoverTrigger);

    selectedPopover.classList.toggle("popover--active");
    selectedPopoverTrigger.classList.toggle("popover-trigger--active");
  };
})



