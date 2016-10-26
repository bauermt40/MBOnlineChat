(function() {
'use strict';

    angular
        .module('angularfireSlackApp')
        .controller('AuthController', AuthController);

    AuthController.$inject = ['Auth', '$state', 'Users'];
    function AuthController(Auth, $state, Users) {
        var $ctrl = this;
        $ctrl.user = {
            email: '',
            password: ''
        };
        $ctrl.login = login;
        $ctrl.register = register;

        function login() {
            Auth.$authWithPassword($ctrl.user)
                .then(function(auth) {
                    Users.getDisplayName(auth.uid);
                    Users.getProfile(auth.uid);
                    $state.go('home');
                }, function(err) {
                    $ctrl.error = err;
                });
         }

         function register() {
           Auth.$createUser($ctrl.user)
             .then(function (user) {
               $ctrl.login();
             }, function (error) {
               $ctrl.error = error;
             });
         }

    }
})();