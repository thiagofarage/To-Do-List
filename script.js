const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

let tasks = [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  console.log("Tarefas salvas no localStorage!!");
}

function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");

  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    console.log("Tarefas carregadas do localStorage:", tasks);
  } else {
    tasks = [];
    console.log("Nenhuma tarefa encontrada no localStorage");
  }
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = task.text;

    const actions = document.createElement("div");
    actions.classList.add("actions");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.addEventListener("click", () => {
      deleteTask(index);
    });

    actions.appendChild(deleteBtn);
    li.appendChild(span);
    li.appendChild(actions);
    taskList.appendChild(li);
  });
}

function addTask(taskText) {
  const newTask = {
    id: Date.now(),
    text: taskText,
    completed: false,
  };

  tasks.push(newTask);

  saveTasks();

  renderTasks();
  console.log("Tarefa adicionada", taskText);
}
function deleteTask(index) {
  const deletedTask = tasks[index];

  tasks.splice(index, 1);

  saveTasks();
  renderTasks();
  console.log("Tarefa removida:", deletedTask.text);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const taskText = input.value.trim();

  if (taskText !== "") {
    addTask(taskText);
    input.value = "";
  } else {
    alert("Por favor, insira uma tarefa válida.");
  }
});

loadTasks();
renderTasks();
