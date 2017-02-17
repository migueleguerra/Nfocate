var usuarios = require("./../controllers/usuarios.js");

module.exports = function(app){
	
	//================= rutas usuarios ===================
	app.post("/registro", function(req, res){
		usuarios.create(req, res);
	});

	app.post("/login", function(req, res){
		usuarios.login(req, res);
	})
}