/**
 * Created by crell on 2016/1/17.
 */
app.factory('BaseDataService',['BaseService',function(BaseService){
    return {
        getByType:function(type){
            return BaseService.get('/ajax/baseData/'+type);
        },
        getAppData:function(){
            return BaseService.get('/ajax/appData');
        }
    }
}])
.factory('LoginService',['$q','$location','BaseService',function($q,$location,BaseService){
    var loginInfo = {hasLogin:false};
    return {
        login:function(condition){
            var deferred = $q.defer();
            BaseService.post('/ajax/login', condition).then(function (obj) {
                if(obj.data.status == Status.SUCCESS) {
                    loginInfo = obj.data.data;
                    loginInfo.hasLogin = true;
                    loginInfo.loginerror = false;
                    $.cookie('userId',loginInfo.userId,{expires: 1});
                    $.cookie('nickName',loginInfo.nickName,{expires: 1});
                    $.cookie('token',loginInfo.token,{expires: 1});
                }else{
                    loginInfo.hasLogin = false;
                    loginInfo.loginerror = true;
                    loginInfo.loginerroinfo = obj.data.msg;
                }
                deferred.resolve(loginInfo);
            });
            return deferred.promise;
        },
        logOff : function(){
            BaseService.post('/ajax/logoff').then(function(obj){
                if(obj.data.status==Status.SUCCESS){
                    $.cookie('token', '', { expires: -1 });
                    $.cookie('userId', '', { expires: -1 });
                    $.cookie('nickName', '', { expires: -1 });
                    location.href = '/my'
                }
            });
        },
        getLoginInfo:function(){
            if($.cookie('token') != null){
                loginInfo.nickName = $.cookie('nickName');
                loginInfo.userId = $.cookie('userId');
                loginInfo.hasLogin = true;
                loginInfo.loginerror = false;
            }else{
                $location.path('login');
            }
            return loginInfo;
        },
        autoLogin : function(){
            //自动登陆验证
            var deferred = $q.defer();
            BaseService.post('/ajax/autoLogin').then(function(obj){
                if(obj.data.status == Status.SUCCESS){
                    loginInfo = obj.data;
                    loginInfo.hasLogin = true;
                } else{
                    loginInfo.hasLogin = false;
                    loginInfo.nickName = '';
                    $.cookie('token','',{expires: -1});
                }
                deferred.resolve(loginInfo);
            });
            return deferred.promise;
        }
    }
}])
.factory("RegisterService",['BaseService',function(BaseService){
    return{
        register : function(condition){
            return BaseService.post('/ajax/user',condition);
        },
        modifyUser : function(condition){
            return BaseService.put('/ajax/user',condition);
        },
        deleteUser : function(condition){
            return BaseService.delete('/ajax/user',condition);
        }
    }
}])
.factory("BusinessService",['BaseService',function(BaseService){
    return{
        getBusinessList : function(condition,page){
            return BaseService.get('/ajax/business',condition,page);
        },
        getBusiness : function(businessId){
            return BaseService.get('/ajax/business/'+businessId);
        }
    }
}])
.factory("UserService",['BaseService',function(BaseService){
    return{
        userValid : function(userName){
            return BaseService.post('/ajax/user/validUserName',{'userName':userName});
        }
    }
}])
.factory("OrderService",['BaseService',function(BaseService){
    return{
        buy : function(businessId){
            return BaseService.post('/ajax/order',{'businessId':businessId});
        }
    }
}])
.factory("CartService",['BaseService',function(BaseService){
    return{
        addCart : function(businessId){
            return BaseService.post('/ajax/cart',{'businessId':businessId});
        },
        myCart : function(condition){
            return BaseService.get('/ajax/cart',condition);
        }
    }
}]);
