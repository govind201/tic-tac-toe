const createPlayer = (name, marker) => {
  return { name, marker };
};

const game = (() => {
  const player1 = createPlayer("Player 1", "X");
  const player2 = createPlayer("Player 2", "O");
  let currentPlayer = player1;
  let gameboard = ["", "", "", "", "", "", "", "", ""];
  let gameEnded = false;

  const cells = document.querySelectorAll(".cell");
  const message = document.getElementById("message");
  const restartBtn = document.getElementById("restart");

  const addCellListeners = () => {
    cells.forEach((cell, index) => {
      cell.addEventListener("click", () => {
        if (!gameEnded && gameboard[index] === "") {
          makeMove(index);
        }
      });
    });
  };

  const makeMove = (cellIndex) => {
    if (!gameEnded && gameboard[cellIndex] === "") {
      gameboard[cellIndex] = currentPlayer.marker;
      cells[cellIndex].textContent = currentPlayer.marker;

      if (checkWin(currentPlayer.marker)) {
        endGame(`Player ${currentPlayer.name} wins!`);
      } else if (checkTie()) {
        endGame("It's a tie!");
      } else {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        if (currentPlayer === player2) {
          makeComputerMove();
        }
      }
    }
  };

  const makeComputerMove = () => {
    const availableCells = gameboard
      .map((cell, index) => (cell === "" ? index : -1))
      .filter((index) => index !== -1);

    const randomIndex = Math.floor(Math.random() * availableCells.length);
    const computerMove = availableCells[randomIndex];
    makeMove(computerMove);
  };

  const checkWin = (marker) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winningCombinations.some((combination) => {
      return combination.every((index) => gameboard[index] === marker);
    });
  };

  const checkTie = () => {
    return gameboard.every((cell) => cell !== "");
  };

  const endGame = (messageText) => {
    gameEnded = true;
    message.textContent = messageText;
  };

  const restartGame = () => {
    gameboard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = player1;
    gameEnded = false;
    message.textContent = "";
    cells.forEach((cell) => {
      cell.textContent = "";
    });
  };

  restartBtn.addEventListener("click", restartGame);

  const init = () => {
    addCellListeners();
  };

  return { init };
})();

game.init();
