var mongoose = require("mongoose");
var Usuario = mongoose.model("Usuario");
var Ajuste = mongoose.model("Ajuste");
var jwt = require("jsonwebtoken");
var secret = "uameros";

module.exports = (function(){

	return {
		create: function(req, res)
		{
			if(!req.body.nombre || !req.body.password || !req.body.email)
			{
				res.json({exito: false, msg: "Ingresa nombre, email y password"});
			}
			else
			{
				var newUsuario = new Usuario({
					nombre: req.body.nombre,
					password: req.body.password,
					email: req.body.email
				});

				newUsuario.save(function(error){
					if(error)
					{
						if(error.code === 11000)
						{
							return res.json({exito: false, msg: "Este email esta tomado, intente otro."});
						}
						return res.json({exito: false, msg: "Error de la base de datos"});
					}
					else
					{
						Usuario.findOne({
							email: req.body.email
						}, function(error, usuario){

							var newAjuste = new Ajuste({
								tiempoPomodoro: 25,
								tiempoDescansoMenor: 5,
								tiempoDescansoMayor: 30,
								sonidoPomodoro: true,
								sonidoPomodoroFinal: true,
								sonidoDescanso: true,
								sonidoDescansoFinal: true
							});

							newAjuste.usuario = usuario._id;
							usuario.ajustes = newAjuste;
							usuario.save(function(error){
								if(error)
								{
									return res.json({exito: false, msg: "Error de la base de datos"});
								}
								else
								{
									newAjuste.save(function(error){
										if(error)
										{
											return res.json({exito: false, msg: "Error de la base de datos"});
										}
										else
										{
											var token = jwt.sign({ id: usuario._id,
												   					nombre: usuario.nombre
												   				}, 
												   					secret, 
												   				{ expiresIn: "24h" });
											res.json({exito: true, msg: "Se registro correctamente", token: token});
										}
									});
								}
							});
						});
					}
				});
			}	
		},

		login: function(req, res)
		{
			Usuario.findOne({
				email: req.body.email
			}, function(error, usuario)
			{
				if(error)
				{
					return res.json({exito: false, msg: "El correo o la contraseña es incorrecta!"});
				}
				else if(usuario === null)
				{
					return res.json({exito: false, msg: "El correo o la contraseña es incorrecta!"});
				}
				else
				{
					if(usuario.compararContraseña(req.body.password))
					{
						var token = jwt.sign({ id: usuario._id,
											   nombre: usuario.nombre
											   }, 
											   secret, 
											   { expiresIn: "24h" });

						res.json({exito: true, msg: "login...", token: token});
					}
					else
					{
						res.json({exito: false, msg: "El correo o la contraseña es incorrecta!"});
					}
				}
			});		
		},

		index: function(req, res)
		{
			Usuario.findOne({ _id: req.decoded.id}, function(error){
				if(error)
				{
					return res.json({exito: false, msg: "Error, El usuario no esta log in"});
				}
				else
				{
					res.json({exito: false, nombre: req.decoded.nombre, id: req.decoded.id});
				}
			});
		},

		updateNombre: function(req, res)
		{
			Usuario.findOneAndUpdate({_id: req.decoded.id}, {$set: {nombre: req.body.nombre}}, function(error){
				if(error)
				{
					return res.json({exito: false, msg: "Error de la base de datos, no se pudo realizar los cambios en el usuario"});
				}
				else
				{
					console.log("Se hicieron los cambios en el usuario correctamente");
					var token = jwt.sign({ id: req.decoded.id,
											   nombre: req.body.nombre
											   }, 
											   secret, 
											   { expiresIn: "24h" });

					res.json({exito: true, msg: "Se cambio el nombre correctamente", token: token});
				}
			});
		},

		updatePassword: function(req, res)
		{
			Usuario.findOne({_id: req.decoded.id}, function(error, usuario){
				if(error)
				{
					return res.json({exito: false, msg: "Error de la base de datos, no se pudo encontrar el usuario"});
				}
				else
				{
					if(usuario.compararContraseña(req.body.viejaPassword))
					{
						usuario.password = req.body.nuevaPassword;
						usuario.save(function(error){
							if(error)
							{
								return res.json({exito: false, msg: "Error de la base de datos, no se pudo guardar el usuario"});
							}
							else
							{
								res.json({exito: true, msg: "Se cambio la password correctamente"});
							}
						});
					}
					else
					{
						res.json({exito: false, msg: "Password incorrecta"});
					}
				}
			});
		}
	}
})();