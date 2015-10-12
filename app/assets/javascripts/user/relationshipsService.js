angular.module('midtermApp')
    .factory('relationships', [
        '$http',
        function($http){
            var object = {
                relationships: []
            };


            object.follow = function(relationship) {
                return $http.post('/relationships.json', relationship).success(function(data){
                    object.relationships.push(data);
                });
            };



            return object;

        }])