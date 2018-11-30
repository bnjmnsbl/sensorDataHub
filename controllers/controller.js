let SensorModel = require("../models/sensor");

exports.sensor_count = function (req, res) {
	//SensorModel.countDocuments({}, function(err, result) {
	SensorModel.find({}, "metadata.owner", function(err, result){

		
		let providerNames = {
			totalNumber: result.length,
			names: {}
		}
		
		result.forEach(function(el) {
			if (providerNames.names.hasOwnProperty(el.metadata.owner)) {
				providerNames.names[el.metadata.owner] += 1;
			} else {
				providerNames.names[el.metadata.owner] = 1;
			}
		})
		res.render("index", {title: "Sensor List", error: err, data: providerNames})
	})	
	// 	res.render("index", {title: "Sensor List", error: err, data: result});
	// })
}

exports.basic_api = function(req, res) {
	SensorModel.find({}, function(err, result) {
		res.json(result);
	});
}

exports.single_api = function(req, res) {
	SensorModel.findById(req.params.sensorId, function(err, result) {
	 	if (err) throw err;
	 	res.json(result);
	 });
}

exports.sensor_filter_provider = function(req, res) {
	SensorModel.find({"metadata.owner": req.params.providerId}, function(err, result) {
	
		if(result.length > 0) {
			//res.send(result)
			res.render("providerList", {title: req.params.providerId, error: err, data: result})
			}
		else {
			res.render("error", {message: "No sensor so far!", error: err});
		}
	})
}

exports.sensor_detail = function (req, res) {
	 SensorModel.findById(req.params.sensorId, function(err, result) {
	 	if (err) throw err;
	 	res.render("sensorView", {error: err, data: result});
	 })	
}









