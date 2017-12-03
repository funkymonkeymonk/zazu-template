'use strict'

const axios = require('axios')

const apiUrl = 'https://todoist.com/api/v7'
const options = {
  sync_token: '*',
}

module.exports = {
  getProjects: (token) => {
    const uri = `${apiUrl}/sync`
    options.token = token
    options.resource_types = '["projects"]'

    return new Promise((resolve, reject) => axios.get(uri, {params: options})
      .then(response => {
        // const sync_token = response.data.sync_token
        resolve(response.data.projects)
      })
      .catch(error => {
        reject(error.response)
      }))
  },
}
