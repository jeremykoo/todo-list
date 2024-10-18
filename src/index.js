import "./styles.css";
import { Todo } from "./todo.js";
import { Project } from "./project.js";
import { ProjectManager } from "./projectManager.js";

const manager = JSON.parse(localStorage.getItem("manager")) || new ProjectManager();
let currentProjectIndex = 0;

if (!localStorage.getItem('manager')) {
    const project1 = new Project("Today");
    const project2 = new Project("Tomorrow");
    manager.addProject(project1);
    manager.addProject(project2);
    const todo1 = new Todo("Buy Groceries", "Visit the store after work and buy vegetables", new Date(2014, 1, 11), "high");
    const todo2 = new Todo("Fill up gas", "Drive the SUV and fill up the car before work", new Date(2015, 3, 12), "high");
    const todo3 = new Todo("Pick up child", "Make sure to sign out and tell the teacher", new Date(2022, 10, 31), "high");

    project1.addTodo(todo1);
    project2.addTodo(todo2);
    project2.addTodo(todo3);
    localStorage.setItem('manager', JSON.stringify(manager));
    displayTodos(project1);
} else {
    displayTodos(manager.projects[0]);
}

function displayProjects() {
    const projectList = document.querySelector(".project-list");
    projectList.innerHTML = "";
    manager.projects.forEach((project) => {
        const newProject = document.createElement("button");
        newProject.classList.add("project");
        newProject.textContent = project.name;
        projectList.appendChild(newProject);

        newProject.addEventListener("click", () => {
            displayTodos(manager.projects[project.index]);
        });
    });
}

function displayTodos(project) {
    const title = document.querySelector(".content .wrapper > h2 > span");
    title.textContent = project.name;
    const todoList = document.querySelector(".todo-list");
    todoList.innerHTML = "";
    project.todos.forEach((todo) => {
        // const htmlString = `
        //     <div class="todo-item">
        //         <div class="expansion">
        //             <div class="heading">
        //                 <h3>${todo.title}</h3>
        //                 <p>-</p>
        //                 <p class="date">${todo.formattedDate}</p>
        //             </div>
        //         </div>
        //     </div>
        // `;
        // todoList.innerHTML = htmlString;

        const newTodo = document.createElement("div");
        newTodo.classList.add("todo-item");

        const heading = document.createElement("div");
        heading.classList.add("heading");
        const dash = document.createElement("p");
        dash.textContent = "-";
        const date = document.createElement("p");
        date.classList.add("date");
        date.textContent = todo.formattedDate;
        const title = document.createElement("h3");
        title.textContent = todo.title;
        heading.appendChild(title);
        heading.appendChild(dash);
        heading.appendChild(date);

        const expansion = document.createElement("div");
        expansion.classList.add("expansion");
        expansion.appendChild(heading);

        newTodo.appendChild(expansion);

        const remove = document.createElement("button");
        remove.textContent = "-";
        newTodo.appendChild(remove);
        remove.addEventListener("click", () => {
            console.log("deleting", project.name, todo.index);
            project.deleteTodo(todo.index);
            displayTodos(project);
        });

        todoList.appendChild(newTodo);

        newTodo.addEventListener("click", () => {
            const d = document.querySelector(`.expansion > .index${todo.index}`);
            if (d === null) {
                const description = document.createElement("p");
                description.classList.add(`index${todo.index}`);
                description.textContent = todo.description;
                expansion.appendChild(description);
            } else {
                d.remove();
            }
        });
    });
    currentProjectIndex = project.index;
}

const dialog = document.getElementById("todoDialog");
const form = document.getElementById("todoForm");
const showButton = document.querySelector(".show");
const confirmButton = document.querySelector(".confirm");

showButton.addEventListener("click", () => {
    dialog.showModal();
});

confirmButton.addEventListener("click", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const title = formData.get('todo_title');
    const date = formData.get('todo_date');
    const desc = formData.get('todo_desc');
    const todo = new Todo(title, desc, date, "", "");
    
    manager.projects[currentProjectIndex].addTodo(todo);
    localStorage.setItem('manager', JSON.stringify(manager));
    displayTodos(manager.projects[currentProjectIndex]);
    dialog.close();
});

displayProjects();