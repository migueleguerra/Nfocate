var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TareaSchema = new Schema({
	nombre: {
		type: String,
		require: true
	},
	tipoTarea: {
		type: String,
		require: true
	},
	estimacionPomodoro: {
		type: Number
	},
	pomodorosUsados: [{
		type: Number,
	}],
	estado: {
		type: Boolean,
		default: false,
		require: true
	},
	horaHacer: {
		type: Date
	},
	usuario: {
		type: Schema.ObjectId,
		ref: 'Usuario'
	},
	proyecto: {
		type: Schema.ObjectId,
		ref: 'Proyecto'
	}
},
{ timestamps: true });

mongoose.model("Tarea", TareaSchema);