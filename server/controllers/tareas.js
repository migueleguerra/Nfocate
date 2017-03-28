var mongoose = require("mongoose");
var Tarea = mongoose.model("Tarea");
var Usuario = mongoose.model("Usuario");

module.exports = (function(){
	return {
		create: function(req, res){
			var newTarea = new Tarea({
				nombre: req.body.nombre,
				tipoTarea: req.body.tipoTarea,
				estimacionPomodoro: req.body.estimacionPomodoro,
				horaHacer: req.body.horaHacer
			});

			Usuario.findOne({_id: req.decoded.id}, function(error, usuario){
				if(error)
				{
					return res.json({exito: false, msg: "Error de la base de datos, no se encontro el usuario"});
				}
				else
				{
					newTarea.usuario = usuario._id;
					usuario.tareas.push(newTarea);
					usuario.save(function(error){
						if(error)
						{
							return res.json({exito: false, msg: "Error de la base de datos, no se agrego el usuario"});
						}
						else
						{
							newTarea.save(function(error){
								if(error)
								{
									return res.json({exito: false, msg: "Error de la base de datos, no se agrego newTarea"});
								}
								else
								{
									console.log("Se agrego una tarea correctamente");
									res.redirect("/tareas");
								}
							});
						}
					});
				}
			});
		},

		index: function(req, res){
			Usuario.find({_id: req.decoded.id}).populate('tareas').exec(function(error, data){
				if(error)
				{
					return res.json({exito: false, msg: "Error de la base de datos, no se pudieron obtener las tareas"});
				}
				else
				{
					res.json({exito: true, msg:"Tareas", data: data[0].tareas});
				}
			});
		},

		update: function(req, res){
			var newTarea = new Tarea({
				nombre: req.body.nombre,
				tipoTarea: req.body.tipoTarea,
				estimacionPomodoro: req.body.estimacionPomodoro,
				horaHacer: req.body.horaHacer
			});

			var array = JSON.parse("[" + req.body.pomodorosUsados + "]");
			for(var i = 0; i < array.length; i++)
				newTarea.pomodorosUsados.push(array[i]);

			var upsertData = newTarea.toObject();
			delete upsertData._id;

			Tarea.findOneAndUpdate({_id: req.body.id}, upsertData, function(error){
				if(error)
				{
					return res.json({exito: false, msg: "Error de la base de datos, no se pudo updateAll"});
				}
				else
				{
					console.log("Se modifico exitosamente");
					res.redirect("/tareas");
				}
			});
		},

		updatePomo: function(req, res){
			Tarea.findOneAndUpdate({_id: req.body.id}, {$push:{ pomodorosUsados: req.body.pomodorosUsados }}, function(error){
				if(error)
				{
					return res.json({exito: false, msg: "Error de la base de datos, no se agrego pomodorosUsados"});
				}
				else
				{
					console.log("Se agrego tiempo a pomodorosUsados");
					res.redirect("/tareas");
				}
			});
		},

		terminar: function(req, res){
			var	newEstado = true;

			Tarea.findOneAndUpdate({_id: req.body.id}, {$set:{estado: newEstado}}, function(error){
				if(error)
				{
					return res.json({exito: false, msg: "Error de la base de datos, no se pudo terminar tarea"});
				}
				else
				{
					console.log("Termino tarea");
					res.redirect("/tareas");
				}
			});
		},

		eliminar: function(req, res){

			Usuario.findOne({_id: req.decoded.id}, function(error, usuario){
				if(error)
				{
					return res.json({exito: false, msg: "Error de la base de datos, no se encontro el usuario"});
				}
				else
				{
					Tarea.remove({_id: req.body.id}, function(error){
						if(error)
						{
							return res.json({exito: false, msg: "Error de la base de datos, no se pudo eliminar tarea"});
						}
						else
						{
							var index = usuario.tareas.indexOf(req.body.id);
							if (index > -1) 
    						usuario.tareas.splice(index, 1);

    						usuario.save(function(error){
    							if(error)
    							{
    								return res.json({exito: false, msg: "Error de la base de datos, guardar el usuario"});
    							}
    							else
    							{
    							console.log("Se elimino tarea");
									res.redirect("/tareas");
    							}
    						});
						}
					});
				}
			});
		},
		obtenerPomoTiempo : function(req, res) {
			Usuario.find({_id: req.decoded.id}).populate('ajustes').exec(function (error, usuario){
				if(error)
					{
						return res.json({exito: false, msg: "Error de la base de datos, consultar el usuario"});
					}
					else
					{
						res.json({exito: true, msg: "Pomotiempo encontrado", data: usuario[0].ajustes.tiempoPomodoro});
					}
			});
		}
	}
})();