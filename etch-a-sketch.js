// Global variables
const container = document.querySelector('.container');
let boxesPerRow = 16;
let colorScheme = 'normal';
let resetButton = document.querySelector('.#reset');
let colorButton = document.querySelector('#color');
let defaultButton = document.querySelector('#normal');
let grayscaleButton = document.querySelector('.#grayscale');
let boxes;

// Action
colorButton.addEventListener('click', function() {
    grayscaleButton.style.background = 'rgba(134, 86, 31, 0.897)';
    defaultButton.style.background = 'rgba(170, 120, 31, 0.897)';
    colorButton.style.background = 'rgba(134, 86, 31, 0.897)';
    colorScheme = 'normal';
    detectMouseover(colorScheme);
});

defaultButton.addEventListener('click', function() {
    grayscaleButton.style.background = 'rgba(134, 86, 31, 0.897)';
    defaultButton.style.background = 'rgba(170, 120, 31, 0.897)';
    colorButton.style.background = 'rgba(134, 86, 31, 0.897)';
    colorScheme = 'normal';
    detectMouseover(colorScheme);
});

grayscaleButton.addEventListener('click', function() {
    grayscaleButton.style.background = 'rgba(170, 120, 31, 0.897)';
    defaultButton.style.background = 'rgba(134, 86, 31, 0.897)';
    colorButton.style.background = 'rgba(134, 86, 31, 0.897)';
    colorScheme = 'grayscale';
    detectMouseover(colorScheme);
});

resetButton.addEventListener('click', reset);

createGrid(boxesPerRow);

detectMouseover(colorScheme);

// Functions
// Provides a selection of color scheme to each box upon mouseover
function detectMouseover(colorScheme) {
    boxes = document.querySelectorAll('.box');
    switch (true) {
        case colorScheme === 'normal':
        for (let j = 0; j < boxes.length; j++) {
            let box =  boxes[j];
            box.removeEventListener('mouseover', darkenShade);
            box.removeEventListener('mouseover', generateColor);
            box.addEventListener('mouseover', changeColor);
        };
        break;
    case colorScheme === 'color':
        for (let i = 0; i < boxes.length; i++) {
            let box = boxes[i];
            box.removeEventListener('mouseover', darkenShade);
            box.removeEventListener('mouseover',changeColor);
            box.addEventListener('mouseover', generateColor);
        };
        break;
        case colorScheme === 'grayscale':
            for (let k = 0; k < boxes.length; k++) {
            let box = boxes[k];
            if (box.style.opacity === '1') {
                box.classList.add('tooDark');
            };
            box.removeEventListener('mouseover', generateColor);
            box.removeEventListener('mouseover', changeColor);
            box.addEventListener('mouseover', darkenShade);
            };
            break;
     };
};

// Create grid of boxes
function createGrid(boxesPerRow) {
    let percentageOfGrid = 100 / boxesPerRow;
    for (let i = 0; i < boxesPerRow; i++) {
        let row = document.createElement('div');
        row.classList.add('row');
        row.setAttribute('style', `width: 100%; height: ${percentageOfGrid}%`);
        for (let j = 0; j < boxesPerRow; j++) {
            let box = document.createElement('div');
            box.classList.add('box');
            box.classList.remove('tooDark');
            box.setAttribute('style', 'background: white; width: $');
            row.appendChild(box);
        }
        container .appendChild(row);
    };
};

// Default setting: make each block upon mouseover
function changeColor(e) {
    let boxColor = e.target;
    boxColor.style.opacity = '1';
    boxColor.style.background = 'black';
    boxColor.classList.add('tooDark');
};

// Color setting: make each box a random color upon mouseover
function generateColor(e) {
    let hue = 'rgba(' + (Math.floor(Math.random() * 256)) + ',' + 
        (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256))
        + ')';
    let randomColor = e.target;
    randomColor.style.opacity =  '1';
    randomColor.style.background = hue;
};

// Grayscale setting: make each box a 0.1 opacity shade of black - opacity increase with each mouseover
function darkenShade(e) {
    let boxShade = e.target;
    let theOpacity = boxShade.style.opacity;
    boxShade.style.background = 'black';
    console.log(boxShade.style.opacity);
    if (boxShade.className === 'box tooDark') {
        boxShade.classList.remove('box tooDark');
        boxShade.style.opacity = 0.1;
    };
    if (theOpacity < 1.0) {
        boxShade.style.opacity = theOpacity ? (parseFloat(theOpacity) + 0.1) : 0.1;
    };
};

// Prompth the user for size of the grid and reset setting to default of black boxes
function reset() {
    grayscaleButton.style.background = 'rgba(134, 86, 31, 0.897)';
    defaultButton.style.background = 'rgba(170, 120, 31, 0.97)';
    colorButton.style.background = 'rgba(134, 86, 31, 0.897)';
    let allRows = document.querySelector('.row');
    for (let i = 0; i < allRows.length; i++) {
        container.removeChild(allRows[i]);
    };
    boxesPerRow = 0;
    while (boxesPerRow < 2 || boxesPerRow > 120) {
        boxesPerRow = prompt('How mamy boxes would you like per row/column? (2-120)');
    };
    colorScheme = 'normal';
    createGrid(boxesPerRow);
    detectMouseover(colorScheme);
};