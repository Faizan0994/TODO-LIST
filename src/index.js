import './style.css';
import {createProject, createTask} from './taskConstructor';
import {displayProjects, displayTasks, displayExtendedTask, displayNewTaskForm, displayNewProjectForm} from './DOMhandler';
import {format} from 'date-fns';

if(localStorage.getItem("projectsArray") === null) {
    var projects = []; //to store all projects

    createProject("Default", projects); //the default project
    createProject("number1", projects);
    createProject("number2", projects);
    createTask(projects[0], "Do something already planned", "This is a very simple task for demonstration", "30/6/2024", "important");
    createTask(projects[0], "Do something again", "This is a very simple task for demonstration", "30/6/2024", "important");
    createTask(projects[1], "Do something new", "This is a very simple task for demonstration", "30/6/2024", "important");
    createTask(projects[1], "Repeat the previous task", "This is a very simple task for demonstration", "30/6/2024", "important");
    createTask(projects[2], "A relatively new task", "This is a very simple task for demonstration", "30/6/2024", "important");
    createTask(projects[2], "This is another task", "This is a very simple task for demonstration", "30/6/2024", "important");
    console.log("default tasks created");
} else {
    var projects = JSON.parse(localStorage.getItem("projectsArray"));
    console.log("already existing data loaded");
}

function refreshProjectsArray(){
    const projectsString = JSON.stringify(projects);
    localStorage.setItem("projectsArray", projectsString);
}

const projectsTab = document.querySelector('.projects');
displayProjects(projectsTab, projects);
document.getElementById('0').classList.add('selected');
displayTasks("0", document.querySelector('.tasks'), projects);//tasks from the default project

document.addEventListener('click', (e) => {
    if(e.target.classList.contains('task')){
        displayExtendedTask(e.target, projects);
    }
});

const deleteFromArray = function(i,j){
    projects[i].splice(j, 1);
    refreshProjectsArray();
    displayTasks(i, document.querySelector('.tasks'), projects);
}

document.querySelector('.add-task-button').addEventListener('click', (e)=>{
    displayNewTaskForm(document.querySelector('.tasks'));
});

function takeTaskFormInput(title, description, date, priority, Id){
    date = format(date, "dd/MM/yyyy");
    createTask(projects[Id], title, description, date, priority);
    refreshProjectsArray();
    displayTasks(Id, document.querySelector('.tasks'), projects);
}

document.querySelector('.add-project').addEventListener('click', (e)=>{
    displayNewProjectForm(document.querySelector('.tasks'));
});

function takeProjectFormInput(projectName){
    createProject(projectName, projects);
    refreshProjectsArray();
    displayProjects(projectsTab, projects);
    displayTasks(projects.length-1, document.querySelector('.tasks'), projects);
    document.getElementById(`${projects.length-1}`).classList.add('selected');
}

export {deleteFromArray, takeTaskFormInput, takeProjectFormInput};