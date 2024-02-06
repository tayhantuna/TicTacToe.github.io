let currentPlayer = 'X';
let cells = Array.from(document.getElementsByClassName('cell'));
let messageElement = document.getElementById('message');

function checkWinner() {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (cells[a].innerHTML && cells[a].innerHTML === cells[b].innerHTML && cells[a].innerHTML === cells[c].innerHTML) {
      messageElement.innerHTML = `${cells[a].innerHTML} kazandı!`;
      return true;
    }
  }

  if (cells.every(cell => cell.innerHTML)) {
    messageElement.innerHTML = "Berabere!";
    return true;
  }

  return false;
}

function handleClick(index) {
  if (!cells[index].innerHTML && !checkWinner()) {
    cells[index].innerHTML = currentPlayer;
    cells[index].style.color = currentPlayer === 'X' ? 'red' : 'blue'; // Yazı rengini belirle
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    messageElement.innerHTML = `Sıradaki Oyuncu: ${currentPlayer}`;
    checkWinner();
  }
}

function resetGame() {
  cells.forEach(cell => cell.innerHTML = '');
  cells.forEach(cell => cell.style.color = ''); // Yazı rengini sıfırla
  currentPlayer = 'X';
  messageElement.innerHTML = `Sıradaki Oyuncu: ${currentPlayer}`;
}
