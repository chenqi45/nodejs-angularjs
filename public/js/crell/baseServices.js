/**
 * Created by crell on 2016/1/17.
 */
app.factory("BaseService",['$http',function($http){
    return{
        post : function(url,params){
            var paramsBody = {};
            paramsBody.token = $.cookie('token');
            paramsBody.random = Math.random();
            paramsBody.timestamp = new Date();
            paramsBody.body = params;
            return $http.post(url,paramsBody);
        },
        delete : function(url,params){
            var paramsBody = {};
            paramsBody.token = $.cookie('token');
            paramsBody.random = Math.random();
            paramsBody.timestamp = new Date();
            paramsBody.body = params;
            return $http.post(url,paramsBody);
        },
        put : function(url,params){
            var paramsBody = {};
            paramsBody.token = $.cookie('token');
            paramsBody.random = Math.random();
            paramsBody.timestamp = new Date();
            paramsBody.body = params;
            return $http.put(url,paramsBody);
        },
        get : function(url,params,page){
            var paramsBody = {};
            paramsBody.token = $.cookie('token');
            paramsBody.random = Math.random();
            paramsBody.timestamp = new Date();
            paramsBody.body = params;
            paramsBody.page = page;
            return $http.post(url+'/list',paramsBody);
        }
    }
}]);
