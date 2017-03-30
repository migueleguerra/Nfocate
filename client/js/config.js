// Archivo de configuración Angular

// variable de aplicación de Angular
// debemos agregar los módulos a la variable
var pomoApp = angular.module("pomoApp", ["ngRoute", "ngMessages", "ngMaterial", "uiSwitch"]);

//intercepta todos los https request con el factory AuthInterceptors
pomoApp.config(function($httpProvider){
    $httpProvider.interceptors.push("AuthInterceptors");
});

// configurando rutas
pomoApp.config( function($routeProvider){
  $routeProvider
  .when("/home", {
    templateUrl: "partials/home.html"
  })
  .when("/login", {
    templateUrl: "partials/login.html"
  })
  .when("/registro", {
    templateUrl: "partials/registro.html"
  })
  .when("/comofunciona", {
    templateUrl: "partials/comoFunciona.html"
  })
  .when("/testimonios", {
    templateUrl: "partials/testimonios.html"
  })
  .when("/listas", {
    templateUrl: "partials/listas.html"
  })
  .when("/temporizador", {
    templateUrl: "partials/temporizador.html"
  })
  .when("/ajustes", {
    templateUrl: "partials/ajustes.html"
  })
  .when("/analisis", {
    templateUrl: "partials/analisis.html"
  })
  .when("/profile", {
    templateUrl: "partials/profile.html"
  })
  .otherwise({
    redirectTo: "/home"
  });
});

