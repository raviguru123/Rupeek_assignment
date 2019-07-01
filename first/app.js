var 
	fetch_xml =	require('./fetch_xml.js'),
	_ 		  = require('lodash'),
	moment 	  = require("moment"),
	dataObj = new fetch_xml();


var distanceArray  = [];
var speedArray 	  = [];
var timeArray 	  = [];
var elevationArray = [];


dataObj._fetchdata()
.then(function(data) {
	set_matrix(data);
})
.fail(function(error) {

});



function set_matrix(arr) {
	for(var i =0; i < arr.length - 1; i++) {
		var obj1 = arr[i];
		var obj2 = arr[i+1];

		var lat1 = _.get(obj1, "$.lat", "");
		var lon1 = _.get(obj1, "$.lon", "");
	
		var lat2 = _.get(obj2, "$.lat", "");
		var lon2 = _.get(obj2, "$.lon", "");
		var dis  = calculate_distance(lat1, lon1, lat2, lon2, "M")

		var starttime = moment(_.get(obj1, "time.0", ""));
		var endtime   = moment(_.get(obj2, "time.0", ""));

		var ele 	= _.get(obj1, "ele.0", "");
		var duration = endtime.diff(starttime, "seconds");

		var speed = dis/duration;
		
		distanceArray.push(dis);
		speedArray.push(speed);
		elevationArray.push(ele);
		timeArray.push(duration)
	}

	// last object 
	var obj = arr[arr.length - 1];
	elevationArray.push(_.get(obj, "ele.0", ""));
	calculate_stat();
}


function calculate_stat() {
	total_distance = 0;
	max_speed = 0;
	average_speed = 0;
	moving_time = 0;
	for(var i = 0; i < distanceArray.length; i++) {
		total_distance += distanceArray[i];
		if(distanceArray[i] > 0) {
			moving_time += timeArray[i];
		}
	}

	for(var i = 0; i < speedArray.length; i++) {
		if(max_speed < speedArray[i]) {
			max_speed = speedArray[i];
		}
		average_speed += speedArray[i];
	}

	average_speed = average_speed / speedArray.length;
	console.log()
	console.log("##############################");
	console.log("total distance in meter::", total_distance);
	console.log("max speed ::", max_speed, "M/S");
	console.log("Average Speed::", average_speed, "M/S");
	console.log("Moving Time in seconds ::", moving_time);
	console.log("Elevation gained :: ???? not understand what exactly asked");
	console.log("##############################");
	console.log();
}



function calculate_distance(lat1, lon1, lat2, lon2, unit) {

	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}