app.directive("fbMenu",function(){
  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {
      elem.bind('click',function(a){
        if(document.getElementById("wrap").className === "menu-ativo"){
          document.getElementById("wrap").className="";
        }
        else{
          document.getElementById("wrap").className="menu-ativo";
        }
      });
    }
  }
});