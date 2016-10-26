(function() {
'use strict';

    angular
        .module('angularfireSlackApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['Users'];
    function HomeController(Users) {
        var $ctrl = this;
        

        initialize();

        ////////////////

        function initialize() { 
            $ctrl.displayName = Users.profile.displayName;
        }
    }
})();