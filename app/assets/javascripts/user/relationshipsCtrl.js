angular.module('midtermApp')
    .controller('RelationshipCtrl', [
        '$scope',
        'relationships',
        'Auth',
        function($scope, relationships, Auth){

            $scope.signedIn = Auth.isAuthenticated;

            Auth.currentUser().then(function (user){
                $scope.user = user.id;
            });

            $scope.relationships = relationships.relationships;

        }]);
