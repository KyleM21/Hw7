/*	DOCTYPE JAVASCRIPT
	File:  table.js
	Name: Kyle Marcoux
    Email: kyle_marcoux@student.uml.edu
    Umass Lowell 91.61 GUI Programming 1
    Created 7/25/20
    This is the javascript for index.html.  
	Specifically this handles the javascript for table generation, adding new tables and removing old ones.

*/

function math() {

	// Grabs data from form! 
	var arr = $('form[name="tForm"]').serializeArray();
	var x1 = parseInt(arr[0].value);
	var x2 = parseInt(arr[1].value);
	var y1 = parseInt(arr[2].value);
	var y2 = parseInt(arr[3].value);

	// This ensures that you cant put in the variables wrong, the larger variable will always be x2/y2 respectively
	if(x1>x2){
		x2 = [x1, x1 = x2][0];
		alert("Your starting x value is larger then the ending x value, so they have been swapped");
	}
	if(y1>y2){
		y2 = [y1, y1 = y2][0];
		alert("Your starting y value is larger then the ending y value, so they have been swapped");
	}
	
	/*  This here is a solution to the table acting strange.  The first column and row of multiplication
		would just disappear. Subtracing 1 from each means the missing row and column appear and function
		normally
	*/
	y1--;
	x1--;
	
	/*	This temporary variable holds the tbody with the new table, that will replace the blank tbody that
		the new tab hasAttribute
	*/
	var temp="";
	
	// Checks for big mode
	if (bigMode.checked == true){
		temp+="<table id='table'; border='100px'; bordercolor='coral';>";
	}
	else{
		temp+="<table id='table'; border='10px'; bordercolor='blue';>";
	}

	// This first loop creates the rows, and uses a loop to fill the columns
	for(var i = y1; i <= y2; i++){
		
		temp+="<tr id=row style='height:30px;'>";
		// This loops builds the rest of the table
		for(var j = x1; j <= x2; j++){

			if(j == x1){
				color = "lightgrey";	
				
				// This checks if its the first cell of the first row and empties it to provide a cleaner look
				if(i==y1){
					color = "lightgrey";
					temp+=  "<td style='text-align:center; width:10px; background-color:" 
							+ color +  "'>" + "&#9733;" + "</td>";
				}
				else{
				temp+="<td style='width:10px; background-color:" + color + "'>" + (i*1).toFixed(2); + "</td>";
				}
			}
			else if(i == y1){
				color = "lightgrey";
				temp+="<td style='width:10px; background-color:" + color + "'>" + (1*j).toFixed(2); + "</td>";
			}	
			else {
				color = "white";
				temp+="<td style='width:10px; background-color:" + color + "'>" + (i*j).toFixed(2); + "</td>";
			}
		}
		temp+="</tr>";
	}
	
	// This builds the end of the table
	temp+="</table>";
	
	// The following code is a series of append() that build a new tab with a blank table inside it.
	var counter = $("div#tabs ul li").length;

	$("div#tabs ul").append(
		"<li><a href='#tab" + counter + "'>" + (x1+1) + "->" + x2 + "|" + (y1+1) + "->" + y2+ "</a>" 
		+ "<span class=" + "'ui-icon ui-icon-close'" + " role=" + "'presentation'" + ">Remove Tab</span>"+ "</li>"
	);
	$("div#tabs").append(
		"<div id='tab" + counter + "'>" + 
		"<table class='table table-striped center mt-1" + "'><tbody id= '" + "rTable-" + counter + "'>" + 
		"</tbody></table>" + '</div>'
	);
	
	// This adds the table to the new tab and refreshes the tabs
	$("#rTable-" + counter).append(temp);
	$("div#tabs").tabs("refresh");
}

/*	This is the function to clear multiple tabs
	It works by running a for loop that iterates through, and removes
	every tab in the form except the instructions.
*/
function clearTabs() {
	var x = $("div#tabs ul li").length;
	var id = 0;
	
	for(var i = 0; i <= x; i++){
		id = ("#tab" + i)
		
		// This refreshes the tab widget
		$("div#tabs").tabs( "refresh" );
		
		// This actually removes the tab itself
		var hrefID = "a[href='" + id + "']"
		$( hrefID ).closest("li").remove()
	}
	
}