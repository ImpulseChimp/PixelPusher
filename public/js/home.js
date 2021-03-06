/*
* Main PixelPusher JS Code. This includes all functions and
* functionality needed for the web based PixelPusher end user.
*/

var X_SEATS = 3;
var Y_SEATS = 3;
var intervalVar;
var timeout1;
var timeout2;
var timeout3;
var timeout4;
var timeout5;
var isSeatConfirmed = false;

var appInfo;
var sectionValue;
var rowValue;
var seatValue;
var appCredits;

/*
* --------------------> ON PAGE LOAD <-----------------------
* Loads all necessary data on page load
*/
$(function() {

	//Start the transitions in the background
	transitionBg();

	//Display the user grid
	//displaySelectionGrid();
});






//~~~~~~~~~~~~~~~~~~~~~BACKGROUND EFFECT FUNCTIONS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/*
* This sets the transition for the background in motion
*/
function transitionBg() {

	timeout5 = setTimeout(extraTransition, 100);
	timeout1 = setTimeout(secondTransition, 7500);
	timeout2 = setTimeout(thirdTransition, 15000);

	intervalVar = setInterval( function() {
			document.getElementById("bg").className = "bgYellowTransition";
			timeout3 = setTimeout(secondTransition, 7500);
			timeout4 = setTimeout(thirdTransition, 15000);
	}, 22500);

}

function secondTransitionBg() {

	document.getElementById("bg").className = "";
	setTimeout(extraTransition, 100);
	timeout1 = setTimeout(secondTransition, 7500);
	timeout2 = setTimeout(thirdTransition, 15000);

	intervalVar = setInterval( function() {
			document.getElementById("bg").className = "bgYellowTransition";
			timeout3 = setTimeout(secondTransition, 7500);
			timeout4 = setTimeout(thirdTransition, 15000);
	}, 22500);

}

function secondTransition() {
	document.getElementById("bg").className = "bgBlueTransition";
}

function thirdTransition() {
	document.getElementById("bg").className = "bgRedTransition";
}

function extraTransition() {
	document.getElementById("bg").className = "bgYellowTransition";
}


function elementAppearAnimation(element, isShown) {
	
	if (isShown) {
		var transparency = 1;
		var topMargin = 100;
		var disappear = setInterval( function () {

			transparency = transparency - 0.1;
			topMargin -= 10;
			element.style.opacity = transparency;
			element.style.topMargin = topMargin;

			if (topMargin == 0) {
				clearInterval(disappear);
			}
		}, 15);
		
		element.style.display = "none";
	}
	else {
		var transparency = 0;
		var topMargin = 0;
		var appear = setInterval( function () {

			transparency = transparency + 0.1;
			topMargin += 10;
			element.style.opacity = transparency;
			element.style.topMargin = topMargin;

			if (topMargin == 100) {
				clearInterval(appear);
			}
		}, 15);
		
		element.style.display = "block";
	}
	
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/*

*/
function buttonDropAnimation(element, isShown) {
	var fontLogo = document.getElementById("ppFontLogo");
	fontLogo.style.display = "block"
	fontLogo.style.opacity = 0;

	//If the dropdown buttons are not currently visible, then show them
	if (!isShown) {
		var topMargin = -20;
		var transparency = 0;
		var v = setInterval( function () {

			topMargin++;
			transparency = transparency + 0.1;
			element.style.marginTop = topMargin + "px";
			fontLogo.style.marginTop = topMargin + "px";
			element.style.opacity = transparency;
			fontLogo.style.opacity = transparency;

			if (topMargin == 10) {
				clearInterval(v);
			}
		}, 15);
	}
	else {
		var topMargin = 10;
		var transparency = 1;
		var v = setInterval( function () {

			topMargin--;
			transparency = transparency - 0.1;
			element.style.marginTop = topMargin + "px";
			fontLogo.style.marginTop = topMargin + "px";
			element.style.opacity = transparency;
			fontLogo.style.opacity = transparency;

			if (topMargin == -10) {
				clearInterval(v);
				document.getElementById("lowerButtonsDiv").style.display = "none";
			}
		}, 15);
	}

}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/*

*/
function displayPPInfo() {

	document.getElementById("home-arrow").style.display = "none";

	var icon = document.getElementById("ppIcon");
	//Rotate the icon 360 degrees when clicking the PixelPusher icon
	//to display the buttons underneath it.
	if (icon.className == "icon-unclicked") {
		icon.className = "icon-clicked";
	}
	else if (icon.className == "icon-init") {
		icon.className = "icon-clicked";
	}
	else {
		icon.className = "icon-unclicked";
	}


	var info = document.getElementById("infoDiv");
	var settings = document.getElementById("settingsDiv");
	var bothButtons = document.getElementById("lowerButtonsDiv");

	if (bothButtons.style.display == "none") {
		info.style.display = "block";
		settings.style.display = "block";
		settings.style.textAlign = "center";
		info.style.textAlign = "center";

		bothButtons.style.opacity = 0;
		bothButtons.style.display = "inline-block";
		bothButtons.style.textAlign = "center";
		//animate the buttons to fade in and drop down from the logo
		buttonDropAnimation(bothButtons, false);

	}
	else if (bothButtons.style.display == "inline-block") {
		buttonDropAnimation(bothButtons, true);

	}
}




//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/*

*/
function settingsClicked() {
	//don't display this until the user selects their section.
	//displaySelectionGrid();

	clearInterval(intervalVar);
	clearTimeout(timeout1);
	clearTimeout(timeout2);
	clearTimeout(timeout3);
	clearTimeout(timeout4);
	clearTimeout(timeout5);

	//When the user sets their seat for the first time or is resetting
	//the dropdown menu should not have an item selected
	if (document.getElementById("sectionDD") != null) {
		document.getElementById("sectionDD").value = "default";
	}


	//Use these values which would be set by the user to determine
	//whether or not the settings page should prompt the user to enter
	//a seat assignment for the first time or display their current
	//seat assignment.
	sectionValue = document.getElementById("user-section").value;
	rowValue = document.getElementById("user-row").value;
	seatValue = document.getElementById("user-seat").value;


	// change the screen to display the correct elements
	document.getElementById("bg").className = "settingsBody";
	document.getElementById("ppDiv").style.display = "none";
	document.getElementById("infoDiv").style.display = "none";
	document.getElementById("settingsDiv").style.display = "none";
	document.getElementById("settingsTitleDiv").style.display = "inline";
	document.getElementById("innerSectionDiv").style.display = "block";
	document.getElementById("sectionDiv").style.display = "block";
	
	//document.getElementById("tableGridDiv").style.display = "block";
	
	document.getElementById("pixelTableDiv").style.display = "none";


	var sectionDiv = document.getElementById("sectionDiv");
	var rowDiv = document.getElementById("rowDiv");
	var seatDiv = document.getElementById("seatDiv");
	var rowVal;

	//trying to make it so that the dropdown menu doesn't appear when seat
	//is already chosen
	//when values == 0 this means the user has not set that value yet
	if (sectionValue != -1 && rowValue != -1 && seatValue != -1) {
		sectionDiv.style.display = "none";
		isSeatConfirmed = true;

		document.getElementById("sectionChoiceText").style.display = "block";
		document.getElementById("rowChoiceText").style.display = "block";
		document.getElementById("seatChoiceText").style.display = "block";
		document.getElementById("confirm-reset-div").style.display = "block";
	}
	else if (sectionValue != -1 && rowValue == -1 && seatValue == -1) {
		isSeatConfirmed = false;
		sectionDiv.style.display = "none";
		document.getElementById("sectionDD").style.display = "none";

		document.getElementById("sectionChoiceText").style.display = "block";
	}
	else if (sectionValue != -1 && rowValue != -1 && seatValue == -1) {
		isSeatConfirmed = false;
		sectionDiv.style.display = "none";
		document.getElementById("sectionDD").style.display = "none";

		document.getElementById("sectionChoiceText").style.display = "block";
		document.getElementById("rowChoiceText").style.display = "block";
	}
	else {
		isSeatConfirmed = false;
		sectionDiv.style.display = "block";

	}


	$("#sectionDD").change(function () {
		// when a choice is selected, display the drop down box for rows if needed
		if (rowDiv.style.display == "none") {
			elementAppearAnimation(rowDiv, false);
			isSeatConfirmed = false;

			var sectionVal = $("#sectionDD").val();
			setDDText(sectionVal, 0);
			//Set the hidden values in the html for the user's seat information
			document.getElementById("user-section").value = sectionVal;
			
			if (sectionVal == "A") {
				X_SEATS = 2;
				Y_SEATS = 2;
			}
			else if (sectionVal == "B") {
				X_SEATS = 3;
				Y_SEATS = 3;				
			}
			else if (sectionVal == "C") {
				X_SEATS = 4;
				Y_SEATS = 4;				
			}
			else if (sectionVal == "D") {
				X_SEATS = 5;
				Y_SEATS = 5;				
			}
			displaySelectionGrid();
			
		}
	});

	$("#rowDD").change(function () {
		// when a choice is selected, display the drop down box for seats if needed
		if (seatDiv.style.display == "none") {
			elementAppearAnimation(seatDiv, false);
			isSeatConfirmed = false;

			rowValue = $("#rowDD").val();
			highlightRow(rowValue);
			setDDText(rowValue, 1);
			document.getElementById("user-row").value = rowValue;

		}
	});

	$("#seatDD").change(function () {
		isSeatConfirmed = true;

		// when a choice is selected, change to a text field
		seatValue = $("#seatDD").val();
		highlightSeat(rowValue, seatValue);
		setDDText(seatValue, 2);
		document.getElementById("user-seat").value = seatValue;

		showConfirmAndResetButtons();
	});

	// fill the table div with the correct HTML based on table size
	//document.getElementById("tableGridDiv").innerHTML = createSettingsTable(document.getElementById("gridWidth").value, document.getElementById("gridHeight").value);
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/*

*/
function setDDText(ddString, dropDownNum) {
	// 0 is sectionDD, 1 is rowDD, 2 is seatDD
	var ddDiv;
	var resultString = "";
	var ddName = "";

	if (dropDownNum == 0) {
		document.getElementById("sectionDiv").style.display = "none";
		ddDiv = document.getElementById("sectionChoiceText");
		resultString = "Section: " + ddString;
		//used for the info icon so that the user can view current seat assignment
		//from the home page.
		document.getElementById("user-section").value = ddString;
		ddName = "section";
	}
	else if (dropDownNum == 1) {
		document.getElementById("rowDiv").style.display = "none";
		ddDiv = document.getElementById("rowChoiceText");
		resultString = "Row: " + ddString;
		document.getElementById("user-row").value = ddString;
		ddName = "row";
	}
	else {
		document.getElementById("seatDiv").style.display = "none";
		ddDiv = document.getElementById("seatChoiceText");
		resultString = "Seat: " + ddString;
		document.getElementById("user-seat").value = ddString;
		ddName = "seat";

		document.getElementById("innerSectionDiv").style.marginBottom = "10px";
	}


	// clear the dropdown's Div and then create a text field
	ddDiv.innerHTML = "";
	ddDiv.innerHTML += "<h name='" + ddName + "Text' id='" + ddName + "Text'>" + resultString + "</h>";

}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/*

*/
// These values will save the highlighted row and seat on the table

function createSettingsTable(width, height) {
	
	var tableString = "<table name='settingsTable' id='settingsTable'>";
	var cellHeight = 300 / height;

	var highlightedRow = document.getElementById("highlight-row").value;
	var highlightedSeat = document.getElementById("highlight-seat").value;

	for (var i = 1; i <= width; i++) {

		// id is row_ and then the row number
		if (i == highlightedRow && highlightedSeat == -1) {
			// the row should be highlighted because a seat is not selected
			tableString += "<tr style='height:" + cellHeight + "px' id='row_" + i + "' name='row_" + i + "' style='background-color: red'>";
		}
		else {
			tableString += "<tr style='height:" + cellHeight + "px' id='row_" + i + "' name='row_" + i + "'>";
		}
		for (var j = 1; j <= height; j++) {
			var name = "seat_" + i + "_" + j;

			if (j == highlightedSeat && i == highlightedRow) {
				// it is the highlighted seat
				tableString += "<td id='" + name + "' class='grid-block' name='" + name + "' style='background-color: red' onclick='cellSelected(\"" + name + "\", " + i + ", " + j + ")'></td>";
			}
			else {
				// id is seat_ and then the row number, another _, and then the seat number
				tableString += "<td id='" + name + "' class='grid-block' name='" + name + "' onclick='cellSelected(\"" + name + "\", " + i + ", " + j + ")'></td>";
			}
		}
		tableString += "</tr>";
	}
	tableString += "</table>";

	return tableString;
}

function highlightRow(rowNum) {
	var rowName = "row_" + rowNum;
	document.getElementById("highlight-row").value = rowNum;
	document.getElementById(rowName).style.backgroundColor = "red";
}

function highlightSeat(rowNum, seatNum) {
	var seatName = "seat_" + rowNum + "_" + seatNum;
	document.getElementById("highlight-row").value = rowNum;
	document.getElementById("highlight-seat").value = seatNum;
	// get the row name to unhighlight it
	var rowName = "row_" + rowNum;
	document.getElementById(rowName).style.backgroundColor = "white";

	document.getElementById(seatName).style.backgroundColor = "red";
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/*
*This gets the ranges from the database
*/
function displaySelectionGrid() {
	var parameters = {};
    parameters['api_name'] = 'admin';
    parameters['api_method'] = 'get_range';
    parameters['type'] = 'current';


	var x = X_SEATS;
	var rowDDHtml = "";
	rowDDHtml += "<option value='default' disabled selected>Select Row   &#x25BC;</option>";
	for(var i = 0; i < x; i++) {
		rowDDHtml += "<option value=" + '"' + (i + 1) + '"' +
		">Row " + (i + 1) + "</option>";
	}
	$("#rowDD").html(rowDDHtml);

	var y = Y_SEATS;
	var seatDDHtml = "";
	seatDDHtml += "<option value='default' disabled selected>Select Seat   &#x25BC;</option>";
	for(var i = 0; i < y; i++) {
		seatDDHtml += "<option value=" + '"' + (i + 1) + '"' +
		">Seat " + (i + 1) + "</option>";
	}
	$("#seatDD").html(seatDDHtml);

	$("#gridWidth").val(x);
	$("#gridHeight").val(y);

	createSettingsTable(x, y);
	document.getElementById("tableGridDiv").innerHTML = createSettingsTable(document.getElementById("gridWidth").value, document.getElementById("gridHeight").value);
	var tableDiv = document.getElementById("tableGridDiv");
	tableDiv.style.opacity = 0;
	tableDiv.style.display = "block";
	
	var transparency = 0;
	var topMargin = 0;
	var table_appear = setInterval( function () {

		transparency = transparency + 0.1;
		topMargin += 10;
		tableDiv.style.opacity = transparency;
		tableDiv.style.topMargin = topMargin;

		if (topMargin == 100) {
			clearInterval(table_appear);
		}
	}, 15);
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/**
 * Makes a call to the apis
 * @param parameters All parameters being sent to the request
 * @param callback The callback function
 */
function api_request(pars, callback) {

    //Every request starts valid till proven wrong
    var api_response = null;
    var validRequest = true;
    var requestType = 'POST'

    //Check for the request type of POST or GET
    //This infers that the request type is a POST request
    //if not specified otherwise
    if (typeof(pars['request_type'])!='string'){
        requestType = 'POST'
    }
    else {
        requestType = pars['request_type']
    }

    //Validate request before proceeding
    if (!typeof(pars['version']==='string')) { validRequest = false; }
    if (!typeof(pars['api_name']==='string')) { validRequest = false; }
    if (!typeof(pars['api_method']==='string')) { validRequest = false; }

    if (validRequest) {

        //Build request url
        var request_url = window.location.origin + '/api/' + pars['api_name'] + '/' +
            pars['api_method'] + '/param';

        //Turn each key into valid send value
        for (var key in pars)
        {
            var obj = pars[key];
            if (typeof(pars[key])==='undefined')
            {
                pars[key]=obj;
            }
        }

        //Create Ajax Request
        var request = $.ajax({
            url: request_url,
            beforeSend: function() {

            },
            data: pars,
            dataType: 'json',
            processData: true,
            type: requestType

        });
        request.done(function(data){
            api_response = data;
            if (typeof(callback)==='function')
            {
                callback(data);
            }
        });
        request.fail(function(data){

        });
        request.always(function(data){

        });
        request.then(function(){

        });

        return JSON.parse(api_response);
    }
    else {
        return false;
    }

}



//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/*
	This function displays the media associated with the seat assignment that the
	user has put in through the settings menu in the form of a pixels assigned to cells
	in a dynamically generated table.
	No media will be displayed unless the admin is currently streaming media in the first place.

	Params: the seat location of the user in an x, y (row, seat #) pairing.
*/
function createPixelTable(seat_x, seat_y) {

	//Function that creates a grid that will display the pixels
	//associates with your seat assignment.
	var ratio = 1;

	var tableString = "<table name='pixelTable' id='pixelTable' style='z-index:-1; position:absolute'>";
	var windowHeight = $(window).height();
	var windowWidth = $(window).width();
	var cellHeight = windowHeight / ratio;
	var cellWidth = windowWidth / ratio;
	var width = ratio;
	var height = ratio;

	for (var i = 0; i < width; i++) {
		// id is row_ and then the row number
		//id : row_4 (row 4)
		tableString += "<tr style='height:" + cellHeight + "px; width:" + windowWidth + "px; background:black;' id='row_" + i + "' name='row_" + i + "'>";
		for (var j = 0; j < height; j++) {
			// id is col_ and then the row number, another _, and then the col number
			//id : col_4_5 (row 4, col 5)
			tableString += "<td id='col_" + i + "_" + j + "' name='col_" + i + "_" + j + "'></td>";
		}
		tableString += "</tr>";
	}
	tableString += "</table>";

	document.getElementById("pixelTableDiv").innerHTML = tableString;
	document.getElementById("pixelTableDiv").style.display = "block";


}



//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/*
	The reset seat selection button gets displayed when the user has entered all 3
	components of their seat information (section, row, and seat #).
*/
function showConfirmAndResetButtons() {
	elementAppearAnimation(document.getElementById("confirm-reset-div"), false);
}

document.getElementById("reset-seat-button").onclick = function() {
	isSeatConfirmed = false;
	
	//Close websocket if needed before opening a new one
	if(conn) {
		conn.close();
	}

	document.getElementById("confirm-reset-div").style.display = "none";
	document.getElementById("innerSectionDiv").style.display = "inline-block";
	document.getElementById("innerSectionDiv").style.marginBottom = "100px";

	//clear html tags
	document.getElementById("user-section").value = -1;
	document.getElementById("user-row").value = -1;
	document.getElementById("user-seat").value = -1;


	document.getElementById("sectionText").style.display = "none";
	document.getElementById("rowText").style.display = "none";
	document.getElementById("seatText").style.display = "none";

	//clear the text fields and add the dropdown menus back
	document.getElementById("sectionDD").style.display = "block";

	document.getElementById("sectionDD").value = "default";
	document.getElementById("rowDD").value = "default";
	document.getElementById("seatDD").value = "default";

	document.getElementById("sectionDiv").style.display = "block";

	//recreate the table to get rid of the highlights
	document.getElementById("highlight-row").value = -1;
	document.getElementById("highlight-seat").value = -1;
	
	var tableDiv = document.getElementById("tableGridDiv");
	
	var transparency = 1;
	var topMargin = 100;
	var table_disappear = setInterval( function () {

		transparency = transparency - 0.1;
		topMargin -= 10;
		tableDiv.style.opacity = transparency;
		tableDiv.style.topMargin = topMargin;

		if (topMargin == 0) {
			clearInterval(table_disappear);
		}
	}, 15);
	tableDiv.style.display = "none";
	document.getElementById("tableGridDiv").innerHTML = "";
	
};


//~~~~~~~~~~~~~~~~~~~~~~~~~~CONFIRMATION METHODS~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/*
	In response to clicking the 'back' button from the seat selection
	screen. The home page is shown with only the pixelpusher icon
	displayed. If the user input their seat correctly, the background
	should be the pixel of the media corresponding to their seat selection.
	(assuming that the media has begun being displayed in the first place).
	This method is used for the click response of the "Confirm" button as
	well as the click response for the back button on the settings page.

	isSeatConfirmed
			if true, this means that the user has seat their seat assignment fully
			if false, then the user hasn't set the seat
*/
function backClicked() {

	rowValue = document.getElementById("user-row").value;
	seatValue = document.getElementById("user-seat").value;

	document.getElementById("bg").className = "";
	document.getElementById("ppIcon").className = "icon-init";
	document.getElementById("ppDiv").style.display = "block";
	document.getElementById("ppFontLogo").style.display = "none";
	document.getElementById("lowerButtonsDiv").style.display = "none";
	document.getElementById("infoDiv").style.display = "none";
	document.getElementById("appInfo").style.display = "none";
	document.getElementById("appCredits").style.display = "none";
	document.getElementById("settingsDiv").style.display = "none";
	document.getElementById("settingsTitleDiv").style.display = "none";
	document.getElementById("innerSectionDiv").style.display = "none";
	document.getElementById("tableGridDiv").style.display = "none";
	document.getElementById("confirm-reset-div").style.display = "none";

	if (isSeatConfirmed) {

		registerSeatSocket(rowValue, seatValue);

		//Make sure the row and col values were actually set.
		if (rowValue >= 0 && seatValue >= 0) {
			createPixelTable(1, 1);
		}

		clearToBlack();
	}
	else {
		//Return to the normal transition background
		secondTransitionBg();
	}

}


document.getElementById("confirm-seat-button").onclick = function() {
	isSeatConfirmed = true;
	backClicked();
};


document.getElementById("backButton").onclick = function() {

	rowValue = document.getElementById("user-row").value;
	seatValue = document.getElementById("user-seat").value;

	//Make sure the row and col values were actually set.
	if (rowValue >= 0 && seatValue >= 0) {
		registerSeatSocket(rowValue, seatValue);
		isSeatConfirmed = true;
		createPixelTable(1, 1);
	}
	else {
		isSeatConfirmed = false;
	}
	backClicked();

};

//~~~~~~~~~~~~~~~~~~~~~~~~~END CONFIRMATION BUTTONS~~~~~~~~~~~~~~~~~~~~~~~~





function cellSelected(cellName, row, seat) {

	rowValue = row - 1;
	seatValue = seat - 1;

	console.log(row + '-' + seat);

	document.getElementById("user-row").value = row;
	document.getElementById("user-seat").value = seat;

	if (document.getElementById(cellName).style.backgroundColor != "red") {
		//it is not already selected
		if (document.getElementById("highlight-seat").value != -1) {
			// have to unset the previous highlight
			var oldCell = "seat_" + document.getElementById("highlight-row").value + "_" + document.getElementById("highlight-seat").value;
			document.getElementById(oldCell).style.backgroundColor = "white";
		}

		if (document.getElementById("highlight-row").value != -1) {
			// unset highlighted row
			var oldRow = "row_" + document.getElementById("highlight-row").value;
			document.getElementById(oldRow).style.backgroundColor = "white";
		}
		var cell = document.getElementById(cellName);
		cell.style.backgroundColor = "red";

		//Set all of the dropdown boxes to text fields
		setDDText(document.getElementById("user-section").value, 0);
		setDDText(row, 1);
		setDDText(seat, 2);
		document.getElementById("highlight-row").value = row;
		document.getElementById("highlight-seat").value = seat;
		//need a section setter for when there are multiple sections besides just A
		document.getElementById("user-row").value = row;
		document.getElementById("user-seat").value = seat;
		rowValue = row;
		seatValue = seat;

		//add the clear and confirm buttons
		showConfirmAndResetButtons();
	}
}


//~~~~~~~~~~~~~~~~~~~~PIXEL DISPLAY FUNCTIONS~~~~~~~~~~~~~~~~~~~~~~~~

/*
* Clear the background pixel(s) to black regardless of width
* or height of the display in manufactured pixels
*/
function clearToBlack() {
	document.getElementById("col_0_0").background = "black";
}

/*
* Sets the pixel color for the table
*/
function setPixelTableCellColor(row, col, r_val, g_val, b_val) {

	document.getElementById('col_0_0').style.backgroundColor = 'rgb(' + r_val + ',' + g_val + ',' + b_val + ')';
}

//~~~~~~~~~~~~~~~~~~~END PIXEL DISPLAY FUNCTIONS~~~~~~~~~~~~~~~~~~~~~


//~~~~~~~~~~~~~~~~~~~~~WEBSOCKET FUNCTIONS~~~~~~~~~~~~~~~~~~~~~~~~~~~
/*
* This will register a seat the user has selected from the
* drop downs set in the javscript variables.
* PRE: Only runs if row and seat are >= 0
*/
var conn;
var socketName
function registerSeatSocket(row, column) {

	//Close websocket if needed before opening a new one
	if(conn) {
		conn.close();
	}

	//Set the websocket to register with
  socketName = (rowValue - 1) + "-" + (seatValue - 1);
	console.log("Subscribing to: " + socketName);

  //Creates the connection to server for pixel pull ability
  conn = new ab.Session('ws://www.pixelpush.us:8080',
      function() {
          conn.subscribe(socketName, function(topic, data) {

							var array = JSON.parse(data.data);
							var rVal = parseInt(array['r_val']);
							var gVal = parseInt(array['g_val']);
							var bVal = parseInt(array['b_val']);

							//Set single pixel value for display
							document.getElementById('col_0_0').style.backgroundColor = 'rgb(' + rVal + ',' + gVal + ',' + bVal + ')';
          });
      },
      function() {
          console.warn('Connection to PixelPusher closed');
      },
      {'skipSubprotocolCheck': true}
  );
}

//~~~~~~~~~~~~~~~~~~~~END WEBSOCKET FUNCTIONS~~~~~~~~~~~~~~~~~~~~~~~
