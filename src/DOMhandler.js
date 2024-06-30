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
    }
}

function Select(projectId) {
    //deselect the previously selected element
    document.querySelectorAll('.project').forEach(project => project.classList.remove('selected'));

    document.getElementById(projectId).classList.add('selected');
}
export {displayProjects};