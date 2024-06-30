import './style.css';
import {createProject, createTask} from './taskConstructor';
import {displayProjects} from './DOMhandler';

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

const projectsTab = document.querySelector('.projects');
displayProjects(projectsTab, projects);