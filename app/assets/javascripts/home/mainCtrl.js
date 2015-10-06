angular.module('midtermApp')
    .controller('MainCtrl', [
        '$scope',
        'posts',
        function($scope, posts){




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



        }])