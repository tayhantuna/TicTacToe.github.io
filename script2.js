document.addEventListener("DOMContentLoaded", function() {
    const board = document.getElementById("board");
    const restartBtn = document.getElementById("restartBtn");
    const message = document.getElementById("message");
    const cells = [];
    const BOARD_SIZE = 5;
    const WINNING_LENGTH = 4;
    const MAX_DEPTH = 3; // Derinlik sınırlaması

    let currentPlayer = "X";
    let gameActive = true;

    // Initialize the game board
    for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", () => cellClickHandler(cell));
        cells.push(cell);
        board.appendChild(cell);
    }

    // Handle cell click
    function cellClickHandler(cell) {
    if (!gameActive || cell.textContent !== "") return;
    cell.textContent = currentPlayer;
    if (checkWin(cells, currentPlayer)) {
        endGame(currentPlayer + " kazandı!");
    } else if (checkDraw(cells)) {
        endGame("Berabere!");
    } else {
        
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        cells[index].style.color = currentPlayer === 'X' ? 'red' : 'blue'; // Yazı rengini belirle
        if (currentPlayer === "O") {
            message.textContent = "Sıra bot'ta";
            botMove(); // Bot hareketini geciktir
        } else {
            message.textContent = "Sıra oyuncuda";
        }
    }
    }

    // Bot move using minimax algorithm with alpha-beta pruning
    function botMove() {
        let bestScore = -Infinity;
        let move;
        for (let i = 0; i < cells.length; i++) {
            if (cells[i].textContent === "") {
                cells[i].textContent = currentPlayer;
                let score = minimax(cells, 0, false, -Infinity, Infinity);
                cells[i].textContent = "";
                if (score > bestScore) {
                    bestScore = score;
                    move = i;
                }
            }
        }
        cell.style.color = "blue"
        cells[move].textContent = currentPlayer;
        if (checkWin(cells, currentPlayer)) {
            endGame(currentPlayer + " kazandı!");
        } else if (checkDraw(cells)) {
            endGame("Berabere!");
        } else {
            currentPlayer = "X";
            message.textContent = "Sıra oyuncuda";
        }
    }

    // Minimax algorithm for bot move with alpha-beta pruning
    function minimax(cells, depth, isMaximizing, alpha, beta) {
        if (checkWin(cells, "X")) {
            return -10 + depth;
        } else if (checkWin(cells, "O")) {
            return 10 - depth;
        } else if (checkDraw(cells)) {
            return 0;
        }
        if (depth >= MAX_DEPTH) { // Derinlik sınırlaması kontrolü
            return 0;
        }
        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < cells.length; i++) {
                if (cells[i].textContent === "") {
                    cells[i].textContent = "O";
                    let score = minimax(cells, depth + 1, false, alpha, beta);
                    cells[i].textContent = "";
                    bestScore = Math.max(score, bestScore);
                    alpha = Math.max(alpha, score);
                    if (beta <= alpha) break;
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < cells.length; i++) {
                if (cells[i].textContent === "") {
                    cells[i].textContent = "X";
                    let score = minimax(cells, depth + 1, true, alpha, beta);
                    cells[i].textContent = "";
                    bestScore = Math.min(score, bestScore);
                    beta = Math.min(beta, score);
                    if (beta <= alpha) break;
                }
            }
            return bestScore;
        }
    }

    // Check for a win
    function checkWin(cells, player) {
        for (let i = 0; i < BOARD_SIZE; i++) {
            for (let j = 0; j < BOARD_SIZE; j++) {
                if (cells[i * BOARD_SIZE + j].textContent === player) {
                    // Check horizontal, vertical, diagonal, and anti-diagonal
                    for (let dx = -1; dx <= 1; dx++) {
                        for (let dy = -1; dy <= 1; dy++) {
                            if (dx === 0 && dy === 0) continue;
                            let count = 1;
                            for (let k = 1; k < WINNING_LENGTH; k++) {
                                let ni = i + dx * k;
                                let nj = j + dy * k;
                                if (ni < 0 || ni >= BOARD_SIZE || nj < 0 || nj >= BOARD_SIZE || cells[ni * BOARD_SIZE + nj].textContent !== player) break;
                                count++;
                            }
                            if (count === WINNING_LENGTH) return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    // Check for a draw
    function checkDraw(cells) {
        return cells.every(cell => cell.textContent !== "");
    }

    // End the game
    function endGame(messageText) {
        message.textContent = messageText;
        gameActive = false;
    }

    // Restart the game
    restartBtn.addEventListener("click", () => {
        cells.forEach(cell => {
            cell.textContent = "";
        });
        currentPlayer = "X";
        gameActive = true;
        message.textContent = "";
        if (currentPlayer === "O") {
            message.textContent = "Sıra bot'ta";
            botMove();
        } else {
            message.textContent = "Sıra oyuncuda";
        }
    });
});
