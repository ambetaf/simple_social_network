angular.module('midtermApp')
    .factory('likes', [
        '$http',
        function($http){
            var object = {
                likes: []
            };

            object.getAllLikes = function() {
                return $http.get('/users/posts/liked.json').success(function(data){
                    angular.copy(data, object.likes);
                    console.log(data)
                });
            };

            return object;

        }])