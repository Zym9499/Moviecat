/**
 * Created by Administrator on 2017/6/29.
 */
'use strict';

(function(angular){
	var http = angular.module('moviecat.services.http',[]);
	http.service('HttpService',['$window','$document',function ($window,$document) {
		this.jsonp = function(url,data,callback){
			//判断url是否带有'?'
			var querystring = url.indexOf('?') == -1 ? '?':'&';
			//执行添加传入data请求
			for(var key in data){
				querystring += key +'=' + data[key]+'&';
			}
			//创建随机函数名
			var fnSuffix = Math.random().toString().replace('.','');
			var cbFuncName = 'my_json_cb_'+ fnSuffix;
			//完成整个api后缀
			querystring += 'callback=' + cbFuncName;
			//将得到的数据挂在script上，执行该脚本后直接得到： 运行 随机名回调函数（data），由于挂靠在window上
			//所以不是未定义函数，直接可以执行
			var scriptElement = $document[0].createElement('script');
			scriptElement.src = url + querystring;
			//将随机名的回调函数挂在window上，即window.随机回调函数名就调用function（data这里的为豆瓣数据）函数
			$window[cbFuncName] = function(data){
				callback(data);
				$document[0].body.removeChild(scriptElement);
			};
			$document[0].body.appendChild(scriptElement);
		};
	}]);
})(angular)
