angular.module('midtermApp', ['ui.router', 'templates', 'Devise', 'restangular'])

    .config([
        '$stateProvider',
        '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: 'home/_indexUser.html',
                    controller: 'MainCtrl'
                })
                .state('posts', {
                    url: '/posts/{id}',
                    templateUrl: 'posts/_postsComment.html',
                    controller: 'PostsCtrl',
                    resolve: {
                        post: ['$stateParams', 'posts', function($stateParams, posts) {
                            return posts.get($stateParams.id);
                        }]
                    }
                })
                .state('login', {
                    url: '/login',
                    templateUrl: 'auth/_login.html',
                    controller: 'AuthCtrl',
                    onEnter: ['$state', 'Auth', function($state, Auth) {
                        Auth.currentUser().then(function (){
                            $state.go('home');
                        })
                    }]
                })
                .state('register', {
                    url: '/register',
                    templateUrl: 'auth/_register.html',
                    controller: 'AuthCtrl',
                    onEnter: ['$state', 'Auth', function($state, Auth) {
                        Auth.currentUser().then(function (){
                            $state.go('home');
                        })
                    }]
                })
                .state('profile', {
                    url: '/users/{id}',
                    templateUrl: 'users/_userProfile.html',
                    controller: 'UserCtrl',
                    resolve: {
                        user: ['$stateParams', 'users', function($stateParams, users) {
                            return users.getUser($stateParams.id);
                        }]
                    }
                })
                .state('users', {
                    url: '/users',
                    templateUrl: 'users/_usersListFollowables.html',
                    controller: 'MainCtrl'
                    //,
                    //resolve: {
                    //    postPromise: ['users','relationships','$q', function(users, relationships,$q){
                    //        return $q.all({
                    //            users:users.getAllUsers(),
                    //            relationships:relationships.getRelationships()
                    //        })
                    //    }]
                    //}
                })
                .state('notifications', {
                    url: '/notifications',
                    templateUrl: 'users/_userNotifs.html',
                    controller: 'MainCtrl',
                    resolve: {
                        postPromise: ['notifications', function(notifications){
                            return notifications.getNotifications();
                        }]
                    }
                })

           $urlRouterProvider.otherwise('login');
        }
    ])
    .run(function ($rootScope, $state) {
        $rootScope.$on('$stateChangeStart', function (event, toState) {
            var user = JSON.parse(localStorage.getItem('user'));
            $rootScope.currentUser = user;
            if (user != null)
            {
                if (toState.name === "login" || toState.name === "register") {
                    event.preventDefault();
                    $state.go('home');
                }
            }
        })
    });

