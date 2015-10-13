angular.module('midtermApp')
    .factory('notifications', [
        '$http',
        function($http){
            var object = {
                notifications: []
            };

            object.getNotifications = function() {
                return $http.get('/notifications.json').success(function(data){
                    angular.copy(data, object.notifications);
                    console.log(data)
                });
            };


            object.createNotification = function(notifications) {
                return $http.post('/notifications.json', notifications).success(function(data){
                    object.notifications.push(data);
                    console.log(data);
                });
            };

            return object;

        }])