'use strict'

const store = require('../store')

const clearFields = function () {
  $('input:text, input:password').val('')
}

const signUpSuccess = function (data) {
  console.log(data)
  clearFields()
}

const signUpFailure = function (error) {
  console.error(error)
  clearFields()
}

const signInSuccess = function (data) {
  console.log(data)
  $('#message-box').text('Successfully signed in!')
  store.user = data.user
  clearFields()
}

const signInFailure = function (error) {
  console.error(error)
  $('#message-box').text('FAIL. Check your info.')
  clearFields()
}

const changePasswordSuccess = function (data) {
  console.log(data)
  clearFields()
}

const changePasswordFailure = function (error) {
  console.error(error)
  clearFields()
}

const signOutSuccess = function (data) {
  console.log(data)
  store.user = ''
  $('#message-box').text('You signed out!')
  clearFields()
}

const signOutFailure = function (error) {
  console.error(error)
  clearFields()
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure
}
