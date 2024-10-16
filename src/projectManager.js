class ProjectManager {
    constructor() {
        this.projects = [];
    }

    addProject(project) {
        this.projects.push(project);
        project['index'] = this.projects.length - 1;
    }

    deleteProject(index) {
        this.projects.splice(index, 1);
        this.projects.forEach((project, i) => {
            project.index = i;
        })
    }

    info() {
        this.projects.forEach((project) => {
            console.log(project.name, project.count);
        });
    }
}