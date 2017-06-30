(function(angular){
	'use strict';

	var module = angular.module('moviecat.movielist', ['ngRoute','moviecat.services.http'])

		module.config(['$routeProvider', function($routeProvider) {
			$routeProvider.when('/:category/:page', {
				templateUrl: 'movie_list/view.html',
				controller: 'MovieListController'
			});
		}]);

		module.controller('MovieListController',
			['$scope','HttpService','$routeParams','$route','AppConfig',
				function($scope,HttpService,$routeParams,$route,AppConfig) {
				var count = AppConfig.pageSize;
				var page = parseInt($routeParams.page); //获取路由当前页
				var start=(page -1 )*10;
				$scope.subjects= [] ;
				$scope.message= '';
				$scope.Count = 0 ;
				$scope.loading = true;
				$scope.totalPages = 0;
				$scope.currentPage = page;
				$scope.title = 'Loading';
				HttpService.jsonp(AppConfig.listApiAddress+$routeParams.category,
					{start:start,count:10,q:$routeParams.q },
					function(data){
					$scope.subjects= data.subjects ;
					$scope.title = data.title;
					$scope.Count = data.total ;
					$scope.loading = false;
					$scope.totalPages = Math.ceil($scope.Count/10);
					$scope.$apply();

					//apply的作用就是让指定的表达式重新同步
				});
				$scope.go = function(page){
					if(page>=1&&page<=$scope.Count){
					$route.updateParams({page:page});
					};
				};

		}
		]);


}
)(angular)


// var doubanApiAddress='http://api.douban.com/v2/movie/in_theaters';
// $http.jsonp(doubanApiAddress+'?callback=JSON_CALLBACK').then(function(res){
// 	if(res.status == 200){
// 	$scope.subjects= res.data.subjects;}
// 	else {
// 		$scope.message='没有获取到数据';
// 	}
// },function(err){
// 	console.log(err);
// 	$scope.message='没有获取到数据';
// });
