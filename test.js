const addMassege = document.querySelector(".message");
const addButton = document.querySelector(".add");
const todo = document.querySelector(".todo");

let todolist = [];

addButton.addEventListener("click", function () {
  let newTodo = {
    todo: addMassege.value,
    checked: false,
    important: false,
  };

  todolist.push(newTodo);
  displayMessages();
});

function displayMessages() {
  let displayMessages = "";
  todolist.forEach(function (item, index) {
    displayMessages += `
    <li>
      <input type="checkbox" id="item_${index}">
      <label for="item_${index}">${item.todo}</label>
    </li>
    `;
    todo.innerHTML = displayMessages;
  });
}
