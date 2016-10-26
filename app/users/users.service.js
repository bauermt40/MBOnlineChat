(function() {
'use strict';

    angular
        .module('angularfireSlackApp')
        .factory('Users', Users);

    Users.$inject = ['$firebaseArray', '$firebaseObject', 'FirebaseUrl'];
    function Users($firebaseArray, $firebaseObject, FirebaseUrl) {
        var usersRef = new Firebase(FirebaseUrl+'users');
        var users = $firebaseArray(usersRef);

        var service = {
            allUsers: users,
            getProfile: getProfile,
            getDisplayName: getDisplayName
        };
        
        return service;

        function getProfile(uid) {
            return $firebaseObject(usersRef.child(uid));
        }

        function getDisplayName(uid) {
            return users.$getRecord(uid).displayName;
        }
    }
})();