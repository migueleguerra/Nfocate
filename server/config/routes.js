var usuarios = require("./../controllers/usuarios.js");
var tareas = require("./../controllers/tareas.js");
var ajustes = require("./../controllers/ajustes.js");
var proyectos = require("./../controllers/proyectos.js")
var jwt = require("jsonwebtoken");

module.exports = function(app){
	
	//================= rutas usuarios ===================

	/*
		en esta ruta "/registro" se envian los campos:
		nombre (requerido) (String)
		password (requerido) (String)
		email (requerido) (String)
	*/
	app.post("/registro", function(req, res){
		usuarios.create(req, res);
	});

	/*
		en esta ruta "/login" se envian los campos:
		email (requerido) (String)
		password (requerido) (String)
	*/
	app.post("/login", function(req, res){
		usuarios.login(req, res);
	});

	/* ================= Middleware que identifica el token ================= */
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

	//Se envia solo x-access-token: token
	app.get("/info", function(req, res){
		usuarios.index(req, res);
	});

	/*
		en esta ruta "/crearTarea" se envian los campos:
		x-access-token: token
		nombre (requerido) (String)
	*/
	app.post("/updateUsuarioNombre", function(req, res){
		usuarios.updateNombre(req, res);
	});

	/*
		en esta ruta "/crearTarea" se envian los campos:
		x-access-token: token
		viejaPassword (requerido) (String)
		nuevaPassword (requerido) (String)
	*/
	app.post("/updateUsuarioPassword", function(req, res){
		usuarios.updatePassword(req, res);
	});

	/* ================= Tareas ================= */

	//Se envia solo x-access-token: token
	app.get("/tareas", function(req, res){
		tareas.index(req, res);
	});

	/*
		en esta ruta "/crearTarea" se envian los campos:
		x-access-token: token
		idTarea (requerido) (String)
		nombre (requerido) (String)
		estimacionPomodoro (opcional) (Number)
		tipoTarea (requerido) (String)
		horaHacer (opcional) (Date)
	*/
	app.post("/crearTarea", function(req, res){
		tareas.create(req, res);
	})

	/*
		en esta ruta "/updateTarea" se envian los campos:
		x-access-token: token
		idTarea (requerido) (String)
		nombre (requerido) (String)
		estimacionPomodoro (opcional) (Number)
		pomodorosUsados (requerido)  ejemplo: 25, 35, 35 (Number, Number, ...)
		tipoTarea (requerido) (String)
		horaHacer (opcional) (Date)
	*/
	app.post("/updateTarea", function(req, res){
		tareas.update(req, res);
	});

	/*
		en esta ruta "/updatePomoTarea" se envian los campos:
		x-access-token: token
		id (requerido) (String)
		pomodorosUsados (requerido) (Esta información la obtienes de los ajustes de cada usuario en la variable "tiempoPomodoro") (Number)
	*/
	app.post("/updatePomoTarea", function(req, res){
		tareas.updatePomo(req, res);
	});

	/*
		en esta ruta "/terminarTarea" se envian los campos:
		x-access-token: token
		idTarea (requerido) (String)
	*/
	app.post("/terminarTarea", function(req, res){
		tareas.terminar(req, res);
	});

	/*
		en esta ruta "/eliminarTarea" se envian los campos:
		x-access-token: token
		idTarea (requerido) (String)
	*/
	app.post("/eliminarTarea", function(req, res){
		tareas.eliminar(req, res);
	});

	app.get("/obtenerPomoTiempo", function(req, res){
		tareas.obtenerPomoTiempo(req, res);
	});

	/* ================= Ajustes ================= */

	//Se envia solo x-access-token: token
	app.get("/ajustes", function(req, res){
		ajustes.index(req, res);
	});

	/*
		en esta ruta "/updateAjustes" se envian los campos:
		x-access-token: token 
		idAjuste (requerido) (String)
		tiempoPomodoro (requerido) (Number)
		tiempoDescansoMenor (requerido) (Number)
		tiempoDescansoMayor (requerido) (Number)
		sonidoPomodoro (requerido) (Boolean)
		sonidoPomodoroFinal (requerido) (Boolean)
		sonidoDescanso (requerido) (Boolean)
		sonidoDescansoFinal (requerido) (Boolean)
	*/
	app.post("/updateAjustes", function(req, res){
		ajustes.update(req, res);
	});

	/* ================= Proyectos ================= */

	//Se envia solo x-access-token: token
	app.get("/proyectos", function(req, res){
		proyectos.index(req, res);
	});

	/*
		en esta ruta "/proyectoTareas" se envian los campos:
		x-access-token: token 
		idProyecto (requerido) (String)
	*/
	app.post("/proyectoTareas", function(req, res){
		proyectos.indexTareas(req, res);
	});

	/*
		en esta ruta "/crearProyecto" se envian los campos:
		x-access-token: token 
		nombre (requerido) (String)
		pagoPorHora (opcional) (Number) ejemplo: 59, 59.00, 59.99
	*/
	app.post("/crearProyecto", function(req, res){
		proyectos.create(req, res);
	});

	/*
		en esta ruta "/agregarTareaAProyecto" se envian los campos:
		x-access-token: token 
		idTarea (requerido) (String)
		idProyecto (requerido) (String)
	*/
	app.post("/agregarTareaAProyecto", function(req, res){
		proyectos.agregarTareaAProyecto(req, res);
	});

	/*
		en esta ruta "/agregarTareaAProyecto" se envian los campos:
		x-access-token: token 
		idTarea (requerido) (String)
		idProyecto (requerido) (String)
	*/
	app.post("/eliminarTareaDeProyecto", function(req, res){
		proyectos.eliminarTareaDeProyecto(req, res);
	});

	/*
		en esta ruta "/agregarTareaAProyecto" se envian los campos:
		x-access-token: token 
		idProyecto (requerido) (String)
		nombre (requerido) (String)
	*/
	app.post("/updateNombreProyecto", function(req, res){
		proyectos.updateNombre(req, res);
	});

	/*
		en esta ruta "/agregarTareaAProyecto" se envian los campos:
		x-access-token: token 
		idProyecto (requerido) (String)
		pagoPorHora (requerido) (String)
	*/
	app.post("/updatePagoProyecto", function(req, res){
		proyectos.updatePago(req, res);
	});

	/*
		en esta ruta "/agregarTareaAProyecto" se envian los campos:
		x-access-token: token 
		idProyecto (requerido) (String)
	*/
	app.post("/eliminarProyecto", function(req, res){
		proyectos.eliminarProyecto(req, res);
	});

}