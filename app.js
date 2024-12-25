// Declare task container and get DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Initialize tasks array
let tasks = [];

// Function to create a task element
function createTaskElement(taskText, taskIndex) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = taskText;

  const markBtn = document.createElement('button');
  markBtn.textContent = '✓';
  markBtn.onclick = () => toggleTaskCompletion(taskIndex);

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '×';
  deleteBtn.onclick = () => removeTask(taskIndex);

  li.appendChild(span);
  li.appendChild(markBtn);
  li.appendChild(deleteBtn);
  li.classList.toggle('completed', tasks[taskIndex].completed);

  return li;
}

// Function to add a new task
function addTask(taskText) {
  if (taskText.trim() === '') return;
  const newTask = { text: taskText, completed: false };
  tasks.push(newTask);
  updateTaskList();
}

// Function to toggle task completion
function toggleTaskCompletion(taskIndex) {
  tasks[taskIndex].completed = !tasks[taskIndex].completed;
  updateTaskList();
}

// Function to remove a task
function removeTask(taskIndex) {
  tasks.splice(taskIndex, 1);
  updateTaskList();
}

// Function to update the task list display
function updateTaskList() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const taskElement = createTaskElement(task.text, index);
    taskList.appendChild(taskElement);
  });
}

// Event listener to add task when button is clicked
addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value;
  addTask(taskText);
  taskInput.value = '';
});

// Event listener to add task when Enter key is pressed
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const taskText = taskInput.value;
    addTask(taskText);
    taskInput.value = '';
  }
});

// Initial update for any existing tasks
updateTaskList();
