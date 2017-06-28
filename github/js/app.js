/*
*
*
*
*	Start the app from this line below...
*
*
*
*/

var app = angular.module('app', ["ngRoute", 'mgcrea.jquery',"ngCookies"]);
var baseUrl="http://189.126.197.169/node/server/index.js?";

app.config(function($routeProvider) {
	$routeProvider.when('/', {
      templateUrl: "views/initial.html",
      controller: "InitialCtrl",
      resolve:{
        message: function($route){
          //ga('send', 'pageview',  'result.html#/search/'+$route.current.params.type+"/"+$route.current.params.search);
          return !1;
        }
      }
  })
	.when('/eventos/criciuma2017', {
    templateUrl: "views/eventos/criciuma2017.html",
    controller: "Criciuma2017",
    resolve:{
      message: function($route){
        // ga('send', 'pageview', 'result.html#/'+$route.current.params.type+"/"+$route.current.params.search+"/detail/"+$route.current.params.code);
        return !1;
      }
    }
  })
  .when('/eventos/fashionday2017', {
    templateUrl: "views/eventos/fashionday2017.html",
    controller: "Fashionday2017",
    resolve:{
      message: function($route){
        // ga('send', 'pageview', 'result.html#/'+$route.current.params.type+"/"+$route.current.params.search+"/detail/"+$route.current.params.code);
        return !1;
      }
    }
  }).otherwise({  
		redirectTo: '/'
	});
});


angular
    .module('app')
    .filter('startFrom', function() {
        return function(input, start) {
            start = +start;
            return input.slice(start);
        }
    });

angular
    .module('app')
    .factory('Excel', function($window) {
        var uri = 'data:application/vnd.ms-excel;base64,',
            template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
            base64 = function(s) {
                return $window.btoa(unescape(encodeURIComponent(s))); },
            format = function(s, c) {
                return s.replace(/{(\w+)}/g, function(m, p) {
                    return c[p]; }) };
        return {
            tableToExcel: function(tableId, worksheetName) {
                //console.log(tableId);
                var table = document.getElementById(tableId),
                    ctx = { worksheet: worksheetName, table: table.innerHTML },
                    href = uri + base64(format(template, ctx));
                return href;
            }
        };
    });

angular
    .module('app')
    .factory('dataService', dataService);

dataService.$inject = ['$http'];

function dataService($http) {
    var data,
        materials,
        service = {
            getUsers: getUsers,
            getConfirmedUsers:getConfirmedUsers
        };

    return service;

    function getUsers(url) {

        return $http.get(url)
            .then(getUsersComplete)
            .catch(getUsersFailed);
    };

    function getUsersComplete(response) {
        return response.data;
    }

    function getUsersFailed(error) {
        console.error('XHR Failed for Users.' + error.data);
    }

    function getConfirmedUsers(url){
        var path = url;

        return $http.get(path + 'list')
            .then(getConfirmedUsersCompleted)
            .catch(ggetConfirmedUsersCompletedFailed);
    }
    function getConfirmedUsersCompleted(response) {
        return response.data;
    }

    function ggetConfirmedUsersCompletedFailed(error) {
        console.error('XHR Failed for Users.' + error.data);
    }
}

app.controller("AppCtrl",function($scope,Excel,$timeout,$location){
  //console.log($routeParams.)
  $scope.classpage=$location.path().replaceAll("/","_");
  $scope.exportToExcel = exportToExcel;
  $scope.convertDate=convertDate;
  function exportToExcel(tableId) { // ex: '#my-table'
      console.log($scope.search);
      var name = $scope.search || 'Default';
      var exportHref = Excel.tableToExcel(tableId, name);
      $timeout(function() { location.href = exportHref; }, 100); // trigger download
  }

  function convertDate(date){
      if(!date){
          return "-";
      }
      var d=new Date(date);
      var convertdate=(d.getDate() < 10 ? ("0"+d.getDate()) : d.getDate())+"/"+((d.getMonth()+1) < 10 ? ("0"+(d.getMonth()+1)) : (d.getMonth()+1))+"/"+d.getFullYear()+" "+d.getHours()+":"+(d.getMinutes() < 10 ? ("0"+d.getMinutes()) : d.getMinutes());
      return convertdate;
  }
})

app.controller('InitialCtrl', function ($scope) {
  alert('ok');
});