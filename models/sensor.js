//on linking documents see: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var SensorSchema = new Schema(
	{
		metadata: {
			app_id: {type: String, required: true},
			hardware_serial: {type: String},
			frequency: {type: Number},
			owner: {type: String, required: true},
			location: [Number],
			active: Boolean,
		},
		payloads : []
	}
);

SensorSchema
.virtual("url")
.get(function() {
	return "/" + this.metadata.owner + "/sensor/" + this._id;	
})

module.exports = mongoose.model("Sensor", SensorSchema);