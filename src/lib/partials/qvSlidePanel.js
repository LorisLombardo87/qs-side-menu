/* global define */
define([
  'qvangular',
  'jquery',
], function (qvangular,jquery) {
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

        scope.$watch('qsSideFilters', function(newValue, oldValue, scope){ 
          jquery( ".filter-container" ).empty();          
          var groups = newValue.map(function(group){
            var filterpane =  group.filterpane.map(function(target){return '<div class = \"col-md-12 filter\"><div  qsfilterid = "'+target.qInfo.qId+'" class=\"qsSideFilterTarget \" style = \"height: 34px; width: 100%;background-color: white;\"></div></div>'; });
            return '<div class = \"col-md-12 \"><div class = "heading">'+group.heading+'</div></div>'+filterpane.join('');
          });
          jquery( ".filter-container" ).append(groups)

          jquery( ".qsSideFilterTarget" ).each(function(elem){
            //console.log( $(this) );
            scope.qlikApp.getObject( $(this), $(this).attr('qsfilterid') ).then(function (o) {});
          })
        })
      }
    }
  });
});