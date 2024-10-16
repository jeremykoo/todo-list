import { Todo } from "./todo.js";

class Project {
    constructor(name) {
        this.name = name;
        this.todos = [];
    }

    get count() {
        return this.todos.length;
    }

    addTodo(todo) {
        this.todos.push(todo);
        todo['index'] = this.count - 1;
    }

    deleteTodo(index) {
        this.todos.splice(index, 1);
        this.todos.forEach((todo, i) => {
            todo.index = i;
        })
    }
}

export { Project };