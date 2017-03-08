/**
 * Created by Administrator on 2016/2/25.
 */
var app=angular.module("app.teaInfoMan",["ngRoute"]);

app.config(function($routeProvider){
    $routeProvider.when("/teaInfoMan",{
        templateUrl:"templates/teaInfoMan.html",
        controller:"teaInfoCtrl"
    });
});
app.controller("teaInfoCtrl",function($scope,modalService){
    console.log("--teaInfoCtrl--");
    $scope.data={
        teachers : $scope.$parent.teaData.teachers,
        newTea : "",
        option : "",
        modalTitle :"",
        showAddModal : function(){
            console.log("--添加教师信息--");
            this.option="add";
            this.modalTitle="添加教师信息";
            modalService.open("teaModal");
        },
        addTea : function(){
            console.log(this.option);
            var tea=new Teachers(
                this.newTea.name,
                this.newTea.gender,
                this.newTea.rank,
                this.newTea.email,
                this.newTea.record
            );
            this.teachers.push(tea);
            this.newTea={};
            modalService.close();
        }
    }
    console.log($scope.data.teachers);
});
var id =1002;
function Teachers(name,gender,rank,email,record){
    this.id=++id;
    this.name=name;
    this.gender=gender;
    this.rank=rank;
    this.email = email;
    this.record = record;
    this.picture = "images/"+name+".gif";
    this.salary = 3000;
    this.daySalary = 30;
}
app.factory("modalService",function(){
    var modal = document.getElementById("teaModal");
    modal = angular.element(modal);
    return {
        open:function(){
            modal.modal("show");
        },
        close:function(){
            modal.modal("hide");
        }
    }
});