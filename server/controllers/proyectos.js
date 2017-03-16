var mongoose = require("mongoose");
var Proyecto = mongoose.model("Proyecto");
var Tarea = mongoose.model("Tarea");
var Usuario = mongoose.model("Usuario");

module.exports = (function(){
	return {

		index: function(req, res){
			Usuario.find({_id: req.decoded.id}).populate('proyectos').exec(function(error, data){
				if(error)
				{
					return res.json({exito: false, msg: "Error de la base de datos, no se pudieron obtener los proyectos"});
				}
				else
				{
					res.json({exito: true, msg:"Proyectos", data: data[0].proyectos});
				}
			});
		},

		indexTareas: function(req, res){
			Proyecto.findOne({_id: req.body.idProyecto}).populate('tareas').exec(function(error, tareas){
				if(error)
				{
					return res.json({exito: false, msg: "Error de la base de datos, no se pudieron obtener las tareas"});
				}
				else
				{
					res.json({exito: true, msg:"Tareas", data: tareas.tareas});
				}
			});
		},

		updateNombre: function(req, res){

			Proyecto.findOneAndUpdate({_id: req.body.idProyecto}, {$set: {nombre: req.body.nombre}}, function(error){
				if(error)
				{
					return res.json({exito: false, msg: "Error de la base de datos, guardar los cambios en el proyecto"});
				}
				else
				{
					console.log("Se guardaron correctamente los cambios en el proyecto");
					res.redirect("/proyectos");
				}
			});
		},

		updatePago: function(req, res){
			Proyecto.findOneAndUpdate({_id: req.body.idProyecto}, {$set: {pagoPorHora: req.body.pagoPorHora}}, function(error){
				if(error)
				{
					return res.json({exito: false, msg: "Error de la base de datos, guardar los cambios en el proyecto"});
				}
				else
				{
					console.log("Se guardaron correctamente los cambios en el proyecto");
					res.redirect("/proyectos");
				}
			});
		},

		create: function(req, res){

			Usuario.findOne({_id: req.decoded.id}, function(error, usuario){
				var newProyecto = new Proyecto({
					nombre: req.body.nombre,
					pagoPorHora: req.body.pagoPorHora
				});

				newProyecto.usuario = usuario._id;
				usuario.proyectos.push(newProyecto);
				usuario.save(function(error){
					if(error)
					{
						return res.json({exito: false, msg: "Error de la base de datos, no se guardo la información en el usuario"});
					}
					else
					{
						newProyecto.save(function(error){
							if(error)
							{
								return res.json({exito: false, msg: "Error de la base de datos, no se creo el proyecto"});
							}
							else
							{
								console.log("Se creo correctamente un proyecto");
								res.redirect("/proyectos");
							}
						});
					}
				});
			});
		},

		agregarTareaAProyecto: function(req, res){

			Usuario.find({_id: req.decoded.id}).populate('tareas').exec(function(error, tareas){
				if(error)
				{
					return res.json({exito: false, msg: "Error de la base de datos, no se pudieron obtener las tareas"});
				}
				else
				{
					var flag = false
					for(var i = 0; i < tareas[0].tareas.length; i++)
					{
						if(tareas[0].tareas[i]._id == req.body.idTarea)
						{
							var ID = req.body.idTarea;
							flag = true;
						}
					}
					
					if(!flag) 
    				{
    					res.json({exito: false, msg: "No se encontrado tareas con esa idTarea"});
    				}
    				else
    				{
    					Proyecto.findOne({_id: req.body.idProyecto}, function(error, proyecto){
    						if(error)
    						{
    							return res.json({exito: false, msg: "Error de la base de datos, no se pudo obtener el proyecto"});
    						}
    						else
    						{
    							Tarea.findOne({_id: req.body.idTarea}, function(error, tarea){
    								if(error)
    								{
    									return res.json({exito: false, msg: "Error de la base de datos, no se pudo obtener la tarea"});
    								}
    								else
    								{
    									if(proyecto.tareas.indexOf(tarea._id) === -1)
    									{
    										proyecto.tareas.push(tarea);
	    									proyecto.save(function(error){
	    										if(error)
	    										{
	    											return res.json({exito: false, msg: "Error de la base de datos, no se pudo guardar el proyecto"});
	    										}
	    										else
	    										{
	    											tarea.proyecto = proyecto._id;
	    											tarea.save(function(error){
			    										if(error)
			    										{
			    											return res.json({exito: false, msg: "Error de la base de datos, no se pudo guardar la tarea"});
			    										}
			    										else
			    										{
			    											console.log("Se agrego la tarea al proyecto correctamente");
			    											res.redirect("/proyectos");
			    										}
		    										});
	    										}
	    									});
    									}
    									else
    									{
    										res.json({exito: false, msg: "Ya existe esa tarea"});
    									}
    								}
    							});
    						}
    					});
    				}
				}
			});
		},

		eliminarTareaDeProyecto: function(req, res){

			Proyecto.findOne({_id: req.body.idProyecto}, function(error, proyectoo){
				if(error)
				{
		    		return res.json({exito: false, msg: "Error de la base de datos, no se pudo obtener el proyecto"});
				}
				else
				{
					var index = proyectoo.tareas.indexOf(req.body.idTarea);
					if (index <= -1)
					{
						res.json({exito: false, msg: "No se encontro tarea en proyecto"});
					}
					else
					{
						proyectoo.tareas.splice(index, 1);
						proyectoo.save(function(error){
							if(error)
							{
								return res.json({exito: false, msg: "Error de la base de datos, no se pudo guardar el proyecto"});
							}
							else
							{
								Tarea.findOne({_id: req.body.idTarea}, function(error, tarea){
									if(error)
									{
										return res.json({exito: false, msg: "Error de la base de datos, no se pudo obtener la tarea"});
									}
									else
									{
										//!!!! Por alguna razon no me deja eliminar este item del objeto !!!
										delete tarea.proyecto;
										tarea.save(function(error){
											if(error)
											{
												return res.json({exito: false, msg: "Error de la base de datos, no se pudo guardar la tarea"});
											}
											else
											{
												console.log("Se elimino la tarea al proyecto correctamente");
		    									res.redirect("/proyectos");
											}
										});
									}	
								});
							}
						});
					} 
				}
			});
		},

		eliminarProyecto: function(req, res){
			Usuario.findOne({_id: req.decoded.id}, function(error, usuario){
				if(error)
				{
					return res.json({exito: false, msg: "Error de la base de datos, no se encontro el usuario"});
				}
				else
				{
					Proyecto.remove({_id: req.body.idProyecto}, function(error){
						if(error)
						{
							return res.json({exito: false, msg: "Error de la base de datos, no se pudo eliminar el proyecto"});
						}
						else
						{
							var index = usuario.proyectos.indexOf(req.body.idProyecto);
							if (index > -1) 
    							usuario.proyectos.splice(index, 1);

    						usuario.save(function(error){
    							if(error)
    							{
    								return res.json({exito: false, msg: "Error de la base de datos, guardar el usuario"});
    							}
    							else
    							{
    								console.log("Se elimino el proyecto");
									res.redirect("/proyectos");
    							}
    						});
						}
					});
				}
			});
		}
	}
})();