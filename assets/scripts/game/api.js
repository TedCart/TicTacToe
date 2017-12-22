'use strict'

const config = require('../config')
const store = require('../store')

const createExample = (data) => {
  return $.ajax({
    url: config.apiOrigin + '/examples',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

module.exports = {
  createExample
}
