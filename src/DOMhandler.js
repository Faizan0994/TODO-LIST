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

export {displayProjects, displayTasks};