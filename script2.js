document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("board");
    const restartBtn = document.getElementById("restartBtn");
    const message = document.getElementById("message");
    const cells = [];
    let currentPlayer = "X";
    let gameActive = true;

    // Initialize the game board
    for (let i = 0; i < 25; i++) {
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
        const winConditions = [
            // Rows
            [0, 1, 2, 3, 4],
            [5, 6, 7, 8, 9],
            [10, 11, 12, 13, 14],
            [15, 16, 17, 18, 19],
            [20, 21, 22, 23, 24],
            // Columns
            [0, 5, 10, 15, 20],
            [1, 6, 11, 16, 21],
            [2, 7, 12, 17, 22],
            [3, 8, 13, 18, 23],
            [4, 9, 14, 19, 24],
            // Diagonals
            [0, 6, 12, 18, 24],
            [4, 8, 12, 16, 20]
        ];

        return winConditions.some(condition => {
            return condition.every(index => cells[index].textContent === currentPlayer);
        });
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
