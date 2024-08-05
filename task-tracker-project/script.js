document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('task-input');
  const addTaskButton = document.getElementById('add-task-button');
  const taskList = document.getElementById('task-list');

  // Load tasks from localStorage
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Function to render tasks
  const renderTasks = () => {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
      const li = document.createElement('li');
      li.className = 'task-item';
      li.innerHTML = `
        <span>${task}</span>
        <div>
          <button class="edit-button" onclick="editTask(${index})">Edit</button>
          <button class="delete-button" onclick="deleteTask(${index})">Delete</button>
        </div>
      `;
      taskList.appendChild(li);
    });
  };

  // Function to save tasks to localStorage
  const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  // Function to add a task
  const addTask = () => {
    const task = taskInput.value.trim();
    if (task) {
      tasks.push(task);
      taskInput.value = '';
      renderTasks();
      saveTasks();
    }
  };

  // Function to edit a task
  const editTask = (index) => {
    const newTask = prompt('Edit task:', tasks[index]);
    if (newTask) {
      tasks[index] = newTask;
      renderTasks();
      saveTasks();
    }
  };

  // Function to delete a task
  const deleteTask = (index) => {
    tasks.splice(index, 1);
    renderTasks();
    saveTasks();
  };

  // Event listener for the Add Task button
  addTaskButton.addEventListener('click', addTask);

  // Expose functions to the global scope for onclick to work
  window.editTask = editTask;
  window.deleteTask = deleteTask;

  // Initial render of tasks
  renderTasks();
});
