'use strict'

const store = require('../store')

const newGameSuccess = function (data) {
  store.game = data.game
  console.log(data.game)
  console.log('id from data.game.id: ', data.game.id)
  console.log('cells from data.game.cells: ', data.game.cells)
  console.log('cells[0] from data.game.cells[0]: ', data.game.cells[0])
  console.log('cells[1] from data.game.cells[1]: ', data.game.cells[1])
  console.log('over from data.game.over: ', data.game.over)
  console.log('player_x from data.game.player_x', data.game.player_x)
  console.log('player_x.id from data.game.player_x.id', data.game.player_x.id)
  console.log('player_x.email from data.game.player_x.email', data.game.player_x.email)
  console.log('player_o from data.game.player_o', data.game.player_o)
}

const newGameFailure = function (error) {
  console.log(error)
}

module.exports = {
  newGameSuccess,
  newGameFailure
}
