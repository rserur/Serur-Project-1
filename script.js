var scrollTotal = 10;
var scrolled = 0; // A variable to keep track of how far we've scrolled.
var fractionScrolled = scrolled / scrollTotal;


// mousewheel
// You can read more about the mousewheel event at https://developer.mozilla.org/en-US/docs/DOM/DOM_event_reference/mousewheel
if (document.addEventListener) 
{
	document.addEventListener("mousewheel", MouseWheelHandler, false);
}

var waypoints = document.getElementsByClassName('waypoint');
var triangle = document.getElementById('next-triangle');

// clicking
for (i = 0; i < waypoints.length; i++) 
{
	// Here we attach a handler to the click event for every waypoint,
	// https://developer.mozilla.org/en-US/docs/Web/Reference/Events/click
	waypoints[i].addEventListener("click", waypointClickHandler, false);
}

function updateWaypoints() 
{
	fractionScrolled = scrolled / scrollTotal;

	// 0 <= fractionScrolled <= 1, so *10 gives us 10; Math.floor rounds down
	var whichWaypoint = Math.max(0, Math.floor(fractionScrolled * 10) - 1);

	// Iterating through waypoint list in html
	for (i = 0; i < 10; i++) {
		// Notice we constructed our li#id names to make this easy
		var currentWaypoint = document.getElementById('waypoint-' + i);
		
		if ( i == whichWaypoint ) {
			currentWaypoint.classList.add('active-waypoint');
		}
		
		else {
			currentWaypoint.classList.remove('active-waypoint');
		}
	}

	// Seek to the proportional time of the 38s clip of Bey's "Countdown"
	document.getElementById('Countdown').currentTime = fractionScrolled * 38.0;
}

// This function is called every time there's a click
function waypointClickHandler(e) {
	console.log('click');
	for (i = 0; i < waypoints.length; i++) {
		if (waypoints[i] === this) {
			// change scroll # based on clicked waypoint
			scrolled = (i+1)*100;
			updateWaypoints();
			console.log(scrolled);
		}	
	}
	if (triangle === this)
				scrolled = (i+1)*100;
				updateWaypoints();
				console.log(scrolled);		
}

// This function is called every time there's a mousewheelevent
function MouseWheelHandler(e) {
	

	var rawScrolled = Math.max(-1, Math.min(1, e.wheelDelta));
	scrolled = Math.min(Math.max(0, scrolled - rawScrolled), scrollTotal);

	document.getElementsByTagName('header')[0].innerHTML = scrolled;
	
	updateWaypoints();
}