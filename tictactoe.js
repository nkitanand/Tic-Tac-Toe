$(document).ready(function(){
	addEvent();
});

var addEvent = function() {
	alert("0");

	var idCount = 9;

	for (var idx = 1; idx <= idCount; idx++) {
		document.getElementById(idx).addEventListener("click", function() {
			//document.getElementById("1").style.backgroundColor = "red";
			this.style.backgroundColor = "red";
			this.innerHTML = "X";
		});
	}
}