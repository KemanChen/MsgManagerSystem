/**
 * Created by Administrator on 2016/2/26.
 */
var app = angular.module("app.cms",["ngRoute"]);

app.config(function($routeProvider){
    $routeProvider.when("/publisur",{
        templateUrl:"templates/publisur.html",
        controller:"cmsCtrl"
    });
    $routeProvider.when("/essay",{
        templateUrl:"templates/essay.html",
        controller:"cmsCtrl"
    });
});
app.controller("cmsCtrl", function($scope){
    $scope.data={
        categorys : $scope.$parent.cateData.cates,
        cms:$scope.$parent.cmsData.cms,
        newCms:{},
        addCms:function(){
            console.log("---发布---");
            var cms1 = new Cms(
                this.newCms.title,
                this.newCms.category,
                this.newCms.content
            );
            $scope.data.cms.push(cms1);

            $scope.data.newCms={};
            console.log($scope.data.cms);
            alert("发布成功！");
        }
    }
    var id =1003;
    function Cms(title,category,content){
        this.id =++id;
        this.title=title;
        this.category=category;
        this.content=content;
        this.time=new Date().getTime();
        this.clickTimes=0;
        this.author="KmChen";
    }
});
app.filter("idToName",function(){
    return function(id,arr){
        var category =arr.filter(function(item){
            return item.id==id;
        })[0];
        return category.name;
    }
});