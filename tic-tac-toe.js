const createPlayer = (name, sign) => {
    return {name, sign}
}

const createCell = () => {
    let value = null;
    
    const addMark = (player) => {
        value = player;
    };

    const getValue = () => value;

    return {addMark, getValue};
}

const gameBoard = (() => {
    const board =[]

    for (let i = 0; i < 9; i++) {
        const cell = createCell();
        board.push(cell);
    }

    const getBoard = () => board;

    return {getBoard}
})();

const gameController = (() => {

})();

const displayController = (() => {
    board.forEach(row => {
        row.forEach((cell, index) => {
            const cellButton = document.createElement("button");
            cellButton.classList.add("cell");
            cellButton.dataset.column = index;
            cellButton.textContent = cell.getValue();
            boardContainer.appendChild(cellButton);
        })
    })
    return {}
})();