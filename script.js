let tasks = [];

function formatDateTime(value) {
  if (!value) return "";

  let date = new Date(value);

  let day = String(date.getDate()).padStart(2, '0');
  let month = String(date.getMonth() + 1).padStart(2, '0');
  let year = date.getFullYear();

  let hours = String(date.getHours()).padStart(2, '0');
  let minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}-${month}-${year} ${hours}:${minutes}`;
}

function addTask() {
  let text = document.getElementById("taskInput").value;
  let time = document.getElementById("taskTime").value;

  if (text.trim() === "") {
    alert("Enter task");
    return;
  }

  let task = {
    id: Date.now(),
    text: text,
    time: time,
    completed: false
  };

  tasks.push(task);

  document.getElementById("taskInput").value = "";
  document.getElementById("taskTime").value = "";

  renderTasks();
}

function renderTasks() {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach(task => {
    let li = document.createElement("li");

    let textDiv = document.createElement("div");
    textDiv.className = "task-text";
    textDiv.innerHTML = `
      ${task.text}
      <div class="small">${formatDateTime(task.time)}</div>
    `;

    if (task.completed) {
      textDiv.classList.add("completed");
    }

    let actions = document.createElement("div");
    actions.className = "actions";

    let doneBtn = document.createElement("button");
    doneBtn.innerText = "Done";
    doneBtn.onclick = () => toggleComplete(task.id);

    let editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.onclick = () => editTask(task.id);

    let delBtn = document.createElement("button");
    delBtn.innerText = "Delete";
    delBtn.onclick = () => deleteTask(task.id);

    actions.appendChild(doneBtn);
    actions.appendChild(editBtn);
    actions.appendChild(delBtn);

    li.appendChild(textDiv);
    li.appendChild(actions);

    list.appendChild(li);
  });
}

function toggleComplete(id) {
  tasks = tasks.map(task => {
    if (task.id === id) {
      task.completed = !task.completed;
    }
    return task;
  });

  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

function editTask(id) {
  let newText = prompt("Edit task:");
  if (newText === null || newText.trim() === "") return;

  tasks = tasks.map(task => {
    if (task.id === id) {
      task.text = newText;
    }
    return task;
  });

  renderTasks();
}