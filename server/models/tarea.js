var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TareaSchema = new Schema({
	nombre: {
		type: String,
		require: true
	},
	estimacionPomodoro: {
		type: Number
	},
	pomodorosUsados: {
		type: Number,
		default: 0,
		require: true
	},
	fechaTerminacion: {
		type: Date
	},
	estado: {
		type: String,
		require: true
	}
},
{ timestamps: true });

mongoose.model("Tarea", TareaSchema);