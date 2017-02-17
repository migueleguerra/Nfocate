var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

var Schema = mongoose.Schema;

var UsuarioSchema = new Schema({
	nombre: {
		type: String,
		require: true
	},
	contraseña: {
		type: String, 
		require: true
	},
	email: {
		type: String, 
		require: true, 
		unique: true
	}
}, 
{ timestamps: true });

UsuarioSchema.pre("save", function(next){
	var usuario = this;

	if(this.isModified("password") || this.isNew)
	{
		bcrypt.genSalt(10, function(error, salt){
			if(error)
			{
				return next(error);
			}
			else
			{
				bcrypt.hash(usuario.contraseña, salt, function(error, hash){
					if(error)
					{
						return next(error);
					}
					else
					{
						usuario.contraseña = hash;
						next();
					}
				});
			}
		});
	}
	else
	{
		return next();
	}
});

UsuarioSchema.methods.compararContraseña = function(passw){
	return bcrypt.compareSync(passw, this.contraseña);
}

mongoose.model("Usuario", UsuarioSchema);

