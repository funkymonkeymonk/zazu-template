/*
  Based off the API defined at:
  https://developer.todoist.com/rest/v8/#authorization
*/

'use strict'

const axios = require('axios')
const apiUrl = 'https://beta.todoist.com/API/v8'

module.exports = {
  getProjects: (token) => {
    const uri = `${apiUrl}/projects`
    const options = {token}

    return new Promise((resolve, reject) => axios.get(uri, {params: options})
      .then(response => resolve(response.data))
      .catch(error => reject(error.response)))
  },

  getTasksIn: (project, token) => {
    const uri = `${apiUrl}/tasks`
    const options = {
      token,
      project_id: project.id,
    }

    return new Promise((resolve, reject) => axios.get(uri, {params: options})
      .then(response => {
        resolve({
          project,
          todos: response.data.map(item => {
            return {content: item.content}
          }),
        })
      })
      .catch(error => reject(error.response)))
  },
}
