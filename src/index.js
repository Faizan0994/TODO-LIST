import './style.css';
import {createProject, createTask} from './taskConstructor';
import {displayProjects} from './DOMhandler';

var projects = []; //to store all projects

createProject("Default", projects); //the default project

const projectsTab = document.querySelector('.projects');
displayProjects(projectsTab, projects);