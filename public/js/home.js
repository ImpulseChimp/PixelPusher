window.onload = function() {
  transitionBg();
};

function transitionBg() {
	document.getElementById("bg").className = "bgYellowTransition";
	setTimeout(secondTransition, 7500);
	setTimeout(thirdTransition, 15000);
	var myVar = setInterval( function() {
		document.getElementById("bg").className = "bgYellowTransition";
		setTimeout(secondTransition, 7500);
		setTimeout(thirdTransition, 15000);
	}, 22500);
}

function secondTransition() {
	document.getElementById("bg").className = "bgBlueTransition";
}

function thirdTransition() {
	document.getElementById("bg").className = "bgRedTransition";
}

function displayPPInfo() {
	var info = document.getElementById("infoButton");
	var settings = document.getElementById("settingsButton");
	if (info.style.display == "none") {
		info.style.display = "inline-block";
		settings.style.display = "inline-block";
	}
	else if (info.style.display == "inline-block") {
		info.style.display = "none";
		settings.style.display = "none";
	}
}

function infoClicked() {
	document.getElementById("bg").className = "infoBody";
	document.getElementById("ppDiv").style.display = "none";
	document.getElementById("infoDiv").style.display = "none";
	document.getElementById("settingsDiv").style.display = "none";
}

function settingsClicked() {
	document.getElementById("bg").className = "settingsBody";
	document.getElementById("ppDiv").style.display = "none";
	document.getElementById("infoDiv").style.display = "none";
	document.getElementById("settingsDiv").style.display = "none";
}