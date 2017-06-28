app.controller('Fashionday2017', function ($scope,dataService, Excel) {
  //alert('Reports');
  $scope.clients = [];
  $scope.users = [];

  function loadUsers() {
      return dataService.getUsers("http://189.126.197.169/node/servicesctrl/focusconnect/list")
          .then(function(data) {
              $scope.users = data;
              loadClients(data);
              return $scope.users;
          });
  }


  function loadClients(users) {
      $scope.clients = users;
  };
  loadUsers();
});