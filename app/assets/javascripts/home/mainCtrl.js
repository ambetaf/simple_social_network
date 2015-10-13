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

            $scope.follow = function(user){
                notifications.createNotification({
                    owner: user.id,
                    content: "followed you",
                    link: ""
                });
                relationships.follow({
                    followed_id: user.id

                });
            }

            $scope.unfollow = function(id){
                relationships.unfollow(id)
            }
            $scope.userAuth = Auth;



            $scope.notifications = notifications.notifications;
            $scope.posts = posts.posts;
            $scope.users = users.users;



        }])