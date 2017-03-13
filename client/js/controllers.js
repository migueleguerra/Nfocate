
//controller es lo que va en cada una de las pestañas del navegdor
// en este caso es lo que habrá en el registro del navegador

//engloba toda la aplicación
pomoApp.controller("mainController", function(Auth, $scope, $location, $rootScope, $timeout){

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
        $scope.rcargando = true;
        $scope.rmensajeExito = false;
        $scope.rmensajeError = false;

        Auth.registroCreate(regData, function(datos){
            if(datos.data.exito)
            {
                $scope.rcargando = false;
                $scope.rregData = {};
                $scope.rmensajeExito = datos.data.msg + " ...Ingresando";
                $timeout(function() {
                    $location.path("/listas");
                }, 1500);
            }
            else
            {
                $scope.rcargando = false;
                $scope.rmensajeError = datos.data.msg;
                $timeout(function() {
                    $scope.rmensajeError = false;
                }, 3000);
                $scope.lmensajeExito = false;
            }
        });
    }

    $scope.login = function (logData) {
        $scope.lcargando = true;
        $scope.lmensajeExito = false;
        $scope.lmensajeError = false;

        Auth.loginCreate(logData, function(datos){
            if(datos.data.exito)
            {
                $scope.lcargando = false;
                $scope.lregData = {};
                $scope.lmensajeExito = datos.data.msg + " ...Ingresando";
                $timeout(function() {
                    $location.path("/listas");
                    $scope.lmensajeExito = false;
                }, 1500);
            }
            else
            {
                $scope.lcargando = false;
                $scope.lmensajeError = datos.data.msg;
                $timeout(function() {
                    $scope.lmensajeError = false;
                }, 3000);
            }
        });
    }

    $scope.logout = function(){
        Auth.logout();
        $location.path("/");
    }
});
