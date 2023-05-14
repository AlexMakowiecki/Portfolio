const calendar = document.querySelector(".calendar");
const nextButton = calendar.querySelector(".calendar__navigation .next")
const prevButton = calendar.querySelector(".calendar__navigation .previous")
const calendarDays = calendar.querySelector(".calendar__days")
const calendarInput = document.querySelector("#calendar-input")
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

function createDate(datetime){
  const [year, month, day = 1] = datetime.split("-").map(num => parseInt(num));
  return (new Date(year, month-1, day))
}

function createMonthAndYear(month, year){
  const monthAndYear = calendar.querySelector(".calendar__month-and-year");
  const monthDigit = (month+1).toString().padStart(2,"0");
  const monthName = months[month];
  monthAndYear.innerHTML = `<time datetime="${year}-${monthDigit}">${monthName} ${year}</time>`
}

function createDays(numberOfDays, month, year, dayOfWeek){
  const monthDigit = (month+1).toString().padStart(2,"0");
  const daysGrid = calendar.querySelector(".calendar__days");
  const daysGridFragment = document.createDocumentFragment();
  for (let i=1; i<=numberOfDays; i++){
    const day = i;
    const dayDigit = (day).toString().padStart(2,"0");
    const button = document.createElement("button")
    button.innerHTML = `<time datetime="${year}-${monthDigit}-${dayDigit}">${day}</time>`
    daysGridFragment.appendChild(button);
  }
  daysGrid.innerHTML = "";
  daysGrid.appendChild(daysGridFragment);
  daysGrid.children[0].style = `grid-column: ${dayOfWeek+1}`
}

function updateCalendar(date){
  const year = date.getFullYear();
  const month = date.getMonth();
  const dayOfWeek = date.getDay();
  const numberOfDays = (new Date(year, month+1, 0)).getDate();
  createMonthAndYear(month, year);
  createDays(numberOfDays, month, year, dayOfWeek)
}

updateCalendar(new Date());

nextButton.addEventListener("click", () => {
  const timeOfMonthAndYear = calendar.querySelector(".calendar__month-and-year").firstElementChild;
  const currentDate = timeOfMonthAndYear.getAttribute("datetime");
  const auxDate = createDate(currentDate);
  const nextDate = new Date(auxDate.getFullYear(), auxDate.getMonth()+1, 1)
  updateCalendar(nextDate);
})

prevButton.addEventListener("click", () => {
  const timeOfMonthAndYear = calendar.querySelector(".calendar__month-and-year").firstElementChild;
  const currentDate = timeOfMonthAndYear.getAttribute("datetime");
  const auxDate = createDate(currentDate);
  const prevDate = new Date(auxDate.getFullYear(), auxDate.getMonth()-1, 1)
  updateCalendar(prevDate);
})

calendarDays.addEventListener("click", (e) => {
  if (e.target.matches("button")){
    const button = e.target;
    const value = button.firstElementChild.getAttribute("datetime");
    const dateToShow = createDate(value);
    const day = dateToShow.getDate().toString().padStart(2,"0");
    const month = (dateToShow.getMonth()+1).toString().padStart(2,"0");
    const year = dateToShow.getFullYear();
    calendarInput.value = `${day}/${month}/${year}`;
  }
})
