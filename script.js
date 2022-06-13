const inputBoxTodo = document.querySelector("#input-box-todo");
const inputBoxNote = document.querySelector("#input-box-note");
const addButtonTodo = document.querySelector("#add-btn-todo");
const addButtonNote = document.querySelector("#add-btn-note");
const todolist = document.querySelector(".todolist");
const note = document.querySelector(".note");
const clearAllTodo = document.querySelector("#clear-all-todo");
const clearAllNote = document.querySelector("#clear-all-note");

let done = JSON.parse(localStorage.getItem("done") ?? "[]");
let todos = JSON.parse(localStorage.getItem("todos") ?? "[]");
let notes = JSON.parse(localStorage.getItem("notes") ?? "[]");

const updateStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
  localStorage.setItem("done", JSON.stringify(done));
  localStorage.setItem("notes", JSON.stringify(notes));
};

showTasks();
showNotes();

// Tanda + akan disable jika tidak ada text yang diinput
inputBoxTodo.onkeyup = () => {
  let userData = inputBoxTodo.value;

  if (userData.trim() != 0) {
    addButtonTodo.classList.add("active");
  } else {
    addButtonTodo.classList.remove("active");
  }
};
inputBoxNote.onkeyup = () => {
  let userData = inputBoxNote.value;

  if (userData.trim() != 0) {
    addButtonNote.classList.add("active");
  } else {
    addButtonNote.classList.remove("active");
  }
};

// Menambahkan input setelah ditekan +
addButtonTodo.onclick = () => {
  let userData = inputBoxTodo.value;

  if (userData.length > 0) {
    todos.unshift(userData);
  }

  showTasks();
};
addButtonNote.onclick = () => {
  let userData = inputBoxNote.value;

  if (userData.length > 0) {
    notes.unshift(userData);
  }

  showNotes();
};

// Fungsi untuk menampilkan daftar notes
function showNotes() {
  updateStorage();

  const totalNumber = document.querySelector(".totalNumber");
  const totalText = document.querySelector(".totalText");

  totalNumber.textContent = notes.length;

  if (notes.length === 1) {
    totalText.textContent = "note";
  } else {
    totalText.textContent = "notes";
  }

  if (notes.length > 0) {
    clearAllNote.classList.add("active");
  } else {
    clearAllNote.classList.remove("active");
  }

  let newNote = "";
  notes.forEach((element, index) => {
    newNote += `<li id="${index}"></span> ${element} <span onclick="removeItem('note', ${index})"><i class="fa-solid fa-plus"></i></span></li>`;
  });
  note.innerHTML = newNote;
  inputBoxNote.value = null;
  addButtonNote.classList.remove("active");
}

// Fungsi untuk menampilkan daftar to do list
function showTasks() {
  updateStorage();

  console.log(localStorage);
  const pendingNumber = document.querySelector(".pendingNumber");
  const pendingText = document.querySelector(".pendingText");

  pendingNumber.textContent = todos.length;

  if (todos.length === 1) {
    pendingText.textContent = "task";
  } else {
    pendingText.textContent = "tasks";
  }

  if (todos.length > 0 || done.length > 0) {
    clearAllTodo.classList.add("active");
  } else {
    clearAllTodo.classList.remove("active");
  }

  let newTask = "";
  done.forEach((element, index) => {
    newTask += `<li id="${index}"><span onclick="taskUndone(${index})"><i class="fas fa-check-circle"></i></span> <span class="striketrough">${element}</span> <span onclick="removeDone(${index})"><i class="fa-solid fa-plus"></i></span></li>`;
  });
  todos.forEach((element, index) => {
    newTask += `<li id="${index}"><span onclick="taskDone(${index})"><i class="fas fa-circle"></i></span> ${element} <span onclick="removeItem('todo',${index})"><i class="fa-solid fa-plus"></i></span></li>`;
  });
  todolist.innerHTML = newTask;
  inputBoxTodo.value = null;
  addButtonTodo.classList.remove("active");
}

// Menghapus completed task
function removeDone(index) {
  done.splice(index, 1);
  showTasks();
}

// Menghapus task
function removeItem(array, index) {
  if (array === "todo") {
    todos.splice(index, 1);
    showTasks();
  } else {
    notes.splice(index, 1);
    showNotes();
  }
}

// Menandai todo yang sudah selesai
function taskDone(index) {
  remo = todos.splice(index, 1);
  if (remo.length === 1) {
    done.push(remo[0]);
  }
  showTasks();
}

// Undo todo yang sudah selesai
function taskUndone(index) {
  remo = done.splice(index, 1);
  if (remo.length === 1) {
    todos.unshift(remo[0]);
  }
  showTasks();
}

// Clear all
clearAllTodo.onclick = () => {
  todos.splice(0, todos.length);
  done.splice(0, done.length);
  showTasks();
};
clearAllNote.onclick = () => {
  notes.splice(0, notes.length);
  showNotes();
};
