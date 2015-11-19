angular.module('MyBath.PlanningController', [])
.controller('PlanningController', function ($scope, $state) {

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // STARTUP
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Variables: Planning and licensing page
    /////////////////////////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // MODAL DEFINITIONS
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Modal: NewComment
    // Planning comments screen
    /////////////////////////////////////////////////////////////////////////////////////////////
    $ionicModal.fromTemplateUrl('templates/planning-comments-new.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.commentModal = modal;
    });

    $scope.newComment = function () {
        $scope.commentModal.show();
        // Dummy reference for testing
        $scope.currentComment.reference = Math.floor((Math.random() * 100000000));

        // Populate the form with user address, if that info exists
        if ($scope.userData.address) {
            $scope.currentComment.address = $scope.userData.address;
        }
        if ($scope.userData.phone) {
            $scope.currentComment.userPhone = $scope.userData.phone;
        }
        if ($scope.userData.email) {
            $scope.currentComment.userEmail = $scope.userData.email;
        }
    };

    $scope.closeComment = function () {
        $scope.commentModal.hide();
    };

    $scope.submitCommentPage1 = function (comment) {
        if ($scope.currentComment.type) {
            $scope.commentModal.hide();
            $scope.commentComposeModal.show();
            return;
        }
    };

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Modal: Comment Compose
    // planning comments screen: Compose comment
    /////////////////////////////////////////////////////////////////////////////////////////////
    $ionicModal.fromTemplateUrl('templates/planning-comments-compose.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.commentComposeModal = modal;
    });

    $scope.submitComment = function (comment) {
        $scope.commentComposeModal.hide();
        Comments.addComment($scope.currentComment);
        $scope.currentComment = Comments.getDefaultComment();
        $scope.comments = Comments.getComments();
    };
});