class Task {
    constructor (title, description, date, priority) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.priority = priority;
    }
}

function createTask(project, title, description, date, priority) {
    project.push(new Task(title, description, date, priority));
}

function createProject(name, collection){
    collection.push(new Array(name));
}

export {Task, createProject, createTask};