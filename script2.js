const game = document.querySelectorAll(".cell");
const cells = [];
const boardSize = 5; // Değişen oyun tahtası boyutu
const winLength = 5; // Kazanma koşulu uzunluğu

document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("board");
    const restartBtn = document.getElementById("restartBtn");
    const message = document.getElementById("message");

    let currentPlayer = "X";
    let gameActive = true;

    // Initialize the game board
    for (let i = 0; i < boardSize * boardSize; i++) {
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
        if (checkWin()) {
            endGame(currentPlayer + " kazandı!");
        } else if (checkDraw()) {
            endGame("Berabere!");
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            if (currentPlayer === "O") {
                message.textContent = "Sıra bot'ta";
                botMove();
            } else {
                message.textContent = "Sıra oyuncuda";
            }
        }
    }

    // Bot move
    function botMove() {
        let bestScore = -Infinity;
        let move;
        for (let i = 0; i < cells.length; i++) {
            if (cells[i].textContent === "") {
                cells[i].textContent = currentPlayer;
                let score = minimax(cells, 0, false);
                cells[i].textContent = "";
                if (score > bestScore) {
                    bestScore = score;
                    move = i;
                }
            }
        }
        cells[move].textContent = currentPlayer;
        if (checkWin()) {
            endGame(currentPlayer + " kazandı!");
        } else if (checkDraw()) {
            endGame("Berabere!");
        } else {
            currentPlayer = "X";
            message.textContent = "Sıra oyuncuda";
        }
    }

    // Minimax algorithm for bot move
    function minimax(cells, depth, isMaximizing) {
        if (checkWin()) {
            return isMaximizing ? -10 + depth : 10 - depth;
        } else if (checkDraw()) {
            return 0;
        }
        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < cells.length; i++) {
                if (cells[i].textContent === "") {
                    cells[i].textContent = "O";
                    let score = minimax(cells, depth + 1, false);
                    cells[i].textContent = "";
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < cells.length; i++) {
                if (cells[i].textContent === "") {
                    cells[i].textContent = "X";
                    let score = minimax(cells, depth + 1, true);
                    cells[i].textContent = "";
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    }

    // Check for a win
    function checkWin() {
        const winConditions = generateWinConditions();
        return winConditions.some(condition => {
            return condition.every(index => cells[index].textContent === currentPlayer);
        });
    }

    // Generate win conditions dynamically for the given board size and win length
    function generateWinConditions() {
        const winConditions = [];

        // Rows
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j <= boardSize - winLength; j++) {
                winConditions.push(Array.from({ length: winLength }, (_, k) => i * boardSize + j + k));
            }
        }

        // Columns
        for (let i = 0; i <= boardSize - winLength; i++) {
            for (let j = 0; j < boardSize; j++) {
                winConditions.push(Array.from({ length: winLength }, (_, k) => (i + k) * boardSize + j));
            }
        }

        // Diagonals
        for (let i = 0; i <= boardSize - winLength; i++) {
            for (let j = 0; j <= boardSize - winLength; j++) {
                const diagonal1 = [];
                const diagonal2 = [];
                for (let k = 0; k < winLength; k++) {
                    diagonal1.push((i + k) * boardSize + j + k);
                    diagonal2.push((i + k) * boardSize + (j + winLength - 1 - k));
                }
                winConditions.push(diagonal1, diagonal2);
            }
        }

        return winConditions;
    }

    // Check for a draw
    function checkDraw() {
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

cells.forEach(cell => {
    if (cell.textContent === "X") {
        cell.classList.add("x-mark");
    }
});
