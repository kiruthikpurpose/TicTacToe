let currentPlayer = 'X';
let gameActive = true;
const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
];
let board = ['', '', '', '', '', '', '', '', ''];

function placeMark(index) {
    if (!gameActive || board[index] !== '') return;

    board[index] = currentPlayer;
    document.getElementsByClassName('cell')[index].innerText = currentPlayer;

    if (checkWin()) {
        document.getElementById('status').innerText = `${currentPlayer} wins!`;
        document.getElementById('status').classList.add('player-' + currentPlayer.toLowerCase(), 'win');
        endGame();
        return;
    }

    if (checkDraw()) {
        document.getElementById('status').innerText = "It's a draw!";
        endGame();
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById('status').innerText = `${currentPlayer}'s turn`;
}

function checkWin() {
    for (let condition of winConditions) {
        let [a, b, c] = condition;
        if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

function checkDraw() {
    return board.every(cell => cell !== '');
}

function endGame() {
    gameActive = false;
    document.querySelectorAll('.cell').forEach(cell => cell.style.cursor = 'default');
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    document.querySelectorAll('.cell').forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('player-x', 'player-o', 'win');
        cell.style.cursor = 'pointer';
    });
    document.getElementById('status').innerText = "X's turn";
}
