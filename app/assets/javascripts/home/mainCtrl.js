angular.module('midtermApp')
    .controller('MainCtrl', [
        '$scope',
        'posts',
        'Auth',
        'users',
        'relationships',
        'notifications',
        'likes',
        function($scope, posts, Auth, users,relationships,notifications, likes){

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
                getLiked();
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
                        link: "#/users/" + $scope.user.id
                    });
                getUsers();
                getAllRelationships();

            };

            $scope.unfollow = function(user_id){
                relationships.unfollow(user_id);
                getUsers();
                getAllRelationships();
            };


            var getAllRelationships = function(){
                return relationships.getRelationships();
            };
            getAllRelationships();


            var getPosts = function(){
                return posts.getAll();
            };
            getPosts();

            var getUsers = function(){
                return users.getAllUsers();
            }
            getUsers();

            var getNotif = function(){
                return notifications.getNotifications();
            }

            var getLiked = function(){
                return likes.getAllLikes();
            }
            getLiked();


            $scope.posts = posts.posts;
            $scope.users = users.users;
            $scope.relationships = relationships.relationships;
            $scope.notifications = notifications.notifications;
            $scope.likes = likes.likes;

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





            $scope.isLiked = function(user_id){
                var hasMatch = false;
                for(var index = 0; index < likes.likes.length; ++index){
                    var object = likes.likes[index];
                    if(object.voter_id == $scope.user.id && object.votable_id == user_id){
                        hasMatch = true;
                        break;
                    }
                }
                return hasMatch;
            };

            //$timeout(getUsers(), getPosts(), getAllRelationships()
            //, 10);
            window.setInterval(function(){
                getPosts();
                getNotif();
            }, 5000);

        }])