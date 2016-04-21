/**
 * Created by crell on 2016/4/4.
 */
app.filter('cartNameFilter', function(){
    return function(item){
        return item + '（快下单吧，快下单吧，快下单吧，快下单吧，快下单吧！！！）';
    }
}).filter('cartListFilter', function(){
    return function(items){
        angular.forEach(items,function(item, i){
            var name = item.business.gameName;
            item.business.gameName = name;
        });
        return items;
    }
});
