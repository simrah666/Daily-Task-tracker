const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks.forEach(task => renderTask(task));

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const newTask = {
    id: Date.now(),
    text: taskText,
    completed: false
  };
  tasks.push(newTask);
  saveTasks();
  renderTask(newTask);
  taskInput.value = "";
});

function renderTask(task) {
  const li = document.createElement("li");
  li.dataset.id = task.id;
  if (task.completed) li.classList.add("completed");
  
  li.innerHTML = `
    <span>${task.text}</span>
    <div class="actions">
      <button class="done-btn">✔</button>
      <button class="delete-btn">✖</button>
    </div>
  `;
   taskList.appendChild(li);
}

taskList.addEventListener("click", (e) => {
  const btn = e.target;
  const li = btn.closest("li");
  const id = Number(li.dataset.id);

  if (btn.classList.contains("done-btn")) {
    li.classList.toggle("completed");
    tasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    } else if (btn.classList.contains("delete-btn")) {
    li.remove();
    tasks = tasks.filter(task => task.id !== id);
  }

  saveTasks();
});
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
