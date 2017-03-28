// La fábrica
pomoApp.factory("Auth", function($http, AuthToken){
    var factory = {};

    // Aqui estamos conectando con el backend, por lo que
    // la ruta de post debe ser nombrada igual en el backend
    factory.registroCreate = function(regData, callback){
        // then :: una vez que me contestó el backend
        $http.post("/registro", regData).then(function(datos){
            AuthToken.setToken(datos.data.token);
            callback(datos);
        });
    }

    factory.isLoggedIn = function(){
        if(AuthToken.getToken())
            return true;
        else
            return false;     
    }

    factory.loginCreate = function(regData, callback){
        // then :: una vez que me contestó el backend
        $http.post("/login", regData).then(function(datos){
            AuthToken.setToken(datos.data.token);
            callback(datos);
        });
    }

    factory.getInfo = function(callback){
        if(AuthToken.getToken())
        {
            $http.get("/info").then(function(datos){
                callback(datos);
            })
        }
        else
        {
            $q.reject({ msg: "Usuario no tiene token"});
        }
    }

    factory.logout = function(){
        AuthToken.setToken();
    }

    return factory;
});

pomoApp.factory("AuthToken", function($window){
    var factory = {};

    factory.setToken = function(token){
        if(token)
            $window.localStorage.setItem("token", token);
        else
            $window.localStorage.removeItem("token");
    }

    factory.getToken = function(){
        return $window.localStorage.getItem("token");
    }

    return factory;
});

//funcion que intercepta todos los https request
pomoApp.factory("AuthInterceptors", function(AuthToken){
    var factory = {};

    factory.request = function(config){

        var token = AuthToken.getToken();

        if(token){
            config.headers["x-access-token"] = token;
        }

        return config;
    }

    return factory;

});

// conecta a base de datos para bajar la información del usuario
pomoApp.factory("FactoryUsuario", function(AuthToken, $http){
    var factory = {};

    factory.getUserTareas = function(callback) {
        if (AuthToken.getToken()) {
            $http.get("/tareas").then(function (tareas){
                callback(tareas);
            });
        } else {
            $q.reject({ msg: "Usuario no tiene token"});
        }
    }

    factory.createTarea = function(data, callback){
        if (AuthToken.getToken()) {
            $http.post("/crearTarea", data).then( function(tareas) {
                    callback(tareas);
            });
        } else {
            $q.reject({ msg: "Usuario no tiene token"});
        }
    };

    factory.deleteTarea = function(data, callback){
        
        if (AuthToken.getToken()) {
            $http.post("/eliminarTarea", data).then( function(tareas) {
                callback(tareas);
            });
        } else {
            $q.reject({ msg: "Usuario no tiene token"});
        }
    };

    factory.obtenerTiempoPomo = function(callback){
        if (AuthToken.getToken()) {
            $http.get("/obtenerPomoTiempo").then( function(data) {
                callback(data);
            });
        } else {
            $q.reject({ msg: "Usuario no tiene token"});
        }
    };

    factory.acutalizarPomoTarea = function (tareaData, callback){
         if (AuthToken.getToken()) {
            $http.post("/updatePomoTarea", tareaData).then( function(data) {
                callback(data);
            });
        } else {
            $q.reject({ msg: "Usuario no tiene token"});
        }
    };

    factory.terminarTarea = function (tarea, callback){
         if (AuthToken.getToken()) {
            $http.post("/terminarTarea", tarea).then( function(data) {
                callback(data);
            });
        } else {
            $q.reject({ msg: "Usuario no tiene token"});
        }
    };

    return factory;
});