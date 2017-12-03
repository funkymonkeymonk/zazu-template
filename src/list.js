const Fuzzy = require('fuzzy')
const Todoist = require('./todoist')

const getProjects = (token) => {
  return Todoist.getProjects(token)
    .then(projects => projects.map(project => project.name))
}

const response = {
  icon: 'fa-check-square-o',
}

module.exports = (pluginContext) => {
  return (projectString, { token }) => {
    return getProjects(token)
      .then(projects => {
        const value = {}
        value.projects = projects
        if (projects.length > 0) {
          value.projectName = Fuzzy.filter(projectString, value.projects)[0].original
          value.todo = ['todo1']
          response.title = `Current: ${value.todo[0]}`
          response.subtitle = `View ${value.projectName} full list`
        } else {
          response.title = 'No projects found'
          response.subtitle = ''
        }
        response.value = value
        return [response]
      })
  }
}
