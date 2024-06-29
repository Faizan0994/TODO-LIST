class Task {
    constructor (title, description, date, priority) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.priority = priority;
    }
}

function createProject(name, collection){
    collection.push(new Array(name));
}

export {Task, createProject};