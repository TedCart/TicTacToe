'use strict'

const store = require('../store')
const gameEvents = require('../game/events')

const clearFields = function () {
  $('input:text, input:password').val('')
}

const fetchPlayerProfile = function () {
  if (store.user) {
    let HTMLstring = ''
    HTMLstring = HTMLstring + '<p> Player 1: ' + store.user.email + '</p>'
    const gameList = gameEvents.onGetAllCompletedGames()
    if (gameList) {
      HTMLstring = HTMLstring + '<p> Games Completed: ' + gameList.length + '</p>'
    } else {
      HTMLstring = HTMLstring + '<p> Games Completed: ' + '0' + '</p>'
    }
    $('#player-one-side').html(HTMLstring)
    $('#player-one-bottom').html(HTMLstring)
  }
}

const toggleSignInButtons = function () {
  console.log(store.user)
  if (store.user) {
    $('#sign-in-form').css('display', 'none')
    $('#createAccountButton').css('display', 'none')
    $('#changePasswordButton').css('display', 'block')
    $('#sign-out').css('display', 'block')
  } else {
    $('#sign-in-form').css('display', 'block')
    $('#createAccountButton').css('display', 'block')
    $('#changePasswordButton').css('display', 'none')
    $('#sign-out').css('display', 'none')
  }
}

const signUpSuccess = function (data) {
  console.log(data)
  $('#message-box').text('Successfully created account!')
  clearFields()
  toggleSignInButtons()
}

const signUpFailure = function (error) {
  console.error(error)
  $('#message-box').text('FAIL. Check your info.')
  clearFields()
}

const signInSuccess = function (data) {
  console.log(data)
  $('#message-box').text('Successfully signed in!')
  store.user = data.user
  clearFields()
  toggleSignInButtons()
  fetchPlayerProfile()
  gameEvents.onNewGame()
}

const signInFailure = function (error) {
  console.error(error)
  $('#message-box').text('FAIL. Check your info.')
  clearFields()
}

const changePasswordSuccess = function (data) {
  console.log(data)
  clearFields()
  toggleSignInButtons()
}

const changePasswordFailure = function (error) {
  console.error(error)
  clearFields()
}

const signOutSuccess = function (data) {
  // console.log(data)
  store.user = ''
  $('#message-box').text(`You signed out!`)
  clearFields()
  toggleSignInButtons()
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
  signOutFailure,
  toggleSignInButtons
}
