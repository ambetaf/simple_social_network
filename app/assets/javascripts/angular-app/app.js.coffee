@app = angular.module('midtermApp', [
# additional dependencies here, such as restangular
  'templates'
  'ui.router'
  'ng-token-auth'
])

# for compatibility with Rails CSRF protection

@app.config([
  '$httpProvider', ($httpProvider)->
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content')
])

@app.config ($stateProvider, $urlRouterProvider, $locationProvider) ->
  $locationProvider.html5Mode true

  $stateProvider
    .state('home', {
      url: '/home'
      templateUrl: 'templates/home.html'
      controller: 'MainCtrl'
    })
    .state('sign_in', {
      url: '/sign_in'
      templateUrl: 'templates/new.html'
      controller: 'UserSessionsCtrl'
    })
    .state('sign_up', {
      url: '/sign_up'
      templateUrl: 'templates/user_registrations.html'
      controller: 'UserRegistrationsCtrl'
    })
    .state('posts', {
      url: '/posts/{id}',
      templateUrl: '/posts.html',
      controller: 'PostsCtrl'
    });



  $urlRouterProvider.otherwise "/"


@app.run [ '$rootScope', '$location', ($rootScope, $location) ->
  $rootScope.$on 'auth:login-success', ->
    $location.path '/'

]
