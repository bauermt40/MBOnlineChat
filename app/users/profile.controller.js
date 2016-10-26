(function() {
'use strict';

    angular
        .module('angularfireSlackApp')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$state', 'md5', 'auth', 'profile'];
    function ProfileController($state, md5, auth, profile) {
        var $ctrl = this;
        $ctrl.profile = profile;
        $ctrl.updateProfile = updateProfile;

        function updateProfile() {
            profileCtrl.profile.emailHash = md5.createHash(auth.password.email);
            profileCtrl.profile.$save();
        }
    }
})();