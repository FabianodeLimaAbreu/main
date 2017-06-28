app.controller('Criciuma2017', function ($scope,dataService, Excel) {
  //alert('Reports');
  $scope.clients = [];
  $scope.users = [];

  function loadUsers() {
      return dataService.getUsers("/evento-criciuma-2017/ajax/list.js")
          .then(function(data) {
              $scope.users = data;
              loadConfirmed(data);
              return $scope.users;
          });
  }

  function loadConfirmed(users) {
      return dataService.getConfirmedUsers('http://189.126.197.169/node/servicesctrl/cri_event/')
          .then(function(data) {
              loadClients(users,data);
              return data;
          });
  }

  function loadClients(users,data){
      _.each(users, function(user) {
          user.main=" SIM "
          var res=_.filter(data, function (item) {
              if(item.cod == user.cod){
                  return item;
              }
          });
          if(res.length){
              var seg=[];
              user.date=res[0].date;
              _.each(res[0].segments, function(item) {
                  seg.push(item.segval);
                  
              });
              user.segments=seg.join(" , ");
              user.participants=res[0].participants;
              user.confirmed="SIM";
              if(user.participants.length){
                  var segpart=[];
                  _.each(user.participants, function(part) {
                      part.date=user.date;
                      part.razao=user.RAZAO;
                      part.REPRESENTANTE=user.REPRESENTANTE;
                      _.each(res[0].segments, function(item) {
                          segpart.push(item.segval);
                          
                      });
                      part.segments=segpart.join(" , ");
                      part.confirmed="SIM";
                      part.main=" NAO "
                      $scope.clients.push(part);
                      
                  });
              }
          }
          else{
             user.confirmed="NAO";
          }
          
          $scope.clients.push(user);
          
      });
  }
  loadUsers();
});