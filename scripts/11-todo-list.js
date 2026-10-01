const todoList = [{
  name: 'make dinner',
  dueDate: '03-20-2026'
}, {
  name:'wash dishes',
  dueDate: '03-30-2026'
}];

renderTodoList();

function renderTodoList() {
  let todoListHTML = '';

  for (let i = 0; i < todoList.length; i++) {
    const todoObject = todoList[i];
    //const name = todoObject.name;

    //a shortcut to comment out, this below is called Destructring, the same function as commented out above
    
    const { name, dueDate } = todoObject;
    const html = `
      <div>${name}</div>
      <div>${dueDate}</div>
      <button onClick="
      todoList.splice(${i}, 1);
      renderTodoList();
      " class="delete-todo-btn">Delete</button>
      `;
    todoListHTML += html;
  }

  document.querySelector('.js-todo-List')
    .innerHTML = todoListHTML;
}

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;

  const dateInputElement = document.querySelector('.js-due-date-input');

  const dueDate = dateInputElement.value
  
  todoList.push({
    //name: name,
    //dueDate: dueDate
    name,
    dueDate
  })

  //above is a shorthand property for object.

  inputElement.value = '';

  renderTodoList();
}

function handleTodoKeydown(event) {
  if (event.key === 'Enter') {
    addTodo();
  }
}