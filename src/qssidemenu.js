define([
        'js/qlik',
        'jquery',
        './properties',
        './initialproperties',
        './lib/js/extensionUtils',
        'text!./lib/css/style.css',
        'text!./lib/partials/template.html',
        'text!./lib/css/scoped-bootstrap.css',
        './lib/partials/qvSlidePanel'
],
function (qlik, $, props, initProps, extensionUtils, cssContent, htmlTemplate, bootstrapCss) {
    'use strict';

    extensionUtils.addStyleToHeader(cssContent);
    extensionUtils.addStyleToHeader(bootstrapCss);

    return {

        definition: props,

        initialProperties: initProps,

        snapshot: { canTakeSnapshot: true },

        template: htmlTemplate,

        // Angular Controller
        controller: ['$scope', function ($scope) {
		
            $scope.sideBarOpen= false;
            $scope.filters = [];

            $scope.qlikApp = qlik.currApp();
            $scope.groups = [];
			
			$scope.openMenu = function(){
                $( ".qs-side-bar" ).addClass( "open" );
            };

            function setUpView(){

                if($scope.layout.props.loadByTag){
                    $scope.groups = Object.keys($scope.layout.props.groups).reduce(function(groupTmp,currentGroup){
                        if ($scope.layout.props.groups[currentGroup].tag.length>0){groupTmp.push($scope.layout.props.groups[currentGroup]);}
                        return groupTmp;
                    },[]);
                }else{
                    $scope.groups = [];
                }

                $scope.qlikApp.getList('masterobject').then(function(model) {
                    if($scope.groups.length==0){
                        var filterpane = model.layout.qAppObjectList.qItems.reduce(function(filtersTmp,currentMO){
                            if (currentMO.qData.visualization=="filterpane"){
                                filtersTmp.push(currentMO);
                                return filtersTmp;
                            }
                            else{
                                return filtersTmp;
                            }
                        },[])
						;

                        $scope.filters = [
                        {
                            'heading':'',
                            'filterpane':filterpane
                        }
                        ];

                    }else{
                        $scope.filters = [];
                        $scope.groups.forEach(function(group) {
                                var filterpane = model.layout.qAppObjectList.qItems.reduce(function(filtersTmp,currentMO){
                                    if (currentMO.qData.visualization=="filterpane" && currentMO.qMeta.tags.indexOf(group.tag)>-1){
                                        filtersTmp.push(currentMO);
                                        return filtersTmp;
                                    }
                                    else{
                                        return filtersTmp;
                                    }
                                },[]);
                                $scope.filters.push(
                                {
                                    'heading':group.label,
                                    'filterpane':filterpane
                                }
                                );
                        });
                    }                    
                });
            }

            $scope.$watch('layout.props', function(newValue, oldValue, scope) {
                setUpView();
            }, true);
          
		
        }],

        paint: function ( $element ) {
        }
    };

});
