angular.module('midtermApp')
    .controller('MainCtrl', [
        '$scope',
        'posts',
        'Auth',
        'users',
        function($scope, posts, Auth, users){

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


            $scope.posts = posts.posts;
            $scope.users = users.users;



        }])