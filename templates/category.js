/**
 * Created by Administrator on 2016/2/29.
 */
var app = angular.module("app.category",["ngRoute"]);
app.config(function($routeProvider){
    $routeProvider.when("/category",{
        templateUrl:"templates/category.html",
        controller:"categoryController"
    });
});

app.controller("categoryController",function($scope,modalService){
    $scope.data={
        categorys : $scope.$parent.cateData.cates
    }
    console.log($scope.$parent.cateData.cates);
});
