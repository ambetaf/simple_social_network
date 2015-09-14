@app = angular.module('midtermApp', [
# additional dependencies here, such as restangular
  'templates'
  'ui.router'
])

# for compatibility with Rails CSRF protection

@app.config([
  '$httpProvider', ($httpProvider)->
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content')
])

@app.config ($stateProvider, $urlRouterProvider, $locationProvider) ->
  $stateProvider
    .state('home', {
      url: '/'
      templateUrl: 'templates/home.html'
      controller: 'HomeCtrl'

    })

  $urlRouterProvider.otherwise "/"

@app.run(->
  console.log 'angular app running'
)
