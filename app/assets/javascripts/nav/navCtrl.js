angular.module('midtermApp')
    .controller('NavCtrl', [
        '$scope',
        'Auth',
        '$state',
        function($scope, Auth, $state){

            $scope.signedIn = Auth.isAuthenticated;

            $scope.logout = function(){
                Auth.logout().then(function(){
                $state.go('login');
            })};


            $scope.login = function() {
                Auth.login($scope.user).then(function(){
                    $state.go('home');
                }, function(){
                    $scope.error = "Error logging in user!!";
                })
            };




            Auth.currentUser().then(function (user){
                $scope.user = user;
            });

            $scope.$on('devise:new-registration', function (e, user){
                $scope.user = user;
            });

            $scope.$on('devise:login', function (e, user){
                $scope.user = user;
            });

            $scope.$on('devise:logout', function (e, user){
                $scope.user = {};
            });

        }]);