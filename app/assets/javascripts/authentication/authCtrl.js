angular.module('midtermApp')
    .controller('AuthCtrl', [
        '$scope',
        '$state',
        'Auth',
        function($scope, $state, Auth){

            $scope.error;

            $scope.login = function() {
                Auth.login($scope.user).then(function(){
                    $state.go('home');
                }, function(){
                    $scope.error = "Error logging in!!";
                })
            };

            $scope.register = function() {
                Auth.register($scope.user).then(function(){
                    $state.go('home');
                });
            };

        }]);