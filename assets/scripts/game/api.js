'use strict'

const config = require('../config')
const store = require('../store')

const signUp = (data) => {
  // const json = JSON.stringify(data)
  console.log('heres what config.apiOrigin is returning: ' + config.apiOrigin + '/sign-up')
  console.log('FYI config.apiOrigin SHOULD look like this: ' + 'https://ga-wdi-boston.herokuapp.com' + '/sign-up')
  console.log('Heres the data youre trying to submit WHICH FOLLOWS ALL THE RULES:')
  console.log(data)
  return $.ajax({
    url: config.apiOrigin + '/sign-up',
    method: 'POST',
    data
  })
}

const signIn = (data) => {
  // const json = JSON.stringify(data)
  return $.ajax({
    url: config.apiOrigin + '/sign-in',
    method: 'POST',
    data
  })
}

const changePassword = (data) => {
  return $.ajax({
    url: config.apiOrigin + '/change-password/' + store.user.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const signOut = () => {
  return $.ajax({
    url: config.apiOrigin + '/sign-out/' + store.user.id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const createExample = (data) => {
  return $.ajax({
    url: 'https://ga-wdi-boston.herokuapp.com' + '/examples',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

module.exports = {
  signUp,
  signIn,
  changePassword,
  signOut,
  createExample
}
