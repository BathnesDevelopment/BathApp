angular.module('MyBath.BathAppDirectives', [])
.directive('browseTo', function ($ionicGesture) {
    return {
        restrict: 'A',
        link: function ($scope, $element, $attrs) {
            var handleTap = function (e) {
                var inAppBrowser = window.open($attrs.browseTo, '_system');
            };

            var tapGesture = $ionicGesture.on('tap', handleTap, $element);

            $scope.$on('$destroy', function () {
                // Clean up - unbind drag gesture handler
                $ionicGesture.off(tapGesture, 'tap', handleTap);
            });
        }
    };
});