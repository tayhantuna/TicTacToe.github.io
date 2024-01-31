const game = document.querySelectorAll(".cell");
const cells = [];
document.addEventListener("DOMContentLoaded", function() {
    const board = document.getElementById("board");
    const restartBtn = document.getElementById("restartBtn");
    const message = document.getElementById("message");
    
  


    let currentPlayer = "X";
    let gameActive = true;

    // Initialize the game board
    for (let i = 0; i < 9; i++) {
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
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        return winConditions.some(condition => {
            const [a, b, c] = condition;
            return cells[a].textContent !== "" &&
                cells[a].textContent === cells[b].textContent &&
                cells[a].textContent === cells[c].textContent;
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

cells.forEach(cell => {
    if (cell.textContent === "X") {
        cell.classList.add("x-mark"); // X hücresine x-mark sınıfını ekleyin
    }
});