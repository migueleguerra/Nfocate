var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TareaUrgenteSchema = new Schema({
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
	horaHacer: {
		type: Date,
		require: true
	},
	estado: {
		type: String,
		require: true
	}
},
{ timestamps: true });

mongoose.model("TareaUrgente", TareaUrgenteSchema);