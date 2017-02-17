var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AjusteSchema = new Schema({
	tiempoPomodoro: {
		type: Number, 
		min: 0, 
		max: 90, 
		default: 25, 
		require: true
	},
	TiempoDescansoMenor: {
		type: Number,
		min: 0,
		max: 15,
		defalut: 5,
		require: true
	},
	TiempoDescansoMayor: {
		type: Number,
		min: 0,
		max: 45,
		defalut: 30,
		require: true
	},
	SonidoPomodoro: {
		type: Boolean,
		defalut: true,
		require: true
	},
	SonidoPomodoroFinal: {
		type: Boolean,
		defalut: true,
		require: true
	},
	SonidoDescanso: {
		type: Boolean,
		defalut: true,
		require: true
	},
	SonidoDescansoFinal: {
		type: Boolean,
		defalut: true,
		require: true
	}
},
{ timestamps: true });

mongoose.model("Ajuste", AjusteSchema);