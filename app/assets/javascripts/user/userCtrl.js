angular.module('midtermApp')
    .controller('UserCtrl', [
        '$scope',
        'user',
        'posts',
        function($scope  ,user, posts){
            $scope.user = user;

            $scope.incrementLikes = function(post) {
                posts.like(post);
            };

            $scope.decrementLikes = function(post) {
                posts.unlike(post);
            };


            $scope.posts = posts.posts;

        }
    ]);


