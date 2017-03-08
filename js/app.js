/**
 * Created by Administrator on 2016/2/22.
 */
var app =angular.module("myApp",[
    "ngRoute",
    "stuManApp",
    "app.teaInfoMan",
    "app.cms",
    "app.category"
]);

app.controller("mainController",function($scope,$http){
    //学生相关信息
    $scope.stuData = {};
    $scope.teaData = {};
    $scope.cmsData = {};
    $scope.cateData = {};
    $http.get("json/students.json").success(function(data){
        $scope.stuData.students=data;
        console.log($scope.stuData.students.offsetHeight);
        console.log(data);
    });
    //教师相关信息
    $http.get("json/teachers.json").success(function(data){
        $scope.teaData.teachers=data;
    });
    //console.log($scope.teaData.teachers=data);
    //文章信息
    $http.get("json/cms.json").success(function(data){
        $scope.cmsData.cms=data;
        console.log(data);
    });
    //栏目信息
    $http.get("json/categorys.json").success(function(data){
        $scope.cateData.cates=data;
    });
    //获取服务器中配置信息
    $http.get("json/config.json").success(function(data){
        $scope.config=data;
        //console.log(data);
        $scope.data.tabs = [data[0]];
    });
    //初始化数据对象
    $scope.data={};
    //选项卡数组
    $scope.data.tabs=[];
    //当前选项卡对象
    $scope.data.currentTab =null;

    //更改当前tabs、
    $scope.data.changeTabs =function(id){
        var sons=$scope.config.filter(function(items){
            return items.parent == id;
        });
        //当存在子功能的时候，将子功能数组赋给tabs
        if(sons.length>0){
            $scope.data.tabs=sons;
        }else{//当不存在子功能的时候，将自身赋给tabs
            $scope.data.tabs=$scope.config.filter(function(items){
                return items.cId ==id;
            });
        }
        //修改当前选项卡
        $scope.data.currentTab= $scope.data.tabs[0];
        //默认请求第一个选项卡的代表路径
        window.open($scope.data.currentTab.url,"_self");
    }
    //更改当前tab
    $scope.data.changeCurrentTab =function(event){
        console.log(event);
        angular.element(event.currentTarget)
            .addClass("active")
            .siblings()
            .removeClass("active");
    }
    app.factory("modalService",function(){
        return{
            open:function(id){
                angular.element(document.getElementById(id)).modal("show");
            },
            close:function(id){
                angular.element(document.getElementById(id)).modal("hide");
            }
        }
    });
});
