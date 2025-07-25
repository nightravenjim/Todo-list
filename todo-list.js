const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
displayTodoList();

function addTodo() {
  const nameElement = document.querySelector('.js-todo-input');
  const name = nameElement.value;
  const dateElement = document.querySelector('.js-date-input');
  const date = dateElement.value;

  todoList.push({
    name: name,
    date: date
  });

  nameElement.value = '';
  dateElement.value = '';

  saveToStorage();
  displayTodoList();
};

function displayTodoList() {
  let todoListHTML = '';

  todoList.forEach((todoObject) => {
    const name = todoObject.name;
    const date = todoObject.date;

    const html = `
      <div class="name-div">${name}</div>
      <div>${date}</div>
      <button class="delete-button js-delete-button">Delete</button>
    `;

    todoListHTML+= html;
  });

  saveToStorage();

  document.querySelector('.js-todo-grid')
    .innerHTML = todoListHTML;
  
  document.querySelectorAll('.js-delete-button')
    .forEach((deleteButton, index) => {
      deleteButton.addEventListener('click', () => {
        todoList.splice(index, 1);
        saveToStorage();
        displayTodoList();
      });
    });
};

function saveToStorage() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
};

document.querySelector('.js-add-button')
    .addEventListener('click', () => {
      addTodo();
    });