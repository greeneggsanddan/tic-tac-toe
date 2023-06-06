const createPlayer = (name, mark) => {
    return {name, mark}
}

const createCell = () => {
    let value = null;
    
    const addMark = (mark) => {
        value = mark;
    };

    const getValue = () => value;

    return {addMark, getValue};
}

const gameBoard = (() => {
    const board = [];
    const playerOneMarks = [];  //Do I want to keep an array of the marks of players?
    const playerTwoMarks = [];

    for (let i = 0; i < 9; i++) {
        const cell = createCell();
        board.push(cell);
    }

    const getBoard = () => board;

    const markCell = (position, mark) => {
        board[position].addMark(mark);
    }

    return {getBoard, markCell};
})();

const gameController = ((playerOneName = "Player One", playerTwoName = "Player Two") => {
    const playerOne = createPlayer("Player 1", "X");
    const playerTwo = createPlayer("Player 2", "O");
    let activePlayer = playerOne;
    let roundNumber = 0;
    let gameOver = false;
    const winners = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],    //Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],    //Columns
        [0, 4, 8], [2, 4, 6]                //Diagonals
    ];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
    }

    const getActivePlayer = () => activePlayer;

    const getRound = () => roundNumber;

    const checkForWinner = (board, mark) => {
        let isWinner = false;
        const marked = []; //Do I want make a new array every time a move is made?
        for (let i = 0; i < 9; i++) {
            if (board[i].getValue() === mark) marked.push(i);
        }
        console.log(marked);
        for (let i = 0; i < winners.length; i++) {
            isWinner = winners[i].every(winningPosition => marked.includes(winningPosition));
            if (isWinner) break;
        }
        return isWinner;
    }

    const playRound = (position) => {
        roundNumber++;
        const mark = getActivePlayer().mark;
        gameBoard.markCell(position, mark);
        if (checkForWinner(gameBoard.getBoard(), mark) || roundNumber === 9) {
            gameOver = true;
        } else switchPlayerTurn();
    }

    return {playRound, getActivePlayer, checkForWinner, getRound};
})();

const displayController = (() => {
    const playerTurnDiv = document.querySelector(".turn");
    const boardDiv = document.querySelector(".board");

    const updateScreen = () => {
        boardDiv.textContent = "";
        const board = gameBoard.getBoard();
        const activePlayer = gameController.getActivePlayer();

        if (gameController.checkForWinner(board, activePlayer.mark)) {
            playerTurnDiv.textContent = `${activePlayer.name} wins!`;
        } else if (gameController.getRound() === 9) {
            playerTurnDiv.textContent = "Draw!";
        } else {
            playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;
        }

        board.forEach((cell, position) => {
            const cellButton = document.createElement("button");
            cellButton.classList.add("cell");
            cellButton.dataset.position = position; //check that this is doing the right thing
            cellButton.textContent = cell.getValue();
            boardDiv.appendChild(cellButton);
        });
    }

    function clickHandlerBoard(e) {
        const selectedCell = e.target.dataset.position;
        if (!selectedCell) return;

        gameController.playRound(selectedCell);
        updateScreen();
    }

    boardDiv.addEventListener("click", clickHandlerBoard);
    updateScreen();
})();