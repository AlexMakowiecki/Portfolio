const tasks = document.querySelector(".todo-list__tasks");
const taskForm = document.querySelector(".task-form");

function generateUniqueString(length) {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length)
}

function createTask(inputText){
  const newTask = document.createElement("li");
  const uniqueID = generateUniqueString(10);
  newTask.classList.add("task");
  newTask.innerHTML = 
  ` <input type="checkbox" name="${uniqueID}" id="${uniqueID}" class="hidden-checkbox"/>
    <label class="new-checkbox" for="${uniqueID}"></label>
    <span>${inputText}</span>
    <button class="delete-task-button">
      <div class="diagonal-cross">
        <div class="diagonal-cross__line upper-left-diagonal"></div>
        <div class="diagonal-cross__line upper-right-diagonal"></div>
      </div>
    </button>`
  tasks.querySelector("ul").appendChild(newTask);
}

taskForm.addEventListener("submit", (e) =>{
  e.preventDefault();
  const input = taskForm.querySelector("input");
  const inputText = input.value.trim();
  if (!inputText) return;
  createTask(inputText);
  input.value = "";
})

tasks.addEventListener("click", (e) => {
  if (e.target.matches(".delete-task-button")){
    const task = e.target.parentElement;
    task.remove();
  }
})