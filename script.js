document.addEventListener("DOMContentLoaded", () => {
    const todoList = document.getElementById("todoList");
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    savedTasks.forEach(task => {
        const li = createTaskElement(task.text, task.id);
        todoList.appendChild(li);
    });
});

function addTask() {
    const input = document.getElementById("todoInput");
    const taskText = input.value.trim();

    if (taskText !== "") {
        const li = createTaskElement(taskText);
        document.getElementById("todoList").appendChild(li);

        saveTaskToLocalStorage(taskText);
        input.value = "";
    }
}

function createTaskElement(taskText, id) {
    const li = document.createElement("li");
    li.setAttribute("data-task-id", id);

    const span = document.createElement("span");
    span.textContent = taskText;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");
    deleteButton.onclick = () => deleteTask(id);

    li.appendChild(span);
    li.appendChild(deleteButton);

    return li;
}

function deleteTask(id) {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = savedTasks.filter(task => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    const li = document.querySelector(`li[data-task-id="${id}"]`);
    if (li) {
        li.remove();
    }
}

function saveTaskToLocalStorage(taskText) {
    const id = Date.now();
    const task = {
        text: taskText,
        id: id,
    };

    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
}