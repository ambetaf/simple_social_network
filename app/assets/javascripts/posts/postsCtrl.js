angular.module('midtermApp')
    .controller('PostsCtrl', [
        '$scope',
        'posts',
        'post',
        'Auth',
        'notifications',
        function($scope, posts, post, Auth, notifications){

            $scope.signedIn = Auth.isAuthenticated;

            $scope.post = post;

            $scope.addComment = function(){
                if($scope.body === '') { return; }
                notifications.createNotification({
                    owner: $scope.post.user_id,
                    content: "commented on your post",
                    link: "#/posts/" + post.id
                });
                posts.addComment(post.id, {
                    body: $scope.body,
                    author: 'user',
                }).success(function(comment) {
                    $scope.post.comments.push(comment);
                });
                $scope.body = '';
            };

            $scope.incrementLikes = function(comment){
                notifications.createNotification({
                    owner: $scope.post.user_id,
                    content: "liked your comment",
                    link: "#/posts/" + post.id
                });
                posts.likeComment(post, comment);
            };

            $scope.decrementLikes = function(comment){
                posts.unlikeComment(post, comment);
            };



        }]);
