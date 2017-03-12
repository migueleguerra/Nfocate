var usuarios = require("./../controllers/usuarios.js");
var jwt = require("jsonwebtoken");

module.exports = function(app){
	
	//================= rutas usuarios ===================
	app.post("/registro", function(req, res){
		usuarios.create(req, res);
	});

	app.post("/login", function(req, res){
		usuarios.login(req, res);
	});

	app.use(function(req, res, next){
		var token = req.body.token || req.body.query || req.headers["x-access-token"];

		if(token)
		{
			jwt.verify(token, "uameros", function(error, decoded){

				if(error)
				{
					res.json({exito: false, msg: "Token no valido" });
				}
				else
				{
					req.decoded = decoded;
					next();
				}
			});
		}
		else
		{
			res.json({ exito: false, msg: "No token"});
		}

	});

	app.post("/app", function(req, res){
		res.send(req.decoded);
	})
}
