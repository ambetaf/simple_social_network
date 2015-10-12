angular.module('midtermApp')
    .factory('users', [
        '$http',
        function($http){
        var object = {
            users: []
        };

            object.getAllUsers = function() {
                return $http.get('/users.json').success(function(data){
                    angular.copy(data, object.users);
                    console.log(data)
                });
            };

            object.getUser = function(id) {
                    return $http.get('/users/' + id + '.json').then(function(resolve){
                        console.log(resolve.data)
                    return resolve.data;
                });
            };


            return object;

        }])