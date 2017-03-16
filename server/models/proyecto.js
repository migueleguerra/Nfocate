var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ProyectoSchema = new Schema({
	nombre: {
		type: String,
		require: true
	},
	pagoPorHora: {
		type: Number
	},
	estado: {
		type: String,
		default: false,
		require: true
	},
	usuario: {
		type: Schema.ObjectId,
		ref: 'Usuario'
	},
	tareas: [{
		type: Schema.Types.ObjectId, 
		ref: 'Tarea'
	}]
},
{ timestamps: true });

mongoose.model("Proyecto", ProyectoSchema);