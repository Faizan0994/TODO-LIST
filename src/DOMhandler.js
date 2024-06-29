function displayProjects(section, projects) {
    while(section.firstElementChild){
        section.removeChild(section.lastElementChild);
    }

    for(let i = 0; i<projects.length; i++){
        const project = document.createElement('div');
        project.textContent = projects[i][0];
        project.classList.add("project");
        section.appendChild(project);
    }
}

export {displayProjects};