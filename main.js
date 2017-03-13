const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var playerOnesTurn = true;

//board stuff
var board = [0, 1, 2, 3, 4, 5, 6, 7, 8];

var renderBoard = function() {
  var boardString = 
`      |     |     \n
   ${board[0]}  |  ${board[1]}  |  ${board[2]}  \n
 _____|_____|_____\n
      |     |     \n
   ${board[3]}  |  ${board[4]}  |  ${board[5]}  \n
 _____|_____|_____\n
      |     |     \n
   ${board[6]}  |  ${board[7]}  |  ${board[8]}  \n`;
  console.log(boardString);
};

var someoneWon = function() {
  var marker = playerOnesTurn ? 'X' : 'O';
  
  //check diagonals
  var sum = 0;
  for (var i = 0; i <= 8; i += 4) {
    sum += board[i] === marker ? 1 : 0;
  }
  if (sum === 3) { return true; }
  sum = 0; 
  for (var i = 2; i <= 6; i += 2) {
    sum += board[i] === marker ? 1 : 0;
  }
  if (sum === 3) { return true; }

  //check horizontals
  for (var i = 0; i <= 6; i += 3) { //left start of each row
    var sum = 0;
    for (var j = 0; j < 3; j++) {
      sum += board[i + j] === marker ? 1 : 0;
    }
    if (sum === 3) { return true; }
  }

  //check verticals
  for (var i = 0; i < 3; i++) {
    var sum = 0;
    for (var j = 0; j <= 6; j += 3 ) {
      sum += board[i + j] === marker ? 1 : 0;
    }
    if (sum === 3) { return true; }
  }
};

var promptUser = function() {
  var player = playerOnesTurn ? 'Player 1 ' : 'Player 2 ';
  renderBoard();
  rl.setPrompt(`${player} enter your move as a number: `);
  rl.prompt();
};

//initial prompt
promptUser();

//handle user enter press
rl.on('line', (input) => {
  var marker = playerOnesTurn ? 'X' : 'O';
  board[parseInt(input)] = marker;
  //check for win
  if (someoneWon()) {
    var player = playerOnesTurn ? 'Player 1 ' : 'Player 2 ';
    console.log(player + 'has won the game');
    process.exit();
  }
  playerOnesTurn = !playerOnesTurn;
  promptUser();
});
