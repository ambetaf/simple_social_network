angular.module('midtermApp', ['ui.router', 'templates', 'Devise', 'restangular'])

    .config([
        '$stateProvider',
        '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: 'home/_homepage.html',
                    controller: 'MainCtrl',
                    resolve: {
                        postPromise: ['posts', function(posts){
                            return posts.getAll();
                        }]
                    }
                })
                .state('posts', {
                    url: '/posts/{id}',
                    templateUrl: 'posts/_commentPage.html',
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
                    templateUrl: 'users/_usersAllList.html',
                    controller: 'MainCtrl',
                    resolve: {
                        postPromise: ['users', function(users){
                            return users.getAllUsers();
                        }]
                    }
                })
                .state('notifications', {
                    url: '/notifications',
                    templateUrl: 'users/_userNotifications.html',
                    controller: 'MainCtrl',
                    resolve: {
                        postPromise: ['notifications', function(notifications){
                            return notifications.getNotifications();
                        }]
                    }
                })

           //$urlRouterProvider.otherwise('home');
        }
    ])

