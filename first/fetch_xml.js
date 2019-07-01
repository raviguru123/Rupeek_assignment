var 
	request 	= require('request'),
	Q 			= require("q"),
	parseString = require('xml2js').parseString,
	_ 			= require("lodash");




function data_access() {

}

data_access.prototype._fetchdata = function() {
	var 
			self 	= this,
			defer 	= Q.defer();
	request('https://dl.dropboxusercontent.com/s/8nvqnasci6l76nz/Problem.gpx', function (error, response, body) {
			parseString(body, function (err, result) {
			    defer.resolve(result.gpx.trk[0].trkseg[0].trkpt);
			});
	});
	return defer.promise;
}


module.exports = data_access;




