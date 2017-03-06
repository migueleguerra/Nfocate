// La fábrica
pomoApp.factory("usuarioFactory", function($http){
  var factory = {};

  // Aqui estamos conectando con el backend, por lo que
  // la ruta de post debe ser nombrada igual en el backend
  factory.registroCreate = function(regData, callback){
    // then :: una vez que me contestó el backend
    $http.post("/registro", regData).then(function(datos){
      callback(datos);
    });
  }

  factory.loginCreate = function(regData, callback){
    // then :: una vez que me contestó el backend
    $http.post("/login", regData).then(function(datos){
      callback(datos);
    });
  }

  return factory;
});