var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ProyectoSchema = new Schema({
	nombre: {
		type: String,
		require: true
	},
	pagoPorHora: {
		type: Number,
		get: getPago,
		set: setPago
	},
	estado: {
		type: String,
		require: true
	}
},
{ timestamps: true });

/*solo puede ingresar cifras asi: 59, 59.00, 59.99 
--- no se puede asi: $59, 59.0*/

function getPago(num){
    return (num/100).toFixed(2);
}

function setPago(num){
    return num*100;
}