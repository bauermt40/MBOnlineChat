(function () {
  'use strict';

  angular
    .module('angularfireSlackApp')
    .factory('Messages', Messages);

  Messages.$inject = ['$firebaseArray', 'FirebaseUrl'];

  function Messages($firebaseArray, FirebaseUrl) {
    var channelMessagesRef = new Firebase(FirebaseUrl + 'channelMessages');

    return {
      forChannel: function (channelId) {
        return $firebaseArray(channelMessagesRef.child(channelId));
      }
    };
  }
})();
