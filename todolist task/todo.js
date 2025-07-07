var input = document.querySelector('.todo-input');
var addBtn = document.querySelector('.add-btn');
var clearBtn = document.querySelector('.clear-btn');
var list = document.querySelector('.todo-list');
var counter = document.querySelector('.task-counter');

var todos = [];
var taskNumber = null;

loadTasks();
showTasks();

addBtn.addEventListener('click', function () {
  var taskText = input.value.trim();
  if (taskText === '') return;

  if (taskNumber === null) {
    todos.push({ text: taskText, done: false });
  } else {
    todos[taskNumber].text = taskText;
    taskNumber = null;
    addBtn.textContent = 'Add';
  }

  input.value = '';
  saveTasks();
  showTasks();
});

clearBtn.addEventListener('click', function () {
  var confirmClear = confirm('Are you sure you want to clear all tasks?');
  if (confirmClear) {
    todos = [];
    saveTasks();
    showTasks();
  }
});

function showTasks() {
  list.innerHTML = '';
  counter.textContent = 'Total Tasks: ' + todos.length;

  todos.forEach(function (task, taskIndex) {
    var li = document.createElement('li');

    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.checked = task.done;

    checkbox.addEventListener('change', function () {
      todos[taskIndex].done = checkbox.checked;
      saveTasks();
    });

    var taskText = document.createElement('span');
    taskText.textContent = task.text;

    var buttonContainer = document.createElement('div');
    buttonContainer.className = 'buttons';

    var editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = function () {
      input.value = task.text;
      taskNumber = taskIndex;
      addBtn.textContent = 'Save';
    };

    var deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = function () {
      var confirmDelete = confirm('Delete this task?');
      if (confirmDelete) {
        todos.splice(taskIndex, 1);
        saveTasks();
        showTasks();
      }
    };

    buttonContainer.appendChild(editBtn);
    buttonContainer.appendChild(deleteBtn);

    li.appendChild(checkbox);
    li.appendChild(taskText);
    li.appendChild(buttonContainer);
    list.appendChild(li);
  });
}

function saveTasks() {
  localStorage.setItem('todoList', JSON.stringify(todos));
}

function loadTasks() {
  var saved = localStorage.getItem('todoList');
  if (saved) {
    todos = JSON.parse(saved);
  }
}
