var mongoose = require("mongoose");
var Usuario = mongoose.model("Usuario");

module.exports = (function(){

	return {
		create: function(req, res)
		{
			if(!req.body.nombre || !req.body.contraseña || !req.body.email)
			{
				res.json({exito: false, msg: "Ingresa nombre, email y contraseña"});
			}
			else
			{
				var newUsuario = new Usuario({
					nombre: req.body.nombre,
					contraseña: req.body.contraseña,
					email: req.body.email
				});

				newUsuario.save(function(error){
					if(error)
					{
						return res.json({exito: false, msg: "Esta contraseña ya existe"});
					}
					else
					{
						res.json({
							exito: true, 
							msg: "Se creo el nuevo usuario " + req.body.nombre,
							email: req.body.email,
							contraseña: req.body.contraseña
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
					return res.json({exito: false, msg: "Este correo no existe"});
				}
				else
				{
					if(usuario.compararContraseña(req.body.contraseña))
					{
						res.json({exito: true, msg: "bienvenido"});
					}
					else
					{
						res.json({exito: false, msg: "La contraseña es invalida"});
					}
				}
			});		
		}
	}
})();