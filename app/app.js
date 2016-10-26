'use strict';

/**
 * @ngdoc overview
 * @name angularfireSlackApp
 * @description
 * # angularfireSlackApp
 *
 * Main module of the application.
 */
angular
  .module('angularfireSlackApp', [
    'firebase',
    'angular-md5',
    'ui.router'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home/home.html',
        controller: 'HomeController as $ctrl'
      })
      .state('login', {
        url: '/login',
        controller: 'AuthController as $ctrl',
        templateUrl: 'auth/login.html'
        // resolve: {
        //   requireNoAuth: function($state, Auth) {
        //     return Auth.$requireAuth()
        //       .then(function(auth) {
        //         $state.go('home');
        //       }, function(err) {
        //         return;
        //       });
        //   }
        // }
      })
      .state('register', {
        url: '/register',
        controller: 'AuthController as $ctrl',
        templateUrl: 'auth/register.html'
      })
      .state('profile', {
        url: '/profile',
        controller: 'ProfileController as $ctrl',
        templateUrl: 'users/profile.html',
        resolve: {
          auth: function($state, Users, Auth){
            return Auth.$requireAuth().catch(function(){
              $state.go('home');
            });
          },
          profile: function(Users, Auth){
            return Auth.$requireAuth().then(function(auth){
              return Users.getProfile(auth.uid).$loaded();
            });
          }
        }
      });

    $urlRouterProvider.otherwise('/');
  })
  .constant('FirebaseUrl', 'https://intense-torch-3709.firebaseio.com/');
