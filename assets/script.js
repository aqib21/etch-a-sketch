let random = false;
let defaultColor = 'black';
let opacity = 0;

const gridSize = document.querySelector('#grid-size');
const clearGridBtn = document.querySelector('#clear-grid');
const colorToggle = document.querySelector('#color-toggle');
const colorPicker = document.querySelector('input');
const opacityBtn = document.querySelector('#opacity-btn');

gridSize.addEventListener('click', changeGrid);
clearGridBtn.addEventListener('click', clearGrid);
colorToggle.addEventListener('click', toggleColors);
colorPicker.addEventListener('change', setColor);
opacityBtn.addEventListener('click', setOpacity);


createGrid();
setOpacity();

function setColor(){
    defaultColor = this.value;
    random = false;
}

function toggleColors(){
    colorPicker.disabled = !random;
    colorToggle.textContent = random ? 'Solid' : 'Random';
    random = random ? false : true;
}

function setOpacity(){
    opacity = (opacity == 1) ? 0 : 1;
    const squares = document.querySelectorAll('.col');
    squares.forEach(box => box.style.opacity = `${opacity}`);
}

function createGrid(numOfSquares = 16){
    const container = document.querySelector('.container');
    container.innerHTML = '';
    for(let i = 0; i < numOfSquares; i++){
        const row = document.createElement('div');
        row.classList.add('row');
        container.appendChild(row);
        for(let i = 0; i < numOfSquares; i++){
            const col = document.createElement('div');
            col.classList.add('col');
            row.appendChild(col);
            col.addEventListener('mouseover', colorize);
        }
    }
}

function clearGrid(){
    const squares = document.querySelectorAll('.col');
    squares.forEach(box => box.style.backgroundColor = 'white');
}

function changeGrid(){
    const numOfSquares = prompt('Enter number of squares per side (1-100)?');
    if(numOfSquares > 100 || numOfSquares < 1 || isNaN(numOfSquares)){
        alert('invalid input');
    } else{
        createGrid(numOfSquares);
        gridSize.textContent = `${numOfSquares} X ${numOfSquares}`;
    }
}

function colorize(e){
    let bgColor = random ? getRandomColor() : defaultColor;
    e.target.style.backgroundColor = bgColor;
    e.target.style.opacity = (e.target.style.opacity < 1) ? (parseFloat(e.target.style.opacity) + 0.1) : 1;
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}