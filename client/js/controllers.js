
//controller es lo que va en cada una de las pestañas del navegdor
// en este caso es lo que habrá en el registro del navegador

// $scope con variables o funciones que puedes usar en el html y controller
pomoApp.controller("registroController", function($scope, usuarioFactory){
  
  // Dentro de html, en ng-model, los nombres deben coincidir con los del modelo-
  $scope.registro = function (regData) {
    // console.log($scope.regData);
    usuarioFactory.registroCreate(regData, function(datos){
      if (datos.data.exito) {
        // todo cool
      }
    })
  }

});

pomoApp.controller("loginController", function($scope, usuarioFactory){
  
  // Dentro de html, en ng-model, los nombres deben coincidir con los del modelo-
  $scope.login = function (regData) {
    // console.log($scope.regData);
    usuarioFactory.loginCreate(regData, function(datos){
      console.log(datos.data);
    })
  }

});