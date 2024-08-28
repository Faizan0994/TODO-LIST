import { deleteTask } from "./taskConstructor";
import { takeFormInput } from "./index";

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

function displayNewTaskForm(home){
    while(home.firstElementChild){
        home.removeChild(home.lastElementChild);
    }

    //creates the form and all inputs
    const form = document.createElement('form');
    form.action = "";
    
    const legend = document.createElement('legend');
    legend.textContent = "New Task";
    form.appendChild(legend);

    const row1 = document.createElement('div');
    row1.classList.add('form-row');
    const nameLabel = document.createElement('label');
    nameLabel.textContent = "Name:";
    nameLabel.setAttribute('for', 'taskName');
    row1.appendChild(nameLabel);
    const nameInput = document.createElement('input');
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('id', 'taskName');
    nameInput.setAttribute('name', 'taskName');
    row1.appendChild(nameInput);
    form.appendChild(row1);

    const row2 = document.createElement('div');
    row2.classList.add('form-row');
    const descLabel = document.createElement('label');
    descLabel.textContent = "Description:";
    descLabel.setAttribute('for', 'description');
    row2.appendChild(descLabel);
    const descInput = document.createElement('input');
    descInput.setAttribute('type', 'text');
    descInput.setAttribute('id', 'description');
    descInput.setAttribute('name', 'description');
    row2.appendChild(descInput);
    form.appendChild(row2);

    const row3 = document.createElement('div');
    row3.classList.add('form-row');
    const dateLabel = document.createElement('label');
    dateLabel.textContent = "Due Date:";
    dateLabel.setAttribute('for', 'date');
    row3.appendChild(dateLabel);
    const dateInput = document.createElement('input');
    dateInput.setAttribute('type', 'date');
    dateInput.setAttribute('id', 'date');
    dateInput.setAttribute('name', 'date');
    row3.appendChild(dateInput);
    form.appendChild(row3);

    const row4 = document.createElement('div');
    row4.classList.add('form-row');
    const priorityLabel = document.createElement('label');
    priorityLabel.textContent = "Priority:";
    priorityLabel.setAttribute('for', 'priority');
    row4.appendChild(priorityLabel);
    const priorityInput = document.createElement('select');
    priorityInput.setAttribute('id', 'priority');
    priorityInput.setAttribute('name', 'priority');
    const normal = document.createElement('option');
    normal.setAttribute('value', 'normal');
    normal.textContent = "normal";
    priorityInput.appendChild(normal);
    const important = document.createElement('option');
    important.setAttribute('value', 'important');
    important.textContent = "important";
    priorityInput.appendChild(important);
    const optional = document.createElement('option');
    optional.setAttribute('value', 'optional');
    optional.textContent = "optional";
    priorityInput.appendChild(optional);
    row4.appendChild(priorityInput);
    form.appendChild(row4);

    const addTaskButton = document.createElement('button');
    addTaskButton.setAttribute('type', 'submit');
    addTaskButton.classList.add('form-add-task');
    addTaskButton.textContent = "Add Task";
    form.appendChild(addTaskButton);

    home.appendChild(form);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const projectId = document.querySelector('.selected').id;
        takeFormInput(nameInput.value, descInput.value, dateInput.value, priorityInput.value, projectId);
    });
}

export {displayProjects, displayTasks, displayExtendedTask, displayNewTaskForm};