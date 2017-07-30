function player(type, color) {
	this.type = type;
	this.color = color;
}

var human = new player("human", "black");
var cpu   = new player("cpu", "red");
var moveCount = 0;
var validLoc = [1,2,3,4,5,6,7,8,9];
var humanPos = [];
var cpuPos   = [];
var boardState = [-1,
				  0,0,0,
				  0,0,0,
				  0,0,0];	// -1 to invalidate zero index
var humanFlag = 1;
var cpuFlag   = 2;

$(document).ready(function(){
	addEvent();
});

var addEvent = function() {

	var idCount = 9;

	for (var idx = 1; idx <= idCount; idx++) {
		document.getElementById(idx).addEventListener("click", function() {
			play(human, this.id);
		});
	}
}

var play = function(player, id) {

	// execute human player move
	if (player.type == "human") {
		var element = document.getElementById(id);
		if ( indexOf(validLoc, id) != -1) {
			console.log(player.color);
			console.log(element.id);
			element.style.backgroundColor = (new String(player.color).valueOf());
			moveCount++;

			var index = indexOf(validLoc, id);
			validLoc.splice(index, 1);
			humanPos.push(parseInt(id));
			boardState[id] = humanFlag;

			console.log(index);
			console.log(validLoc);
			console.log(humanPos);

			if (!isGameOver(humanFlag)) {
				// Give the turn to CPU bot
				play(cpu, 0);
			}
		}
	}

	// execute cpu bot move
	if (player.type == "cpu") {
		var randomIndex = Math.floor(Math.random() * validLoc.length);
		var id = validLoc[randomIndex];
		var element = document.getElementById(id);

		console.log(player.color);
		console.log(element.id);
		element.style.backgroundColor = (new String(player.color).valueOf());
		moveCount++;

		var index = indexOf(validLoc, id);
		validLoc.splice(index, 1);
		cpuPos.push(parseInt(id));
		boardState[id] = cpuFlag;

		console.log(index);
		console.log(validLoc);
		console.log(cpuPos);

		isGameOver(cpuFlag);
	}
}

var indexOf = function(arr, ele) {
	var index = -1;
	for (var idx=0; idx < arr.length; idx++) {
		if (arr[idx] == ele) {
			index = idx;
			break;
		}
	}
	return index;
}

var isGameOver = function(playerFlag) {
	
	if (parseInt(moveCount) == 9) {
		window.setTimeout(function() {
			document.getElementById("result").innerHTML = "It's a TIE";
			alert("It's a TIE!");
			window.location.reload(false);
		}, 200);
		return true;
	}

	if (captured(playerFlag)) {
		window.setTimeout(function() {
			if (playerFlag == humanFlag) { 
				document.getElementById("result").innerHTML = "You WON!";
				alert("You WON! But Smart Bot is coming soon to kick your S");
			}
			else if (playerFlag == cpuFlag) {
				document.getElementById("result").innerHTML = "You LOSE!";
				alert("You LOSE!");
			}
			window.location.reload(false);
		}, 200);
		return true;
	}

	return false;
}

var captured = function(playerFlag) {

	if ( (boardState[1] == playerFlag && boardState[2] == playerFlag && boardState[3] == playerFlag)
		 || (boardState[4] == playerFlag && boardState[5] == playerFlag && boardState[6] == playerFlag)
		 || (boardState[7] == playerFlag && boardState[8] == playerFlag && boardState[9] == playerFlag)
		 || (boardState[1] == playerFlag && boardState[4] == playerFlag && boardState[7] == playerFlag)
		 || (boardState[2] == playerFlag && boardState[5] == playerFlag && boardState[8] == playerFlag)
		 || (boardState[3] == playerFlag && boardState[6] == playerFlag && boardState[9] == playerFlag)
		 || (boardState[1] == playerFlag && boardState[5] == playerFlag && boardState[9] == playerFlag)
		 || (boardState[3] == playerFlag && boardState[5] == playerFlag && boardState[7] == playerFlag) ) {
		return true;
	}
	return false;
}