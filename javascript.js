const container = document.getElementById('createContainer');
let grid = [];
let locationFroggo = [];
let currentFroggoY;
let currentFroggoX;

function createGrid(rows, cols) {
    const newSizes = `repeat(${rows}, 1fr) / repeat(${cols}, 1fr)`;
    container.style.gridTemplate = newSizes;
    container.style.gap = `${7 / Math.sqrt(rows * cols)}vw`;
    createGridChild(rows, cols);
    moveFroggo(0, 0);
}

function createGridChild(rows, cols) {
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let i = 0; i < cols; i++) {
            const item = document.createElement('div');
            item.className = 'item';
            container.appendChild(item);
            row.push(item);
        }
        grid.push(row);
    }
}

function moveFroggo(x, y) {
    x = Math.max(0, Math.min(x, grid.length - 1));
    y = Math.max(0, Math.min(y, grid[0].length - 1));
    const newFroggo = grid[x][y];
    const currentFroggo = document.querySelector('.item.froggo');
    if (currentFroggo) {
        currentFroggo.classList.remove('froggo');
    }
    newFroggo.classList.add('froggo');
}

function getFroggo() {
    const currentFroggo = document.querySelector('.item.froggo');
    locationFroggo = [...grid].find(row => row.includes(currentFroggo));
    currentFroggoY = grid.indexOf(locationFroggo);
    currentFroggoX = locationFroggo.indexOf(currentFroggo);
}

function moveFroggoUp() {
    getFroggo();
    moveFroggo(currentFroggoY - 1, currentFroggoX);
}

function moveFroggoDown() {
    getFroggo();
    moveFroggo(currentFroggoY + 1, currentFroggoX);
}

function moveFroggoLeft() {
    getFroggo();
    moveFroggo(currentFroggoY, currentFroggoX - 1);
}

function moveFroggoRight() {
    getFroggo();
    moveFroggo(currentFroggoY, currentFroggoX + 1);
}

const moveUp = document.getElementById('moveUp');
moveUp.addEventListener('click', moveFroggoUp, false);

const moveLeft = document.getElementById('moveLeft');
moveLeft.addEventListener('click', moveFroggoLeft, false);

const moveDown = document.getElementById('moveDown');
moveDown.addEventListener('click', moveFroggoDown, false);

const moveRight = document.getElementById('moveRight');
moveRight.addEventListener('click', moveFroggoRight, false);

createGrid(4, 4);