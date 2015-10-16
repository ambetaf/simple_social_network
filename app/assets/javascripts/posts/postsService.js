angular.module('midtermApp')
    .factory('posts', [
        '$http',
        function($http){
        var object = {
            posts: []
        };

            object.getAll = function() {
                return $http.get('/posts.json').success(function(data){
                    angular.copy(data, object.posts);
                    console.log(data)
                });
            };


            object.create = function(post) {
                return $http.post('/posts.json', post).success(function(data){
                    object.posts.push(data);
                });
            };

            object.like = function(post) {
                return $http.put('/posts/' + post.id + '/like.json')
                    .success(function(data){
                        post.likes += 1;
                    });
            };

            object.unlike = function(post) {
                return $http.put('/posts/' + post.id + '/dislike.json')
                    .success(function(data){
                        post.likes -= 1;
                    });
            };

            object.get = function(id) {
                return $http.get('/posts/' + id + '.json').then(function(resolve){
                    return resolve.data;
                });
            };

            object.addComment = function(id, comment) {
                return $http.post('/posts/' + id + '/comments.json', comment);
            };

            object.likeComment = function(post, comment) {
                return $http.put('/posts/' + post.id + '/comments/'+ comment.id + '/like.json')
                    .success(function(data){
                        comment.likes += 1;
                    });
            };

            object.unlikeComment = function(post, comment) {
                return $http.put('/posts/' + post.id + '/comments/'+ comment.id + '/dislike.json')
                    .success(function(data){
                        comment.likes -= 1;
                    });
            };



            return object;

    }])