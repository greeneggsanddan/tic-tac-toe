const createPlayer = (name, sign) => {
    return {name, sign}
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

    for (let i = 0; i < 9; i++) {
        const cell = createCell();
        board.push(cell);
    }

    const getBoard = () => board;

    const markCell = (position, sign) => {
        board[position].addMark(sign);
    }

    return {getBoard, markCell};
})();

const gameController = ((playerOneName = "Player One", playerTwoName = "Player Two") => {
    //const board = gameBoard;    //do I have to declare game as a variable or can I just use gameBoard?
    const playerOne = createPlayer("Player 1", "X");
    const playerTwo = createPlayer("Player 2", "O");
    let activePlayer = playerOne;

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
    }

    const getActivePlayer = () => activePlayer;

    const playRound = (position) => {
        gameBoard.markCell(position, getActivePlayer().sign);   //Check if this needs to be a variable
        //Check for winner
        switchPlayerTurn();
        //Update the display
    }

    return {playRound, getActivePlayer};
})();

const displayController = (() => {
    // const game = gameController();  //Do I need this?
    const playerTurnDiv = document.querySelector(".turn");
    const boardDiv = document.querySelector(".board");

    const updateScreen = () => {
        boardDiv.textContent = "";
        const board = gameBoard.getBoard();
        const activePlayer = gameController.getActivePlayer();
        playerTurnDiv.textContent = `${activePlayer.name}'s turn...`

        board.forEach((cell, position) => {
            const cellButton = document.createElement("button");
            cellButton.classList.add("cell");
            cellButton.dataset.position = position; //Check if you still need this
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