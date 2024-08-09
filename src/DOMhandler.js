import { deleteTask } from "./taskConstructor";

function displayProjects(section, projects) {
    while(section.firstElementChild){
        section.removeChild(section.lastElementChild);
    }

    for(let i = 0; i<projects.length; i++){
        const project = document.createElement('div');
        project.textContent = projects[i][0];
        project.classList.add("project");
        project.setAttribute('id', `${i}`);
        section.appendChild(project);
        project.addEventListener('click', (e) => Select(e.target.id));
        project.addEventListener('click', (e) => displayTasks(e.target.id, document.querySelector('.tasks'), projects));
    }
}

function Select(projectId) {
    //deselect the previously selected element
    document.querySelectorAll('.project').forEach(project => project.classList.remove('selected'));

    document.getElementById(projectId).classList.add('selected');
}

function displayTasks(projectId, home, collection) {
    projectId = projectId*1; //to convert id to integer
    while(home.firstElementChild){
        home.removeChild(home.lastElementChild);
    }

    for(let i = 1; i<collection[projectId].length; i++){
        const currentTask = collection[projectId][i];
        const task = document.createElement('div');
        task.classList.add('task');
        task.setAttribute("data-code", `${projectId}${i}`);

        if(currentTask.priority === "important") {
            task.classList.add('important');
        } else if(currentTask.priority === "optional") {
            task.classList.add('optional');
        } else {
            task.classList.add('normal');
        }

        const taskName = document.createElement('p');
        taskName.classList.add('task-name');
        taskName.textContent = currentTask.title;
        task.appendChild(taskName);

        const taskDate = document.createElement('p');
        taskDate.classList.add('date');
        taskDate.textContent = currentTask.date;
        task.appendChild(taskDate);

        home.appendChild(task);
    }
}

function displayExtendedTask(taskElement, collection) {

    if(taskElement.classList.contains('extended')){
        taskElement.classList.remove('extended');
        taskElement.removeChild(document.querySelector('.description'));
        taskElement.removeChild(document.querySelector('.removeTaskButton'));
    } else {
        let index = taskElement.dataset.code;
        let [i,j] = index;
        const task = collection[i][j];

        taskElement.classList.add('extended');
    
        const desc = document.createElement('p');
        desc.classList.add('description');
        desc.textContent = task.description;
        const removeTaskButton = document.createElement('button');
        removeTaskButton.innerHTML = "Remove";
        removeTaskButton.classList.add('removeTaskButton');
        removeTaskButton.addEventListener('click', (e) => deleteTask(e.target.parentElement.dataset.code));

        taskElement.appendChild(desc);
        taskElement.appendChild(removeTaskButton);
    }
}

export {displayProjects, displayTasks, displayExtendedTask};