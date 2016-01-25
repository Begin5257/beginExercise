/**
 * Created by 83916 on 2015/12/16.
 */
var app = angular.module('myApp', []);
app.controller('getList', function($scope, $http) {
    $scope.names = [];
    $scope.showContent =function(index){
        $scope.time=$scope.names[index].time;
        $scope.title=$scope.names[index].title;
        $scope.content =$scope.names[index].content;
        console.log($scope.content);
    };
    $http.get("http://192.168.16.11:3001/todo")
        .success(function(response) {$scope.names = response;

        });
    $scope.delete = function () {
        $scope.names = [];
        $http.delete('http://192.168.16.11:3001/1')
//            $http.get("http://192.168.16.11:3001/todo", $scope.full).success(function() {
//                $scope.names = [];
//
//            });
    };
});
app.controller('postList', function($scope,$http) {
    $scope.push = function(){
        $scope.full = {
            time: $scope.time,
            title: $scope.title,
            content: $scope.content
        };
        $http.post("http://192.168.16.11:3001/todo", $scope.full).success(function() {
        });
    };
});