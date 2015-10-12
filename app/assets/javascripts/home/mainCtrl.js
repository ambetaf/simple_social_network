angular.module('midtermApp')
    .controller('MainCtrl', [
        '$scope',
        'posts',
        'Auth',
        'users',
        'relationships',
        function($scope, posts, Auth, users,relationships){

            $scope.signedIn = Auth.isAuthenticated;

            $scope.addPost = function(){
                if(!$scope.title || $scope.title === '') { return; }
                posts.create({
                    title: $scope.title,
                });
                $scope.title = '';
            };

            $scope.incrementLikes = function(post) {
                posts.like(post);
            };

            $scope.follow = function(user){
                relationships.follow(user);
            }



            $scope.posts = posts.posts;
            $scope.users = users.users;



        }])