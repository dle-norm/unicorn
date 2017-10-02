app.controller('unicornCtrl', function($scope, unicornFactory) {
    $scope.uni = unicornFactory;
    $scope.uni.getUnicorn();
});