angular.module('midtermApp')
    .factory('relationships', [
        '$http',
        function($http){
            var object = {
                relationships: []
            };

            object.getRelationships = function() {
                return $http.get('/relationships.json').success(function(data){
                    angular.copy(data, object.relationships);
                    console.log(data)
                });
            };
            object.follow = function(relationship) {
                return $http.post('/relationships.json', relationship).success(function(data){
                    object.relationships.push(data);
                    angular.copy(data, object.relationships);
                });
            };

            object.unfollow = function(id){
                return $http.delete('/relationships/'+id+'.json').success(function(data){
                });
            }




            return object;

        }])