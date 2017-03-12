
//controller es lo que va en cada una de las pestañas del navegdor
// en este caso es lo que habrá en el registro del navegador

//engloba toda la aplicación
pomoApp.controller("mainController", function(Auth, $scope, $location, $rootScope){

    $scope.loadme = false;
    //cuando un route se cambia se invoca cualquier cosa que este aqui adentro
    $rootScope.$on("$routeChangeStart", function(){
        if(Auth.isLoggedIn())
        {
            //console.log("Exito: Usuario log in");
            $scope.isLoggedIn = true;
            $scope.loadme = true;
            Auth.getInfo(function(datos){
                $scope.nombre = datos.data.nombre;
                $scope.id = datos.data.id;
            });
        }
        else
        {
            $scope.isLoggedIn = false;
            $scope.loadme = true;
            //console.log("No Exito: Usuario no esta log in");
            $scope.nombre = "";
            $scope.id = "";
        }
    });

    $scope.registro = function (regData) {
        // console.log($scope.regData);
        Auth.registroCreate(regData, function(datos){
            $scope.regData = {};
            //console.log(datos.data);
            $location.path("/listas");
        })
    }

    $scope.login = function (logData) {
        // console.log($scope.regData);
        Auth.loginCreate(logData, function(datos){
            $scope.logData = {};
            //console.log(datos.data);
            $location.path("/listas");
        })
    }

    $scope.logout = function(){
        Auth.logout();
        $location.path("/");
    }
});