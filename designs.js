const submit = document.querySelector('.submit-btn');
let bricks;
let mouseDown = false;

submit.addEventListener('click', makeGrid);

document.body.onmousedown = function() { 
    mouseDown = true;
}

document.body.onmouseup = function() {
    mouseDown = false;
}

function makeGrid(e) {
	e.preventDefault();
	let width = document.querySelector('#input_width').value;
	let height = document.querySelector('#input_height').value;
	const canvas = document.querySelector('#pixel_canvas');
	let canvasWidth = canvas.getBoundingClientRect().width.toFixed();
	let canvasHeight = canvas.getBoundingClientRect().height.toFixed();
	let brickWidth = canvasWidth / width;
	let brickHeight = canvasHeight / height;
	let row;
	//reset the canvas value to redraw it
	canvas.innerHTML = '';

	//build the bricks, set styling, append to dom;
	for(var i = 0; i < (width * height); i++){

		//if we have a group of bricks ready to be put on the canvas then append them
		if(i % width === 0){
			row = getNewRow();
			canvas.appendChild(row);
		}

		let brick = document.createElement('div');
		brick.classList.add('brick');
		brick.style.width = `${brickWidth}px`;
		brick.style.height = `${brickHeight}px`;

		//add a brick to the row
		row.appendChild(brick);
	}

	canvas.style.borderRight = 'none';
	canvas.style.borderBottom = 'none';

	attachBrickListener();
}


function getNewRow(){
	let row = document.createElement('div');
	row.classList.add('brick-row');
	return row;
}

function attachBrickListener(){
	let bricks = document.querySelectorAll('.brick');
	bricks.forEach((brick) => {
		brick.addEventListener('click', colorBrick);
		brick.addEventListener('mouseover', (e) => {
			mouseDown ? colorBrick(e) : '';
		});
	})
}

function colorBrick(e){
	let color = document.querySelector('#colorPicker').value;
	e.target.style.backgroundColor = color;
}