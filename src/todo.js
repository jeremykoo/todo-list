import { format } from "date-fns";

class Todo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = "";
        this.checklist = [];
    }

    get formattedDate() {
        return format(this.dueDate, "MM/dd/yyyy");
    }
}

export { Todo };