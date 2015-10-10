angular.module('midtermApp')
    .controller('UserCtrl', [
        '$scope',
        'user',
        function($scope  ,user){
            $scope.user = user;


        }
    ]);


