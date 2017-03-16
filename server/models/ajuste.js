var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AjusteSchema = new Schema({
	tiempoPomodoro: {
		type: Number, 
		min: 0, 
		max: 90,
		require: true
	},
	tiempoDescansoMenor: {
		type: Number,
		min: 0,
		max: 15,
		require: true
	},
	tiempoDescansoMayor: {
		type: Number,
		min: 0,
		max: 60,
		require: true
	},
	sonidoPomodoro: {
		type: Boolean,
		require: true
	},
	sonidoPomodoroFinal: {
		type: Boolean,
		require: true
	},
	sonidoDescanso: {
		type: Boolean,
		require: true
	},
	sonidoDescansoFinal: {
		type: Boolean,
		require: true
	},
	usuario: {
		type: Schema.ObjectId,
		ref: 'Usuario'
	}
},
{ timestamps: true });

mongoose.model("Ajuste", AjusteSchema);