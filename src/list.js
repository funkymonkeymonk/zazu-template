const Fuzzy = require('fuzzy')
const Todoist = require('./todoist')

const display = (title = '', subtitle = '', value = '') => {
  const output = {
    icon: 'fa-check-square-o',
    title,
    subtitle,
    value,
  }

  return output
}

const getProjects = (token) => {
  return Todoist.getProjects(token)
}

const getItemsIn = (project, token) => {
  return Todoist.getTasksIn(project, token)
}

module.exports = (pluginContext) => {
  return (projectString, { token }) => {
    return getProjects(token)
      .then(projects => {
        if (projects.length > 0) {
          var options = {
            pre: '',
            post: '',
            extract: (project) => project.name,
          }
          const project = Fuzzy.filter(projectString, projects, options)[0].original
          return getItemsIn(project, token)
        }

        const outputs = [
          display('No projects fould', '', 'No projects found'),
        ]
        return {outputs}
      })
      .then(result => {
        if (!result.project) return result.outputs

        const title = result.project.name
        const subtitle = result.todos[0].content

        // TODO: Still need to figure out how to deal with value
        // and followup state. Look at clipboard plugin for inspiration.
        const value = result.project.name + '\n' + result.todos.map(todo => todo.content).join('\n')

        return [
          display(title, subtitle, value),
        ]
      })
  }
}
