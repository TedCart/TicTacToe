Hello!

Welcome to my first project from General Assembly.

## Ready, Fire, Aim

On day 1 of class they mentioned TicTacToe was the first project, but we wouldn't get the assignment for a few more weeks. I started on it anyway, knowing just enough javascript from our pre-work assignments to build the board and game logic.

The actual project entailed more than just a working game of TicTacToe: We needed users to create accounts, log in, log out, etc.; we needed jQuery; we needed to make calls to an API to store game data for each user; we needed to deploy our game through GitHub pages; we needed a detailed history of our progress through frequent commits.

I knew none of this on day 1 - I just wanted to make the game.

To start, I repurposed the HTML from a memory game we did in pre-work (click a card, flip it over, find its mate, etc.) I replaced the cards with divs, tooled around with css, until I had a game board; fixed-size, off-center, too many borders, but functional (yes!!).

Now it was time to make X's. Click events were left over from the memory game, so I just had to change the function and voilà! X's! Sure, they were tiny and in the upper-left corner of the square but I had other things to worry about. Like how it was O's turn now.

I made a "turnsTaken" variable - "X" goes on odd turn numbers, "O" goes on even turns. Wait, X can replace O with a simple click? That's not good. How do I check for a winner? I LOVE these challenges.

Okay, X can't replace O if the div has something in it - a simple conditional statement. Check for winner? Well, there are 8 winning patterns on TicTacToe so I don't need a smart grid system or anything to check in all directions from each new move. Can I store data in the div attributes? (Turns out I can!) Because that would help me decide if the winner was X or O.

I copied the board data to an array, iterated through those 8 possible win states, created a game over message, and the game worked!

To reset the board, I just cleared the divs, their attribute data, set turnsTaken back to 0 and the game was back on. After tooling around with CSS, I even had a decent looking game board with full size X's and O's.

None of this is in the commit history, but that's what happens when you start the project before...

## Proper Project Time

When we finally received the TicTacToe project I created a proper git repo and GitHub page.

I had to refactor a number of things. I replaced javascript commands with jQuery (so no more "document.getElementById" or the like). I built a new page-source from scratch instead of using the memory game framework. I remade the board with Bootstrap so it would scale in mobile. I translated my board array for API calls since I used a different format than it did. I created a sign-in process using a framework we learned in class.

## Flavor Text

TicTacToe is boring. That's why I added a bunch of snarky stuff that might or might not be funny - I don't know you. For example, if you click on the same square a bunch, the game will chastise you/plead with you not to do that. The victory/tie game messages are randomized (and sometimes nonsense). The subtitle of the header changes randomly too.

## Stretch Goals

Initially I wanted to include multiplayer. I also have a way (theoretically) to create a chat between two players, but because the API doesn't support chat natively it would be a work around. Using the same API that stores new games, if both players are watching TWO games instead of one, one of those would be the actual TicTacToe game and the other would be a conduit for chat. Changes to that second "game" would appear in a chat box. I'm unclear on the limitations of the server (such as how long an array can be - it's supposed be 9 but could it be longer? Could it hold an entire conversation?) but at a bare minimum the chat could be saved on each user's HTML.

The multiplayer API requires player 2 to know the game id (which is impractical, but it works). So then when a new player joins, the new "game" (which is actually for chat) would also require a game id. However, this part could be automated by passing the new game id thru the existing game, perhaps in an empty square (before it's overwritten with an x or o) or thru an extra index in the array. That kind of change would trigger the chat box to setup, which would send user inputs from an input box to the "game" (chat) and effectively create a line of communication.

Once chat is functional, it could also tell both players the ID of their next game so they don't have to share that information through a separate form of communication. Perhaps a function can connect them to that new game without having one player enter the number manually again.

The two minute timeout of the "watch" API could make this impractical, but perhaps the timeout event could cause to chat to reinstigate.

All of this is theoretical and requires a great deal of tinkering on my part, but I think the logic is sound.

The live game can be found at this link:
  https://tedcart.github.io/TicTacToe/index.html

  ## Technologies Used

  - Bootstrap
  - HTML
  - SCSS
  - Javascript
  - AJAX requests
  - breakpoints
  - elbow grease (est. 1934)
