let moves = 0;
const table = document.getElementById("table");
const time = document.getElementById("time"); 
let rows = 4; 
let columns = 4;
const textMoves = document.getElementById("moves");
const button = document.getElementById("newGame");
let arrayForBoard;
let seconds = 0, minutes = 0, hours = 0;
let gameTime;

function addSecond() {
    seconds++;

    if (seconds >= 60) {
        seconds = 0;
        minutes++;

        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    time.textContent = `${(hours ? (hours > 9 ? hours : "0" + hours) : "00")}:
    	${(minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00")}:
    	${(seconds > 9 ? seconds : "0" + seconds)}`;
    timer();
}

function timer() {
    gameTime = setTimeout(addSecond, 1000);
}

function start() {
 	button.addEventListener("click", startNewGame, false);
 	startNewGame();
}

function startNewGame() {
	clearTimeout(gameTime);
	time.textContent = "00:00:00";
    seconds = 0; minutes = 0; hours = 0;
 	let arrayOfNumbers = new Array();
 	let arrayHasNumberBeenUsed;
 	let randomNumber = 0;
 	let count = 0;
 	moves = 0;
 	rows = document.getElementById("rows").value;
 	columns = document.getElementById("columns").value;
 	textMoves.innerHTML = moves;
 	arrayForBoard = new Array(rows);
 	for (let i = 0; i < rows; i++) {
		arrayForBoard[i] = new Array(columns);
 	}
 	arrayHasNumberBeenUsed = new Array( rows * columns );
 	for (let i = 0; i < rows * columns; i++) {
		arrayHasNumberBeenUsed[i] = 0;
 	} 
 	for (let i = 0; i < rows * columns; i++) {
		randomNumber = Math.floor(Math.random()*rows * columns);

		if (arrayHasNumberBeenUsed[randomNumber] == 0) {
			arrayHasNumberBeenUsed[randomNumber] = 1;
			arrayOfNumbers.push(randomNumber);
		}
		else {
			i--;
		}
 	}
 	count = 0;
 	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < columns; j++) {
			arrayForBoard[i][j] = arrayOfNumbers[count];
			count++;
		}
 	}
 	showTable();
 	timer();
}

function showTable() {
 	let outputString = '';
 	for (let i = 0; i < rows; i++) {
		outputString += "<tr>";
		for (let j = 0; j < columns; j++) {
			
			if (arrayForBoard[i][j] == 0) {
				outputString += `<td class="blank"> </td>`;
			}
			else {
				outputString += `<td class="tile" onclick="moveThisTile(${i}, ${j})">
					${arrayForBoard[i][j]}</td>`;
			}
		}
		outputString += "</tr>";
 	}
 	table.innerHTML = outputString;
}

function moveThisTile( tableRow, tableColumn) {

	if (checkIfMoveable(tableRow, tableColumn, "up") ||
	    checkIfMoveable(tableRow, tableColumn, "down") ||
	    checkIfMoveable(tableRow, tableColumn, "left") ||
	    checkIfMoveable(tableRow, tableColumn, "right")) {
		incrementMoves();
	}
	  
	if (checkIfWinner()) {
		alert(`Congratulations! You solved the puzzle in ${moves} moves. Play again?`);
		startNewGame();
	}
}

function checkIfMoveable(rowCoordinate, columnCoordinate, direction) {
	rowOffset = 0;
	columnOffset = 0;

	if (direction == "up") {
		rowOffset = -1;
	}
	else if (direction == "down") {
		rowOffset = 1;
	}
	else if (direction == "left") {
		columnOffset = -1;
	}
	else if (direction == "right") {
		columnOffset = 1;
	}  
	
	if (rowCoordinate + rowOffset >= 0 && 
		columnCoordinate + columnOffset >= 0 &&
	  	rowCoordinate + rowOffset < rows && 
	  	columnCoordinate + columnOffset < columns) {

		if (arrayForBoard[rowCoordinate + rowOffset][columnCoordinate + columnOffset] == 0) {
			arrayForBoard[rowCoordinate + rowOffset][columnCoordinate + columnOffset] = 
				arrayForBoard[rowCoordinate][columnCoordinate];
			arrayForBoard[rowCoordinate][columnCoordinate] = 0;
			showTable();
			return true;
		}
	}
	return false; 
}

function checkIfWinner() {
	let count = 1;
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < columns; j++) {
			
			if (arrayForBoard[i][j] != count) {
				
				if ( !(count === rows * columns && arrayForBoard[i][j] === 0 )) {
					return false;
				}
			}
			count++;
		}
	}
	return true;
}

function incrementMoves() {
	moves++;

	if (textMoves) {
	  textMoves.innerHTML = moves;
	}
}

window.addEventListener("load", start, false);