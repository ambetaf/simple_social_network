angular.module('midtermApp')
    .controller('MainCtrl', [
        '$scope',
        'posts',
        'Auth',
        'users',
        'relationships',
        'notifications',
        function($scope, posts, Auth, users,relationships,notifications){

            $scope.signedIn = Auth.isAuthenticated;

            Auth.currentUser().then(function (user){
                $scope.user = user;
            });

            $scope.addPost = function(){
                if(!$scope.title || $scope.title === '') { return; }
                posts.create({
                    title: $scope.title
                });
                $scope.title = '';
            };

            $scope.incrementLikes = function(post) {
                notifications.createNotification({
                    owner: post.user_id,
                    content: "liked your post",
                    link: "#/posts/" + post.id
                });
                posts.like(post);
            };

            $scope.decrementLikes = function(post) {
                posts.unlike(post);
            };

            $scope.follow = function(user){
                relationships.follow({
                    followed_id: user.id
                });
                    notifications.createNotification({
                        owner: user.id,
                        content: "followed you",
                        link: ""
                    });

            };

            $scope.unfollow = function(user_id){
                relationships.unfollow(user_id)
            }


            $scope.relationships = relationships.relationships;
            $scope.notifications = notifications.notifications;
            $scope.posts = posts.posts;
            $scope.users = users.users;



            $scope.isFollowed = function(id){
                var hasMatch =false;
                for (var index = 0; index < relationships.relationships.length; ++index) {
                    var object = relationships.relationships[index];
                    if(object.followed_id == id){
                        hasMatch = true;
                        break;
                    }
                }
                return hasMatch;
            };

            var lastUpdate = Date.now();
            var myInterval = setInterval(tick, 0);

            function tick() {
                var now = Date.now();
                var dt = now - lastUpdate;
                lastUpdate = now;
            }

            $scope.isHidden = $scope.isHidden ? false : true;
        }])