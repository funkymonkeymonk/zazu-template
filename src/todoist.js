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
      .then(response => {
        // const sync_token = response.data.sync_token
        resolve(response.data)
      })
      .catch(error => {
        reject(error.response)
      }))
  },
}
