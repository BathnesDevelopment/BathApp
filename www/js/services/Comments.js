angular.module('MyBath.CommentsService', [])
.factory('Comments', function () {
    return {
        getComments: function () {
            var Comments = window.localStorage.Comments;
            if (Comments) {
                return angular.fromJson(Comments);
            }
            return [];
        },
        saveComments: function (Comments) {
            window.localStorage.Comments = angular.toJson(Comments);
        },
        getDefaultComment: function () {
            return {type: '', reference:'', comment: '', address: '', userPhone: '', body: '', userEmail: ''};
        },
        addComment: function (Comment) {
            var Comments = window.localStorage.Comments;
            var CommentsArray;
            if (Comments) {
                CommentsArray = angular.fromJson(Comments);
                CommentsArray.push(Comment);
            }
            else {
                CommentsArray = [Comment];
            }
            window.localStorage.Comments = angular.toJson(CommentsArray);
        },
        submitComments: function () {
            var Comments = window.localStorage.Comments;
            var CommentsArray = angular.fromJson(Comments);
            // Comments is an array (of whatever length).
            // iterate through and submit to the web service.  as successes are recorded, remove from array.
            var index;
            for (index = 0; index < Comments.length; ++index) {
                $http({
                    method: 'POST',
                    url: 'request-url',
                    data: "message=" + message,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                });
            }
        }
    };
});