let ttn = require("ttn"),
config = require(__dirname + '/config.json'),
SensorModel = require("./models/sensor"),
db = require("./db");

let region = config.region,
appId = config.appId,
accessKey = config.key;


ttn.data(appId, accessKey)
	.then((client)=> {
		console.log("connected");
		
		client.on("uplink", (function(devId, message) {
			SensorModel.findOne({"metadata.app_id": appId}, function(err, sensor) {
				if (!sensor) {
					console.log("Not found in DB. Creating new sensor entry")
					
					let data = {
						"metadata": {
							"app_id": message.app_id,
							"hardware_serial": message.hardware_serial,
							"frequency": message.metadata.frequency,
							"owner": config.owner
							},
						"payloads": {
							"payload": message.payload_fields,
							"timestamp": message.metadata.time 
						}
					}
					let newSensor = new SensorModel(data);

					newSensor.save(function(err, data) {
						if (err) throw err
						console.log("Sensor created: " + data);
					})
				}
				else {

				let data = {
					"payload": message.payload_fields,
					"timestamp": message.metadata.time 
				}
				sensor.payloads.push(data);
			    
			    console.log("Sensor found: ");
			    console.dir(data);

				sensor.save(function(err, updatedData) {
					if (err) throw err;
					console.dir("I updated: " + updatedData);
				})
				}
			})
			
		}));
	})


