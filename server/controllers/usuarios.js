var mongoose = require("mongoose");
var Usuario = mongoose.model("Usuario");
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
							if(error)
							{
								return res.json({exito: flase, msg: "Error del sistema no se logro ingresar"});
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
		}
	}
})();