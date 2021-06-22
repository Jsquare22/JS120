let readline = require("readline-sync");
function createHuman() {
  let playerObject = createPlayer();

  let humanObject = {
    choose() {
      let choice;

      while (true) {
        console.log('Please choose rock, paper, scissors, lizard or spock:');
        choice = readline.question();
        if (['rock', 'paper', 'scissors', `lizard`, `spock`].includes(choice)) break;
        console.log('Sorry, invalid choice.');
      }

      this.move = choice;
    },
  };

  return Object.assign(playerObject, humanObject);
}

// eslint-disable-next-line max-lines-per-function
function createComputer() {
  let playerObject = createPlayer();
  let computerObject = {
    choose(nextMove = "") {
      const choices = ['rock', 'paper', 'scissors', `lizard`, `spock`];
      //let bestChoice = this.cpuNextMove();
      let bestChoice = nextMove;
      if (choices.includes(bestChoice)) {
        this.move = bestChoice;
      } else {
        let randomIndex = Math.floor(Math.random() * choices.length);
        this.move = choices[randomIndex];
      }
    },
  };
  return Object.assign(playerObject,computerObject);
}

function createPlayer() {
  return {
    move: null,
    score: 0,
    moveHistory: [],
    options: ['rock', 'paper', 'scissors', `lizard`, `spock`],
    addScore () {
      this.score += 1;
    },
    addHistory () {
      this.moveHistory.push(this.move);
    },
  };
}

const RPSGame = {
  human: createHuman('human'),
  computer: createComputer('computer'),

  displayWelcomeMessage() {
    console.log("Welcome to Rock, Paper, Scissors, Lizard and Spock!");
  },
  displayGoodbyeMessage() {
    console.log("Thanks for playing Rock, Paper, Scissors, Lizard and Spock. Goodbye!");
  },

  displayWinner() {
    console.log(`You chose: ${this.human.move}`);
    console.log(`The computer chose: ${this.computer.move}`);
    this.determineWinner();
  },

  WIN_CONS : {
    rock : ['scissors' , `lizard`],
    lizard : [`spock`, `paper`],
    spock : [`scissors` , `rock`],
    scissors : [`paper` , `lizard`],
    paper : [`rock`,`spock`],
  },

  determineWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;
    if (this.WIN_CONS[humanMove].includes(computerMove)) {
      console.log(`You win!`);
      this.human.addScore();
    } else if (humanMove === computerMove) {
      console.log(`It is a tie.`);
    } else {
      console.log(`Computer Wins.`);
      this.computer.addScore();
    }
  },

  playAgain () {
    console.log('Would you like to play again? (y/n)');
    while (true) {
      let answer = readline.question();
      if (answer.toLowerCase()[0] === 'y') {
        this.scoreReset();
        this.historyReset();
        return true;
      } else if (answer.toLowerCase()[0] === 'n') {
        return false;
      } else {
        console.log(`Enter a y or n.`);
      }
    }
  },

  historyReset () {
    this.human.moveHistory = [];
    this.computer.moveHistory = [];
  },

  scoreReset () {
    this.human.score = 0;
    this.computer.score = 0;
  },

  scoreLimitReached () {
    const MAXSCORE = 5;
    if (this.human.score === MAXSCORE || this.computer.score === MAXSCORE) {
      return true;
    }
    return false;
  },

  displayScore () {
    console.log(`Score: \n Player: ${this.human.score} CPU: ${this.computer.score}`);
  },

  displayHisotry () {
    let humanHistory = this.human.moveHistory;
    let computerHistory = this.computer.moveHistory;
    console.log(`Player's previous moves:\n ${humanHistory}`);
    console.log(`Computer's previous moves:\n ${computerHistory}`);
  },

  cpuNextMove () {
    if (this.human.moveHistory.length === 0) {
      return "";
    }
    let humanMoves = this.playerHistoryCount();
    let rngWinChance = (1 / this.computer.options.length);
    let winChancesPerMove = this.playerMoveUsePercentage(humanMoves);
    let humanSignatureMove = "";
    for (let move in winChancesPerMove) {
      if (winChancesPerMove[move] > rngWinChance) {
        humanSignatureMove = move;
      }
    }
    return this.cpuCalcCounterMove(humanSignatureMove);
  },

  cpuCalcCounterMove (moveToCounter) {
    for (let move in this.WIN_CONS) {
      if (this.WIN_CONS[move].includes(moveToCounter)) {
        return move;
      }
    }
    return "";
  },

  playerMoveUsePercentage (playerMoves) {
    let totalHumanMoves = Object.values(playerMoves)
      .reduce( (prev, curr) => prev + curr);
    for (let move in playerMoves) {
      playerMoves[move] /= totalHumanMoves;
    }
    return playerMoves;
  },


  playerHistoryCount () {
    let playerHistory = this.human.moveHistory;
    let  humanMovesCount = {};
    playerHistory.forEach(move => {
      if (humanMovesCount.hasOwnProperty(move)) {
        humanMovesCount[move] += 1;
      } else {
        humanMovesCount[move] = 1;
      }
    });
    return humanMovesCount;
  },

  play() {
    this.displayWelcomeMessage();
    while (true) {
      this.human.choose();
      this.computer.choose(this.cpuNextMove());
      this.human.addHistory();
      this.computer.addHistory();
      this.displayWinner();
      this.displayScore();
      this.displayHisotry();
      if (this.scoreLimitReached() && !this.playAgain() ) {
        break;
      }
    }
    this.displayGoodbyeMessage();
  },
};

RPSGame.play();