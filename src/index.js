import "./styles.css";
import { Todo } from "./todo.js";
import { Project } from "./project.js";
import { ProjectManager } from "./projectManager.js";

const project1 = new Project("Today");
const todo1 = new Todo("Buy Groceries", "Visit the store after work and buy vegetables", new Date(2014, 1, 11), "high");
const todo2 = new Todo("Fill up gas", "Drive the SUV and fill up the car before work", new Date(2014, 1, 11), "high");
const todo3 = new Todo("Pick up child", "Make sure to sign out and tell the teacher", new Date(2014, 1, 11), "high");

project1.addTodo(todo1);
project1.addTodo(todo2);
project1.addTodo(todo3);
project1.deleteTodo(1);
project1.deleteTodo(0);
console.log(project1);

const project2 = new Project("Tomorrow");
const todo4 = new Todo("Buy Groceries", "Visit the store after work and buy vegetables", new Date(2014, 1, 11), "high");
const todo5 = new Todo("Fill up gas", "Drive the SUV and fill up the car before work", new Date(2014, 1, 11), "high");
const todo6 = new Todo("Pick up child", "Make sure to sign out and tell the teacher", new Date(2014, 1, 11), "high");

project2.addTodo(todo4);
project2.addTodo(todo5);
project2.addTodo(todo6);


const manager = new ProjectManager();
manager.addProject(project1);
manager.addProject(project2);
manager.info();