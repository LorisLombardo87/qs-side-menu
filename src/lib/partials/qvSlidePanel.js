/* global define */
define([
  'qvangular',
  'jquery',
  'qlik'
], function (qvangular,jquery,qlik) {
  'use strict';

  qvangular.directive("qvSlidePanel", function() {
    return {
      restrict: "A",
      
      scope: {
        qvSlidePanel : '=',
        qlikApp: '=',
        qsSideFilters:'=',        
        qsSideName:'='
      },
      
      link: function(scope, elem, attrs) {

        //se esiste rimuovo l'oggetto al caricamento della pagina
        jquery( "div" ).remove(".qs-side-bar");

        jquery( "body" ).append(
            $('<div>', {
                 'class': 'qs-side-bar bootstrap_inside'
             }).append(

                $('<div>', {
                     'class': 'row'
                 }).append(

                    $('<div>', {
                         'class': 'col-md-12',
                         'margin-bottom': '20px'
                     }).append(

                        $('<div>', {
                             'class': 'btn btn-block btn-success',
                             'id': 'toggleSideMenu',
                             'text': scope.qsSideName
                         })

                    )

                )
            )
            .append(
                $('<div>', {
                     'class': 'row filter-container'
                 })
            ) 
        );


        jquery( "#toggleSideMenu" ).click(function() {
          scope.qvSlidePanel=!scope.qvSlidePanel;
          scope.$apply();
        });
       

        scope.$watch('qvSlidePanel', function(newValue, oldValue, scope) {
          if(newValue){
            var sheetPosition = jquery( ".qvt-sheet.qv-panel-sheet").position();
            jquery( ".qs-side-bar" ).addClass( "open" );
          }
          else{
            jquery( ".qs-side-bar" ).removeClass( "open" );
          }           
        });

var ok = true;
        scope.$watch('qsSideFilters', function(newValue, oldValue, scope){ 
               
          var groups = newValue.map(function(group){
            
            ok = group.filterpane.reduce(function (oktmp,target) {
              console.log(oktmp,target);
              return oktmp && !isNaN(target.childFilters);
            }, true);

              console.log('ok',ok);
            if(ok){
              jquery( ".filter-container" ).empty();     
              var filterpane =  group.filterpane.map(function(target){
                  console.log('target',target);
                  scope.qlikApp = qlik.currApp();
                  if (target.childFilters == 1) {
                    var fheight = 310; //the maximum height of filter that you want to make when there is rendering issue. Currently it is 310; i.e. 7*43. So it will occupy space of 7 filters. You can keep it as the (maximum filters in a single group)*43. In our case it was 7 filters.
                  }
                  else {
                    var fheight = 43 * target.childFilters; //43 is the height of each filters.
                  }

                  //var fheight = ((34+5)*target.childFilters);
                  console.log(fheight);
                return '<div class = \"col-md-12 filter\" style = \"height: '+(fheight)+'px;\"><div  qsfilterid = "'+target.qInfo.qId+'" class=\"qsSideFilterTarget \" style = \"height: '+(fheight)+'px; width: 100%;border-radius: 2px;\"></div></div>'; });
              return '<div class = \"col-md-12 \"><div class = "heading">'+group.heading+'</div></div>'+filterpane.join('');
            }
          });
          if(ok){
            jquery( ".filter-container" ).append(groups)

            jquery( ".qsSideFilterTarget" ).each(function(elem){
              //console.log( $(this) );
              scope.qlikApp.getObject( $(this), $(this).attr('qsfilterid') ).then(function (o) {});
            })
          }
        },true)
      }
    }
  });
});