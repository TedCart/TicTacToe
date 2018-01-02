'use strict'

const config = require('../config')
const store = require('../store')

const newGame = () => {
  // Verifies a user is logged in before creating a new game
  if (store.user) {
    return $.ajax({
      url: config.apiOrigin + '/games',
      method: 'POST',
      headers: {
        Authorization: 'Token token=' + store.user.token
      }
    })
  }
}

const getGame = () => {
  // Verifies a user is logged in before getting a game
  if (store.user) {
    return $.ajax({
      url: config.apiOrigin + '/games/' + store.game.id,
      method: 'GET',
      headers: {
        Authorization: 'Token token=' + store.user.token
      }
    })
  }
}

const getAllGames = () => {
  // Verifies a user is logged in before getting all games
  if (store.user) {
    return $.ajax({
      url: config.apiOrigin + '/games',
      method: 'GET',
      headers: {
        Authorization: 'Token token=' + store.user.token
      }
    })
  }
}

const getAllCompletedGames = () => {
  // Verifies a user is logged in before getting all games
  if (store.user) {
    return $.ajax({
      url: config.apiOrigin + '/games?over=true',
      method: 'GET',
      headers: {
        Authorization: 'Token token=' + store.user.token
      }
    })
  }
}

const patchOffsite = function (data) {
  // Verifies a user is logged in before updating a game
  if (store.user) {
    const json = JSON.stringify(data)
    return $.ajax({
      url: config.apiOrigin + '/games/' + store.game.id,
      method: 'PATCH',
      contentType: 'application/json',
      headers: {
        Authorization: 'Token token=' + store.user.token
      },
      data: json
    })
  }
}

module.exports = {
  newGame,
  getGame,
  getAllGames,
  getAllCompletedGames,
  patchOffsite
}
