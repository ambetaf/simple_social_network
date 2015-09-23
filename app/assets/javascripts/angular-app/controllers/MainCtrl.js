angular.module('midtermApp').factory('posts', [
        '$http',
        function($http) {
            var o = {posts:[]};

            o.create = function(post) {
                return $http.post('/posts.json', post).success(function(data){
                    o.posts.push(data);
                });
            };

            o.getAll = function () {
                return $http.get('/posts.json').success(function (data) {
                    angular.copy(data, o.posts);
                });
            };

            o.upvote = function(post) {
                return $http.put('/posts/' + post.id + '/upvote.json')
                    .success(function(data){
                        post.upvotes += 1;
                    });
            };

            return o;
        }])

    .controller('MainCtrl', [
        '$scope',
        'posts',
        function($scope, posts){

            $scope.posts = posts.posts;

            $scope.addPost = function(){
                if(!$scope.title || $scope.title === '') { return; }
                posts.create({
                    title: $scope.title
                });
                $scope.title = '';
            };

            $scope.incrementUpvotes = function(post) {
                posts.upvote(post);
            };

}]);
