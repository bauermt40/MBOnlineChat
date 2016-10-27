(function() {
'use strict';

    angular
        .module('angularfireSlackApp')
        .controller('AuthController', AuthController);

    AuthController.$inject = ['Auth', '$state', 'Users'];
    function AuthController(Auth, $state, Users) {
        var authCtrl = this;
        authCtrl.user = {
            email: '',
            password: ''
        };
        authCtrl.login = login;
        authCtrl.register = register;

        function login() {
            Auth.$authWithPassword(authCtrl.user)
                .then(function(auth) {
                    $state.go('profile');
                }, function(err) {
                    authCtrl.error = err;
                });
         }

         function register() {
           Auth.$createUser(authCtrl.user)
             .then(function (user) {
               authCtrl.login();
             }, function (error) {
               authCtrl.error = error;
             });
         }

    }
})();