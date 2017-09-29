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
        qsSideName:'=' ,
		mnzsSidemenucolour:'=' ,
		mnzsGroupheadercolour:'=' 
      },
      
      link: function(scope, elem, attrs ) {

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
                     })
                )
            )
            .append(
                $('<div>', {
                     'class': 'row filter-container'
                 })
            ) 
        );

		
		jquery( ".qs-side-bar" ).css('background-color', scope.mnzsSidemenucolour );
		jquery( ".qs-side-bar" ).css('color', scope.mnzsGroupheadercolour );
		jquery( ".qs-side-bar" ).css('font-weight', 'bold' );
		
        scope.$watch('qvSlidePanel', function(newValue, oldValue, scope) {
			jquery( ".qs-side-bar" ).mouseleave(function(){	
				$(".qs-side-bar").removeClass( "open" );
				});			
        });

        scope.$watch('qsSideFilters', function(newValue, oldValue, scope){ 
          jquery( ".filter-container" ).empty();          
          var groups = newValue.map(function(group){
            var filterpane =  group.filterpane.map(function(target){return '<div class = \"col-md-12 filter\"><div  qsfilterid = "'+target.qInfo.qId+'" class=\"qsSideFilterTarget \" style = \"width: 100%;\"></div></div>'; });
            return '<div class = \"col-md-12 \" ><div class = "heading">'+group.heading+'</div></div>'+filterpane.join('');
          });
          jquery( ".filter-container" ).append(groups)
          jquery( ".qsSideFilterTarget" ).each(function(elem){
          scope.qlikApp.getObject( $(this), $(this).attr('qsfilterid') ).then(function (o) {});
          })
        })
      }
    }
  });
});
