// selectors

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-submit");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// event listeners

document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);


// functions

function addTodo (event) {

    // prevent form from submitting
    event.preventDefault();

    if (todoInput.value === "") {
        return;
    } 

    // add todo to localStorage
    saveLocalTodo(todoInput.value);

    // clear todo input value
    todoInput.value = "";
}

function deleteCheck(event) {
    const item = event.target;

    // on click delete btn
    if(item.classList[0] === "delete-btn") {
        todo = item.parentElement;
        todo.classList.add("fall");

        todo.addEventListener("transitionend", function () {
            // todo.remove();
            removeLocalTodo(todo);
        });
    }

    // on click completed btn
    if(item.classList[0] === "completed-btn") {
        item.parentElement.classList.toggle("completed");
    }
}

function filterTodo(event) {
    const todos = todoList.childNodes;
    const [head, ...tail] = todos

    tail.forEach((todo) => {
        switch(event.target.value) {
            case "all": 
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList[1] === "completed") {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted": 
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
    
}

function saveLocalTodo (todo) {
    // check if already storing
    let todos;

    if (localStorage.getItem("todos") == null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    getTodos();
}

function removeLocalTodo (todo) {
    console.log(todo)
    let todos;

    if (localStorage.getItem("todos") == null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todos.indexOf(todo.children[0].innerText);
    todos.splice(todoIndex, 1)
    localStorage.setItem("todos", JSON.stringify(todos));
    getTodos();
}

function getTodos() {
    let todos;

    if (localStorage.getItem("todos") == null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todoList.innerHTML = "";

    todos.forEach( (todo) => {
        renderTodo(todo);
    });

}

function renderTodo(todo) {
    // todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // new todo
    const newTodo = document.createElement("li");
    newTodo.innerHTML = `${todo}`;
    newTodo.classList.add("todo-item")
    todoDiv.appendChild(newTodo);

    // check button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fa-regular fa-square-check"></i>`;

    completedButton.addEventListener("mouseenter", function() {
        completedButton.innerHTML = `<i class="fa-solid fa-square-check fa-beat"></i>`;
    });
    completedButton.addEventListener("mouseleave", function() {
        completedButton.innerHTML = `<i class="fa-regular fa-square-check"></i>`;
    });

    completedButton.classList.add("completed-btn");
    todoDiv.appendChild(completedButton);

    // delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    deleteButton.classList.add("delete-btn");
    deleteButton.addEventListener("mouseenter", function() {
        deleteButton.innerHTML = `<i class="fa-solid fa-trash fa-bounce"></i>`;
    });
    deleteButton.addEventListener("mouseleave", function() {
        deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    });
    todoDiv.appendChild(deleteButton);

    todoList.appendChild(todoDiv);
}