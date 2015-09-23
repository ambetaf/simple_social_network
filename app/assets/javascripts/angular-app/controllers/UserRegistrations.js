'use strict';


angular.module('midtermApp')
    .controller('UserRegistrationsCtrl', ['$scope', '$location', '$auth', function ($scope, $location, $auth) {
        $scope.$on('auth:registration-email-error', function(ev, reason) {
            $scope.error = reason.errors[0];
        });
        $scope.handleRegBtnClick = function() {
            $auth.submitRegistration($scope.registrationForm)
                .then(function() {
                    $auth.submitLogin({
                        name: $scope.registrationForm.name,
                        email: $scope.registrationForm.email,
                        password: $scope.registrationForm.password
                    });
                });
        };
    }]);