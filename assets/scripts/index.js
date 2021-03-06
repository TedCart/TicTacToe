'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const events = require('./login/events')
const ui = require('./login/ui')
const gameEvents = require('./game/events')

$(() => {
  setAPIOrigin(location, config)
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  events.addHandlers()
  ui.toggleSignInButtons()
  gameEvents.addHandlers()
  gameEvents.newTitle()
  // $('#sign-in-email').val('okherewego')
  // $('#sign-in-password').val('jack')
  $('#player-one-side').html(`<p>Player 1</p>`)
  $('#player-one-bottom').html(`<p>Player 1</p>`)
})
