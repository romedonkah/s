const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const statusDisplay = document.getElementById('status');

let currentPlayer = 'X'; // X starts first
let gameActive = true;
let board = Array(9).fill(null);

function handleCellClick(index) {
  if (board[index] || !gameActive) return; // Prevent cell from being clicked if already filled or game is over
  
  board[index] = currentPlayer;
  cells[index].textContent = currentPlayer;
  cells[index].classList.add(currentPlayer.toLowerCase());
  
  checkGameStatus();
  
  if (gameActive) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
  }
}

function checkGameStatus() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  // Check for a winner
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameActive = false;
      statusDisplay.textContent = `${currentPlayer} wins!`;
      return;
    }
  }

  // Check for draw
  if (!board.includes(null)) {
    gameActive = false;
    statusDisplay.textContent = "It's a draw!";
  } else {
    statusDisplay.textContent = `${currentPlayer}'s turn`;
  }
}

function resetGame() {
  board = Array(9).fill(null);
  currentPlayer = 'X';
  gameActive = true;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o');
  });
  statusDisplay.textContent = `${currentPlayer}'s turn`;
}

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => handleCellClick(index));
});

resetButton.addEventListener('click', resetGame);

statusDisplay.textContent = `${currentPlayer}'s turn`;
