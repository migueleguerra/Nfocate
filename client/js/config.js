// Archivo de configuración Angular

// variable de aplicación de Angular
// debemos agregar los módulos a la variable
var pomoApp = angular.module("pomoApp", ["ngRoute", "ngMessages"]);

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
  .otherwise({
    redirectTo: "/home"
  });
});