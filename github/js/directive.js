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

app.directive("fbAside",function(){
  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {
      elem.bind('click',function(a){
        if(document.getElementById("wrap").className === "aside-ativo"){
          document.getElementById("wrap").className="";
        }
        else{
          document.getElementById("wrap").className="aside-ativo";
        }
      });
    }
  }
});

app.directive('move', function($animate) { //Directive of the info-box to animate it
  return function(scope, element, attrs) {
    var sidebar=$(".info-side");
    scope.$watch(attrs.move, function(toggle) {
      if(scope.showthat){
        //"selecionou algum"
        if (scope.icon.hasClass("sel")) {

          if(element.css('right')=="-20px"){
            if(scope.larg()){
              scope.open=true;
              scope.aclose=false;
            }
            else{
              scope.open=false;
              scope.aclose=true;
            }
            TweenMax.to(element, 1, {
              right: "-520px"
            });       
            scope.icon.toggleClass("sel");
            scope.icon.parent().toggleClass('sel');
          }
          else{
            scope.open=false;
            scope.aclose=true;
            if(scope.larg()){
              TweenMax.to(element, 1, {
                right: "-20px"           
              });
            }
            else{
              TweenMax.to(sidebar, 1, {
                right: "0"           
              });
              sidebar.addClass("opened");
            }
            
          }
        } else {
          scope.showthat=false;
          scope.open=true;
          scope.aclose=false;
          if(element.css('right')=="-520px"){
            if(scope.larg()){
              TweenMax.to(element, 1, {
                right: "-520px"
              })
            }
            else{
              TweenMax.to(sidebar, 1, {
                right: "0"
              });
              sidebar.removeClass("opened");
              /*
              Versão anterior onde a tela de detalhes nao era responsiva
              TweenMax.to(element, 1, {
                right: "-884px"
              })*/
            }
          }
          else{
            if(scope.larg()){
              TweenMax.to(element, 1, {
                right: "-520px"
              });
            }
            else{
              TweenMax.to(sidebar, 1, {
                right: "-385px"
              })
              sidebar.removeClass("opened");
            }            
          }
        }
      }
      else{
        //nenhum selecionado
        if (toggle) {
          if(scope.larg()){
            scope.open=true;
            scope.aclose=false;
            TweenMax.to(element, 1, {
              right: "-520px"
            })
          }
          else{
            scope.open=true;
            scope.aclose=false;
            /*
            Versão anterior onde a tela de detalhes nao era responsiva
            TweenMax.to(element, 1, {
              right: "-884px"
            })*/
          }
          //console.log('open');
        } else {
          if(scope.larg()){
            scope.open=true;
            scope.aclose=false;
            TweenMax.to(element, 1, {
              right: "-520px"
            });
          }
          else{
            scope.open=false;
            scope.aclose=true;
          }
        }
        scope.showthat=false;
      }
    });
  };
});

app.directive('iconBtn', function() {
  return {
    link: function($scope, element) {
      handler = function() {
        element.toggleClass('sel');
        $scope.icon=element; //Pass the button rapport to $scope
        if($scope.icon.hasClass("sel")){
          //Para abrir
          $scope.showthat=true;
          if(element.hasClass("bcolor")){
            $scope.colorActive=true;
          }
          else{
            $scope.rapportActive=true;
          }
        }
        else{
          //Caso ja esteja aberto
          if(element.hasClass("bcolor")){
            $scope.colorActive=false;
          }
          else{
            $scope.rapportActive=false;
          }
        }
        $scope.$apply(function() {
          $scope.change();
        });
      };
      element.on('click', handler);
    }
  };
});

app.directive('whenScrolled', function($cookieStore) {
    return function(scope, elm, attr) {
        var raw = elm[0];
        
        elm.bind('scroll', function(e) {
          scope.$apply(function() {
            var scroll={
              search:''+scope.$parent.option,
              posscroll:e.target.scrollTop,
              total:scope.counter
            };
            $cookieStore.put("posscroll", scroll,{path:"/"});
            if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                scope.loadPage();
            }
          });
          
        });
    };
});

/**
* Diretive is called when a subfilter item of the list is selected
*
* @param {factory} Data.The factory that work with the filter actions and data of the aplication.
* @param {$rootScope} $rootScope.$scope of app
*
*/
app.directive('fbSellist', ["Data", "$rootScope", function (Data,$rootScope) {
  return {
    restrict: 'A', //restrict to attr
    scope:true,
    link: function ($scope, element, attrs) {
      handler = function(e){
        $scope.group.ft=attrs.data;
        if(element.hasClass("sel")){
          //If item has sel class
          element.removeClass("sel");
          $rootScope.selects.filter(function(a,b){
            //Pass into all selects itens to find this item and remove it of the list
            if(a.ft === $scope.group.ft){
              $rootScope.selects.splice(b,1);
              Data.updateFilter($scope.group.ft); //Call factory to update it's list of itens selects else.
              Data.removeCount($scope.group);
              $scope.confirmFilter();
            }
          });
        }
        else{
          element.addClass("sel");
          $rootScope.selects.push({'id':$scope.group.id,'bt':$scope.group.bt,'ft':$scope.group.ft});
          Data.addFilter($scope.group);
          Data.addCount($scope.group);
          $scope.confirmFilter();
          element.removeClass("sel");
        }
        $scope.$apply(function(a){
          $scope.el.removeClass("sel").addClass("unsel");
        });
      },
      element.on('click', handler);
    }
  };
}])


/**
* Diretive of a click on filter
*
* @param {factory} Data. The factory that work with the filter actions and data of the aplication.
*
* This directive is called when a button on filter is clicked, and to remove all filter list selections.
*/
app.directive('fbOpensublist',['Data', function(Data) {
  return {
    link: function($scope, element) {
      /*
      * The method below works about filter select and open sublist
      */
      handler = function(e) {
        var link,what;
        $scope.el=element;
        if(element.hasClass("off")){
          e.preventDefault();
          return !1;
        }
        if(element.hasClass("unsel")){
          //If isn't selected
          element.parent().parent().find("a").removeClass("sel").addClass("unsel");
          $scope.filter_sub_show=false;
          element.removeClass("unsel").addClass("sel");
          id = element.attr("role");
          link = element.attr("href").split("#")[1];
          what=!0;
          Data.setFilterList(link); //Take sublist options
          $scope.writeSubFilter(Data.getFilterList(),id,link); //Call a method to write the sublist filter
        }
        else{
          element.parent().parent().find("a").removeClass("sel").addClass("unsel");
          what=!1;
        }
        $scope.$apply(function() {
          //When finish
          e.preventDefault();
          if(what){
            $scope.filter_sub_show=true;
            //document.getElementById("filter-sublist").slideDown();
            //document.getElementById("filter-sublist").show();
          }
          else{
            $scope.filter_sub_show=false;
            //jQuery(".filter-sublist").slideUp();
            //document.getElementById("filter-sublist").hide();
          }
        });
      };

      /*
      * The method below works about the unsel of filter options, hide sublist and scrolltop the page.
      * It's called always on confirm and cancel filter
      */
      $scope.remove = function(a){
        if($scope.el){
          $scope.el.removeClass("sel").addClass("unsel");
        }
        $scope.filter_sub_show=false;
        document.getElementById("scroller").scrollTop=0;
      };
      element.on('click', handler);
    }
  };
}]);