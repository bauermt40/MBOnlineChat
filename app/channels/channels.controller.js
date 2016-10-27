(function () {
  'use strict';

  angular
    .module('angularfireSlackApp')
    .controller('ChannelsController', ChannelsController);

  ChannelsController.$inject = ['$state', 'Auth', 'Users', 'profile', 'channels'];

  function ChannelsController($state, Auth, Users, profile, channels) {
    var channelsCtrl = this;

    channelsCtrl.newChannel = {
      name: ''
    };

    channelsCtrl.profile = profile;
    channelsCtrl.channels = channels;

    channelsCtrl.getDisplayName = Users.getDisplayName;
    channelsCtrl.getGravatar = Users.getGravatar;

    channelsCtrl.logout = function () {
      Auth.$unauth();
      $state.go('home');
    };

    channelsCtrl.createChannel = function () {
      channelsCtrl.channels.$add(channelsCtrl.newChannel).then(function (ref) {
        $state.go('channels.messages', {
          channelId: ref.key()
        });
      });
    };
  }
})();

