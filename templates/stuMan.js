/**
 * Created by Administrator on 2016/2/23.
 */
var app=angular.module("stuManApp",["ngRoute"]);

app.config(function($routeProvider){
    $routeProvider.when("/stuMan",{
        templateUrl:"templates/stuMan.html",
        controller:"stuManController"
    });
});
app.controller("stuManController",function($scope,$http,modalService){
    console.log("stuMan------------");
    var id=1000;
    $scope.msg = "学生信息管理页面";
    //表单中双向绑定的对象
    //初始化数组
    $scope.newUser={};
    //--------学生相关功能对象--------
    console.log($scope.$parent.stuData.students);
    $scope.data ={
        students : $scope.$parent.stuData.students,//存储学生对象的数组
        modalTitle:"",
        option:"",//记录当前操作
        search :{},//用于接收用户的请求
        criteria:{},//模块对象
        //stu:{},//用于存放新增的学生信息
        //显示添加学生信息的窗口
        showAddModal : function () {
            this.option ="add";
            $scope.newUser=null;
            this.modalTitle ="添加学生信息";
            modalService.open();
        },
        addStu : function(){
            //new一个student对象
            var stu=new Student(
                $scope.newUser.name,
                $scope.newUser.gender,
                $scope.newUser.age,
                $scope.newUser.telephone
            );
            $scope.data.students.push(stu);
            //清空输入框的内容
            $scope.newUser = null;
            //2.关闭模态框
            modalService.close();
        },
        delStu : function(){
            var stuChecked =this.students.some(function(item){
                return item.checked ==true;
            });
            if(stuChecked){
                if(window.confirm("确定删除么？")){
                    this.students = this.students.filter(function(item){
                        return item.checked !=true;
                    });
                }
            }else{
                alert("请选择要删除的学生！");
            }
            console.log(stuChecked);
        },
        showUpdModal : function(){
            this.option="upd";
            var udpChecked =this.students.filter(function(items){
                return items.checked ==true;
            })[0];
            if(udpChecked){
                $scope.newUser=udpChecked;//双向绑定数据
                this.modalTitle="修改"+udpChecked.name+"学生信息";
                modalService.open();
            }
        },
        updStu : function(){
            modalService.close();
        },
        becomeLeader : function () {
            this.students.forEach(function(items){
                if(items.checked==true){
                    items.rank="组长";
                }
            });
        },
        becomeMember: function(id){
            this.students.forEach(function(items){
                if(items.id==id){
                    items.rank="组员";
                }
            });
        },
        //搜索学生信息
        searchStu : function(){
          this.criteria={};
            if(this.search.key && this.search.val){
                this.criteria[this.search.key]=this.search.val;
            }else{
                this.criteria={};
            }
        }
    }
    console.log($scope.$parent.stuData.students);
    //学生对象的构造函数
    //this.id name gender age telephone rank 相当于java中类的属性
    function Student(sname,sgender,sage,stelephone){
        this.id=++id;
        this.name=sname;
        this.gender=sgender;
        this.age=sage;
        this.telephone=stelephone;
        this.rank="组员";
    }
});
app.factory("modalService",function(){
    var modal = document.getElementById("stuModal");
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