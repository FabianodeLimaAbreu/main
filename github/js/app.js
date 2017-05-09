window.jQuery = window.$ = function(el) {
    /*Hack de seletor jquery para angular*/
    if (typeof el === "string" && el.charAt(0) !== '<') {
            el = document.querySelectorAll(el);
    }
    return angular.element(el);
};

/*
*
*
*R
*	Start the app from this line below...
*
*f
*
*/

var app = angular.module('app', ["ngRoute", 'mgcrea.jquery',"ngCookies","ngSanitize"]);
var baseUrl="http://189.126.197.169/node/server/index.js?";

app.config(function($routeProvider) {
	$routeProvider.when('/search/:type/:search', {
      templateUrl: "views/app.html",
      controller: "PageCtrl",
      resolve:{
        message: function($route){
          ga('send', 'pageview',  'result.html#/search/'+$route.current.params.type+"/"+$route.current.params.search);
          return !1;
        }
      }
  })
	.when('/:type/:search/detail/:code', {
    templateUrl: "views/detail.html",
    controller: "DetailCtrl",
    resolve:{
      message: function($route){
        ga('send', 'pageview', 'result.html#/'+$route.current.params.type+"/"+$route.current.params.search+"/detail/"+$route.current.params.code);
        return !1;
      }
    }
  }).otherwise({  
		redirectTo: '/search/cama/cabeceiras'
	});
});


app.controller('AppCtrl', function ($scope) {
  alert('ok');
});