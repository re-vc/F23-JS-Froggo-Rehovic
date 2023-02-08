const container = document.getElementById('createContainer');
let grid = [];

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
    const locationFroggo = [...grid].find(row => row.includes(currentFroggo));
    let location = [];
    const currentFroggoY = grid.indexOf(locationFroggo);
    const currentFroggoX = locationFroggo.indexOf(currentFroggo);
    location.push(currentFroggoX);
    location.push(currentFroggoY);
    return location;
}

function setFroggo(direction) {
    const location = getFroggo();
    let newLocation;
    switch (direction) {
        case 'up':
            newLocation = [location[0], location[1] - 1];
            break;
        case 'down':
            newLocation = [location[0], location[1] + 1];
            break;
        case 'left':
            newLocation = [location[0] - 1, location[1]];
            break;
        case 'right':
            newLocation = [location[0] + 1, location[1]];
            break;
        default:
            break;
    }
    moveFroggo(newLocation[1], newLocation[0]);
}

const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        switch (button.id) {
            case 'moveUp':
                setFroggo('up');
                break;
            case 'moveLeft':
                setFroggo('left');
                break;
            case 'moveDown':
                setFroggo('down');
                break;
            case 'moveRight':
                setFroggo('right');
                break;
            default:
                break;
        }
    });
});

createGrid(4, 4);