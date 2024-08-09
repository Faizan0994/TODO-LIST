import { deleteFromArray } from "./index";
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

function deleteTask(index){
    let [i,j] = index;
    deleteFromArray(i,j);
}

export {Task, createProject, createTask, deleteTask};