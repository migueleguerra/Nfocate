var mongoose = require("mongoose");
var Ajuste = mongoose.model("Ajuste");
var Usuario = mongoose.model("Usuario");

module.exports = (function(){
	return {

		index: function(req, res){

			Usuario.find({_id: req.decoded.id}).populate('ajustes').exec(function(error, data){
				if(error)
				{
					return res.json({exito: false, msg: "Error de la base de datos, no se pudieron obtener los ajustes"});
				}
				else
				{
					res.json({exito: true, msg:"Ajustes", data: data[0].ajustes});
				}
			});
		},

		update: function(req, res){

			var newAjuste = new Ajuste({
				tiempoPomodoro: req.body.tiempoPomodoro,
				tiempoDescansoMenor: req.body.tiempoDescansoMenor,
				tiempoDescansoMayor: req.body.tiempoDescansoMayor,
				sonidoPomodoro: req.body.sonidoPomodoro,
				sonidoPomodoroFinal: req.body.sonidoPomodoroFinal,
				sonidoDescanso: req.body.sonidoDescanso,
				sonidoDescansoFinal: req.body.sonidoDescansoFinal
			});

			var upsertData = newAjuste.toObject();
			delete upsertData._id;

			Ajuste.findOneAndUpdate({_id: req.body.id}, upsertData, function(error){
				if(error)
				{
					return res.json({exito: false, msg: "Error de la base de datos, no se pudo update"});
				}
				else
				{
					console.log("Se modifico exitosamente");
					res.redirect("/ajustes");
				}
			});
		}
	}
})();