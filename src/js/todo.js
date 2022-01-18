const addButton = document.querySelector('.register-form--add-button');
const newTaskTitle = document.querySelector('.register-form__newtask');
const newTaskDescription = document.querySelector('.register-form__description');
const tasksContainer = document.querySelector('.tasks-container');

const taskArrState = [];
let renderPage;

const createTask = (title, description) => {
  const newTask = { title, description, state: 'active' };
  taskArrState.unshift(newTask);
  renderPage();
};

const getTaskIndex = (eventTarget) => {
  let index;
  if (eventTarget.localName === 'li') {
    index = eventTarget.classList.item(0);
  } else index = eventTarget.parentNode.classList.item(0);
  return Number.parseInt(index, 10);
};

const completeTask = (event) => {
  const taskIndex = getTaskIndex(event.target);
  const [task] = taskArrState.splice(taskIndex, 1);
  task.state = 'done';
  taskArrState.push(task);
  renderPage();
};

const removeTask = (event) => {
  const taskIndex = getTaskIndex(event.target);
  taskArrState.splice(taskIndex, 1);
  renderPage();
};

const reactivateTask = (event) => {
  if (event.target.localName !== 'button') {
    const taskIndex = getTaskIndex(event.target);
    const [task] = taskArrState.splice(taskIndex, 1);
    task.state = 'active';
    taskArrState.unshift(task);
    renderPage();
  }
};

renderPage = () => {
  tasksContainer.innerHTML = '';
  taskArrState.forEach((element, index) => {
    const newTaskLi = document.createElement('li');
    newTaskLi.className = `${index}`;
    newTaskLi.innerHTML = `<h3 class="task-header">${element.title}</h3>\n`
            + `<p class="task-p">${element.description}</p>\n`
            + '<button class="remove-button">Remove</button>';
    const removeButton = newTaskLi.lastChild;
    removeButton.addEventListener('click', removeTask);
    if (element.state === 'active') {
      removeButton.style.visibility = 'hidden';
      newTaskLi.addEventListener('click', completeTask);
    } else {
      newTaskLi.classList.add('complete-task');
      newTaskLi.addEventListener('click', reactivateTask);
    }
    tasksContainer.appendChild(newTaskLi);
  });
};

addButton.addEventListener('click', (e) => {
  if (newTaskTitle.value !== '') {
    createTask(newTaskTitle.value, newTaskDescription.value);
    newTaskTitle.value = '';
    newTaskDescription.value = '';
  }
  e.preventDefault();
});
