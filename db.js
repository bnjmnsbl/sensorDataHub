let mongoose = require("mongoose");
let SensorModel = require("./models/sensor");
let getTTN = require("./getTTNtest");

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })

mongoose.Promise = global.Promise

let db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error"));

function deleteSensor(name) {

	SensorModel.findOneAndDelete({"metadata.app_id": name}, function(err, data) {
		if (err) throw err;
		console.log("removed: " + name);
	})
}

function createAndSaveSensor (props) {

  SensorModel.findOne({"metadata.app_id": props.metadata.app_id}, function(err, sensor) {
  
	  if (sensor) {
	  	console.log("AppId already found in database")
	  	return null;
	  }
	  else {

	  let sensor = new SensorModel(props);
	  
	  sensor.save(function(err, data) {
	    if (err) throw err;
	    console.dir("saved: " + data);
	  })
	 }
	})
};

function createDummyData(appId, owner) {

	let props = {
		metadata: {
			"app_id": appId,
		    "owner": owner,
			 
		},
		payloads: []

	}

	for (i=0; i<10; i++) {
		let dummy1 = Math.floor((Math.random() * 30) + 1);
		let dummy2 = Math.floor((Math.random() * 200) + 1);
		let timestamp = new Date(2018, 10, i, 12, 00, 00);

		props["payloads"].push({
			"payload": {
				"temperature": dummy1,
				"pressure": dummy2
			},
			"timestamp": timestamp
		});
	}

	return props; 
}


//createAndSaveSensor(createDummyData("Stromnetz_Test", "Stromnetz"));
//deleteSensor("Stromnetz");
module.exports = db;