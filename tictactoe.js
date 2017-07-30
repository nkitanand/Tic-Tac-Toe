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

			console.log(index);
			console.log(validLoc);
			console.log(humanPos);

			if (!isGameOver()) {
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

		console.log(index);
		console.log(validLoc);
		console.log(cpuPos);

		isGameOver();
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

var isGameOver = function() {
	
	if (parseInt(moveCount) == 9) {
		window.setTimeout(function() {
			alert("TIE");
			//window.location.reload(false);
		}, 200);
		return true;
	}
	return false;
}