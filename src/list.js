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
        if (projects.length > 0) {
          const projectName = Fuzzy.filter(projectString, projects)[0].original
          const todos = ['todo1', 'todo2', 'todo3']
          response.title = `Current: ${todos[0]}`
          response.subtitle = `View ${projectName} full list`
          response.value = todos.join('\n')
        } else {
          response.title = 'No projects found'
          response.subtitle = ''
          response.value = 'No projects found'
        }
        return [response]
      })
  }
}
