let currentPlayer = 'X';
let cells = Array.from(document.getElementsByClassName('cell'));
let messageElement = document.getElementById('message');

function checkWinner() {
  const winningCombos = [
    // Yatay Satırlar
    [0, 1, 2], [1, 2, 3], [2, 3, 4],
    [5, 6, 7], [6, 7, 8], [7, 8, 9],
    [10, 11, 12], [11, 12, 13], [12, 13, 14],
    [15, 16, 17], [16, 17, 18], [17, 18, 19],
    [20, 21, 22], [21, 22, 23], [22, 23, 24],
    // Dikey Satırlar
    [0, 5, 10], [5, 10, 15], [10, 15, 20],
    [1, 6, 11], [6, 11, 16], [11, 16, 21],
    [2, 7, 12], [7, 12, 17], [12, 17, 22],
    [3, 8, 13], [8, 13, 18], [13, 18, 23],
    [4, 9, 14], [9, 14, 19], [14, 19, 24],
    // Çapraz Satırlar
    [0, 6, 12], [1, 7, 13], [2, 8, 14], [3, 7, 11], [4, 8, 12],
    [5, 11, 17], [6, 12, 18], [7, 13, 19], [8, 14, 20], [9, 13, 17],
    [10, 16, 22], [11, 17, 23], [12, 18, 24], [15, 19, 23], [16, 20, 24]
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
    currentPlayer = currentPlayer === 'X' ? 'O' : (currentPlayer === 'O' ? 'Y' : 'X');
    messageElement.innerHTML = `Sıradaki Oyuncu: ${currentPlayer}`;
    checkWinner();
  }
}

function resetGame() {
  cells.forEach(cell => cell.innerHTML = '');
  currentPlayer = 'X';
  messageElement.innerHTML = `Sıradaki Oyuncu: ${currentPlayer}`;
}