const inputHolder = document.getElementById("inputHolder");

const enterBtn = document.getElementById("enterBtn");

const listTasks = document.getElementById("taskList");

const clearBtn = document.getElementById("clearBtn");

const clearInputBtn = document.getElementById("clearInputBtn");

const sortBtn = document.getElementById("sortBtn");

let tasks = [];

function saveTaskList() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function retrieveTaskList() {
  let retrievedList = localStorage.getItem("tasks");

  if (retrievedList) {
    tasks = JSON.parse(retrievedList);
  }
}

function swapElements(index1, index2) {
  let saveTask = tasks[index1];
  tasks[index1] = tasks[index2];
  tasks[index2] = saveTask;

  saveTaskList();

  renderTaskList();
}

function renderTaskList() {
  listTasks.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    let li = document.createElement("li");

    let tickBtn = document.createElement("button");

    tickBtn.innerText = tasks[i].completed ? "✅️" : ">";

    let textSpan = document.createElement("span");

    textSpan.innerText = tasks[i].text;

    if (tasks[i].completed) {
      textSpan.style.textDecoration = "line-through";
    }
    let upBtn = document.createElement("button");
    upBtn.innerText = "⬆️";
    let downBtn = document.createElement("button");
    downBtn.innerText = "⬇️";

    upBtn.style.visibility = i === 0 ? "hidden" : "visible";
    downBtn.style.visibility = i === tasks.length - 1 ? "hidden" : "visible";

    li.append(tickBtn);
    li.append(upBtn);
    li.append(downBtn);
    li.append(textSpan);
    listTasks.append(li);

    tickBtn.onclick = () => {
      tasks[i].completed = !tasks[i].completed;
      saveTaskList();
      renderTaskList();
    };

    upBtn.onclick = () => {
      swapElements(i, i - 1);
    };

    downBtn.onclick = () => {
      swapElements(i, i + 1);
    };
  }
}

function addTask() {
  let task = inputHolder.value;

  if (task.length == 0) return;

  tasks.push({
    text: task,
    completed: false,
  });

  saveTaskList();

  renderTaskList();
}

enterBtn.onclick = function () {
  addTask();

  inputHolder.value = "";
};

inputHolder.addEventListener("keyup", function (event) {
  if (event.keyCode == 13) {
    addTask();

    inputHolder.value = "";
  }
});

clearBtn.onclick = () => {
  inputHolder.value = "";
  let newTaskList = [];

  for (let i = 0; i < tasks.length; i++) {
    if (!tasks[i].completed) {
      newTaskList.push(tasks[i]);
    }
  }
  tasks = newTaskList;

  saveTaskList();

  renderTaskList();
};

clearInputBtn.onclick = () => {
  inputHolder.value = "";
};

// sort unfinished first, completed last

sortBtn.onclick = () => {
  tasks.sort((a, b) => {
    return a.completed - b.completed;
  });

  saveTaskList();

  renderTaskList();
};

retrieveTaskList();

renderTaskList();
