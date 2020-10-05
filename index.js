const INPUT_TASK = document.getElementById("task");
const ADD_BTN = document.getElementById("add");
const TASKS_VIEW = document.getElementById("tasks_view");
const CHECK_BTN = document.getElementById("check");
const EDIT_BTN = document.getElementById("edit");
const DELETE_BTN = document.getElementById("delete");
const OK_BTN = document.getElementById("ok_btn");
const EDIT_INPUT = document.getElementById("edit_input");
const form = document.forms["task_example"];
let tasks = [];
let tempTask = "";
let toggleOfOkBtn = true;
let currentTaskIndex;

function addTask() {
  let task = INPUT_TASK.value;
  if (task.length < 3) return alert("matnning uznligi 5 ta belgidan kam !");
  INPUT_TASK.value = "";
  tasks.push({ task, check: false });
  renderTasks();
}

function renderTasks() {
  let result = "";
  for (let i = 0; i < tasks.length; i++) {
    result +=
      '<ul class="list-group list-group-horizontal">' +
      `<li class="list-group-item d-flex justify-content-center align-items-center"><span>${
        i + 1
      }</span></li>` +
      `<li class="list-group-item d-flex justify-content-center align-items-center bg-${
        tasks[i].check ? "success" : "light"
      }"><p class="p-0 m-0">${tasks[i].task}</p></li>` +
      `<li class="list-group-item"><button onclick="checkTask(${i})" class="btn btn-success" id="check"><i class="fas fa-check text-light"></i></button></li>` +
      `<li class="list-group-item"><button onclick="editTask(${i})" class="btn btn-warning" data-toggle="modal" data-target="#edit_modal" id="edit"><i class="far fa-edit text-light"></i></button></li>` +
      `<li class="list-group-item"><button onclick="deleteTask(${i})" class="btn btn-danger" id="delete"><i class="fas fa-trash-alt text-light"></i></button></li>` +
      "</ul>";
  }
  TASKS_VIEW.innerHTML = result;
}

function editTask(index) {
  tempTask = { ...tasks[index] };
  EDIT_INPUT.value = tempTask.task;
  OK_BTN.disabled = toggleOfOkBtn;
  currentTaskIndex = index;
}

function checkTask(index) {
  let task = tasks[index];
  task.check = !task.check;
  renderTasks();
}

function deleteTask(index) {
  tasks = tasks.filter((t, i) => i !== index);
  renderTasks();
}

function save() {
  tasks[currentTaskIndex] = tempTask;
  console.log(tasks);
  tempTask = "";
  toggleOfOkBtn = true;
  renderTasks();
}

form.addEventListener("submit", function (e) {
  addTask();
  e.preventDefault();
});

OK_BTN.addEventListener("click", save);

EDIT_INPUT.addEventListener("keyup", function (e) {
  let task = e.target.value;
  if (task === tempTask.task)
   toggleOfOkBtn = true;
  else toggleOfOkBtn = false;

  tempTask.task = task;

  OK_BTN.disabled = toggleOfOkBtn;
});
