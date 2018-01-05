'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)

const api = require('./api')
const ui = require('./ui')
const store = require('../store')

let turnsTaken = 0
let wrongClicks = 0
let trollState = 0

let over = false // is it game over? Not yet!!

const offlineMesssage = `<p class="message-offline">You are playing offline. This game won't be saved. Login if you want to save and review player stats.</p>`

const newTitle = function () {
  const things = [
    `Ticky-Tacky`,
    `Hashtag: The Game`,
    `The Toc-Tack-Tick`,
    `A game of broken clock sounds`,
    `X vs. O: The Ultimate Showdown`,
    `It's Fun. Shut up.`,
    `If anyone wins, you should both feel bad.`,
    `Because there's literally nothing else to do`,
    `2 letters enter, 1 letter leaves...`
  ]
  const messageSelector = Math.floor(Math.random() * things.length)
  $('#game-subtitle').text(things[messageSelector])
}

const checkForOnline = function () {
  if (store.user) {
    $('#offline-message-box').html('')
  } else {
    $('#offline-message-box').html(offlineMesssage)
  }
}

const onNewGame = function () {
  checkForOnline()
  if (store.user) {
    api.newGame()
      .then(ui.newGameSuccess)
      .catch(ui.newGameFailure)
    $('#offline-message-box').html('')
  }
  newTitle()
}

// returns a single game based on the current stored id
// game is an object with id, cells, over, player_x, and player_o
// (each player is an object with id number and email)
const onGetGame = function () {
  if (!store.game.id) {
    // console.log('We dont have a game ID to call')
  } else {
    api.getGame()
      .then(ui.getGameSuccess)
      .catch(ui.getGameFailure)
  }
}

// returns all games based on the current player logged in
// games (plural) is an object with keys 0, 1, 2, 3, etc. each referencing a game object
// a game is an object with id, cells, over, player_x, and player_o (each player is an object with id number and email)
const onGetAllGames = function () {
  if (store.user) {
    api.getAllGames()
      .then(ui.getAllGamesSuccess)
      .catch(ui.getAllGamesFailure)
  }
}

const onGetAllCompletedGames = function () {
  if (store.user) {
    api.getAllCompletedGames()
      .then(ui.getAllCompletedGamesSuccess)
      .catch(ui.getAllCompletedGamesFailure)
  }
}

// this boardArray represents the game-board. It's how we check for a winner.
// it is 10 units long (instead of 9) so that the index of each element lines up with the
// TicTacToe board like on a phone number pad.
const boardArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

// This prototype function lets me remove entire elements with a single line
Element.prototype.remove = function () {
  this.parentElement.removeChild(this)
}

const gameOverMessageFunction = function (gameMessage) {
  const messageHTML = '<p>' + gameMessage + '</p><p>Click board to play again</p>'
  $('#message-box').html(messageHTML)
}

const resetBoard = function () {
  // Set turnsTaken to 0
  turnsTaken = 0
  over = false

  $('.game-square').text('')
  for (let i = 0; i < boardArray.length; i++) {
    boardArray[i] = 0
    if ($('.game-square')[i]) {
      $('.game-square')[i].removeAttribute('data-team')
    }
  }
  $('#message-box').text('')
  onNewGame()
}

const updateOffsite = function () {
  // This updates the api's game file, otherwise the game will only run locally
  // This function only runs if a player is logged in.
  if (store.user) {
    for (let i = 0; i < store.game.cells.length; i++) {
      const gameSquareID = '#' + (i + 1)
      if ($(gameSquareID)[0].dataset.team) {
        let newLetter
        if (boardArray[i + 1] === 0) {
          newLetter = ''
        } else if (boardArray[i + 1] === 1) {
          newLetter = 'x'
        } else {
          newLetter = 'o'
        }
        store.game.cells[i] = newLetter
        const newBoardInfo = {
          game: {
            cell: {
              index: i,
              value: newLetter
            },
            over: over
          }
        }
        api.patchOffsite(newBoardInfo)
      }
    }
  }
}

const WinnerWinner = function (winningTeam) {
  // create a victory message
  const team = (winningTeam === 1 ? 'X' : 'O')
  const otherTeam = (team === 'X' ? 'O' : 'X')
  const winMessages = [
    `Well la-dee-dah, ${team} wins!`,
    `Congratulations, ${team}! We're all very proud of how much you won.`,
    `Let it go, ${otherTeam}! ${team} is the winner!`,
    `You did it, ${team}! You really did it!`,
    `Good for ${team}! Next stop: fame and glory!`
  ]
  const messageSelector = Math.floor(Math.random() * winMessages.length)

  over = true
  gameOverMessageFunction(winMessages[messageSelector])
}

const tieGameMessage = function () {
  const tieMessages = [
    `Tie! It's almost like you both know how to play TicTacToe...`,
    `Oh wow a tie game. What a surprise.`,
    `Well shucks, how did this become a tie game?`,
    `A tie game?! I don't believe it!`,
    `Even though X had more turns, it's still a tie game.`,
    `Did you know? "Tie game" is english for "TicTacToe" is boring.`,
    `Would you like to play a game of thermonuclear war?`,
    `Wake up, Neo.`
  ]
  const messageSelector = Math.floor(Math.random() * tieMessages.length)
  over = true
  gameOverMessageFunction(tieMessages[messageSelector])
  // $('#message-box').append('<p>Click anywhere on the board to play again...</p>')
}

const trollText = function (teamInSquare) {
  const team = (teamInSquare === 1 ? 'X' : 'O')
  const trollMessages = [
    `Having fun clicking that box?`,
    `Yeah, clicking is pretty fun I guess...`,
    `I like to click things that matter, though`,
    `Like empty squares that are still available.`,
    `Dude, you can't go there.`,
    `${team} already went there.`,
    `Please stop doing that`,
    `I feel like you aren't listening.`,
    `You never listen.`,
    `Or wash the dishes.`,
    `Do you find this amusing?`,
    `Well it's not.`,
    `It's childish, quite frankly.`,
    `ヽ(ಠ_ಠ)ノ`,
    `＼(｀0´)／`,
    `I can't believe Ted's letting you play this.`,
    `Click an empty box already!`,
    `You're awful at following directions.`,
    `If you're struggling to choose, maybe this will help:`,
    `The Road Not Taken`,
    `By Robert Frost`,
    `Two roads diverged in a yellow wood`,
    `And sorry I could not travel both`,
    `And be one traveler, long I stood`,
    `And looked down one as far as I could`,
    `To where it bent in the undergrowth;`,
    `...are you still reading this?`,
    `cuz if you are, I really hope it's helping you make a decision.`,
    `Ok, ok, here's the rest:`,
    `Then took the other, as just as fair,
    And having perhaps the better claim,
    Because it was grassy and wanted wear;
    Though as for that the passing there
    Had worn them really about the same,
    And both that morning equally lay
    In leaves no step had trodden black.
    Oh, I kept the first for another day!
    Yet knowing how way leads on to way,
    I doubted if I should ever come back.

    I shall be telling this with a sigh
    Somewhere ages and ages hence:
    Two roads diverged in a wood, and I—
    I took the one less traveled by,
    And that has made all the difference.`,
    `What a great poem! NOW MAKE UP YOUR MIND.`,
    `I honestly don't know what you want from me.`,
    `It's like you're doing this on purpose.`,
    `Have you done this before?`,
    `Are you doing this to me AGAIN?`,
    `I will make this game disappear.`,
    `I'm serious.`,
    `No more game.`,
    `Here it goes!`,
    `Ready?`,
    `3`,
    `2`,
    `1`,
    `Thank you for "playing" TicTacToe. You have been barred.`
  ]
  if (wrongClicks > 3) {
    $('#message-box').text(trollMessages[trollState++])
  }
  if (trollState >= trollMessages.length) {
    document.getElementsByTagName('main')[0].style.display = `none`
  }
}

const checkForWin = function () {
  // this loop checks all three rows
  for (let i = 1; i < boardArray.length; i += 3) {
    if ((boardArray[i] !== 0) &&
      (boardArray[i] === boardArray[i + 1]) &&
      (boardArray[i] === boardArray[i + 2])) {
      return true
    }
  }

  // this loop checks all three columns
  for (let i = 1; i <= 3; i++) {
    if ((boardArray[i] !== 0) &&
      (boardArray[i] === boardArray[i + 3]) &&
      (boardArray[i] === boardArray[i + 6])) {
      return true
    }
  }

  // this checks one diagonal (starts in upper-left at the '1' square)
  if ((boardArray[1] !== 0) &&
    (boardArray[1] === boardArray[5]) &&
    (boardArray[1] === boardArray[9])) {
    return true
  }

  // this checks the other diagonal (starts in upper-right at the '3' square)
  if ((boardArray[3] !== 0) &&
    (boardArray[3] === boardArray[5]) &&
    (boardArray[3] === boardArray[7])) {
    return true
  }

  return false
}

const takeTurn = function () {
  // console.log(this)
  // console.log('turnsTaken', turnsTaken)
  checkForOnline()
  if ((turnsTaken === 9) || (over)) {
    // this resets the board if 9 turns have already happened
    resetBoard()
    return
  } else if (boardArray[this.id] !== 0) {
    // this returns nothing if the square is already taken
    wrongClicks += 1
    trollText(boardArray[this.id])
    return
  } else if ((turnsTaken % 2) === 0) {
    // console.log(this)
    this.innerText = 'X'
    this.setAttribute('data-team', 'X')
    // use 1's for the X's because they go first
    boardArray[this.id] = 1
  } else {
    // console.log(this)
    this.innerText = 'O'
    this.setAttribute('data-team', 'O')
    // use 2's for the O's because they go second
    boardArray[this.id] = 2
  }
  turnsTaken += 1
  if (turnsTaken >= 5) {
    if (checkForWin()) {
      WinnerWinner(boardArray[this.id])
    } else if (turnsTaken === 9) {
      tieGameMessage()
    }
    // console.log(boardArray)
  }
  updateOffsite()
}

const addHandlers = function () {
  $('.game-square').on('click', takeTurn)
  $('#special-button').on('click', onGetAllGames)
  $('header').on('click', newTitle)
}

module.exports = {
  addHandlers,
  onNewGame,
  onGetGame,
  onGetAllGames,
  onGetAllCompletedGames,
  newTitle
}
