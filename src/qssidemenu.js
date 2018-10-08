define([
        'qlik',
        'jquery',
        /*'underscore',*/
        './properties',
        './initialproperties',
        './lib/js/extensionUtils',
        'text!./lib/css/style.css',
        'text!./lib/partials/template.html',
        'text!./lib/css/scoped-bootstrap.css',
        './lib/partials/qvSlidePanel'
],
function (qlik, $, /*_,*/ props, initProps, extensionUtils, cssContent, htmlTemplate, bootstrapCss) {
    'use strict';

    extensionUtils.addStyleToHeader(cssContent);
    extensionUtils.addStyleToHeader(bootstrapCss);

    console.log('Initializing - remove me');

    return {

        definition: props,

        initialProperties: initProps,

        snapshot: { canTakeSnapshot: true },

        resize : function( /*$element, layout*/ ) {
            //do nothing
        },

        //clearSelectedValues : function($element) {
        //
        //},


        // Angular Support (uncomment to use)
        template: htmlTemplate,

        // Angular Controller
        controller: ['$scope', function ($scope) {
            $scope.sideBarOpen= false;
            $scope.filters = [];

            $scope.qlikApp = qlik.currApp();
            $scope.groups = [];
           
            

            $scope.toggleMenu = function(){
                $scope.sideBarOpen= !$scope.sideBarOpen;
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
                    console.log(model);
                    console.log( $scope.groups);
                    if($scope.groups.length==0){
                        var filterIndex = 0;
                        var filterpane = model.layout.qAppObjectList.qItems.reduce(function(filtersTmp,currentMO){
                            if (currentMO.qData.visualization=="filterpane"){
                                currentMO.childFilters=1;

                                filtersTmp.push(currentMO);
                                $scope.qlikApp.getObjectProperties(currentMO.qInfo.qId).then(function(model){
                                    //console.log(model.layout.qChildList.qItems.length);
                                    currentMO.childFilters=model.layout.qChildList.qItems.length;
                                    $scope.filters[0].filterpane.childFilters=model.layout.qChildList.qItems.length;
                                });
                                
                                return filtersTmp;
                            }
                            else{
                                return filtersTmp;
                            }
                            filterIndex++;
                        },[]);

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
                                        var filterIndex = 0;
                                        currentMO.childFilters=1;
                                        $scope.qlikApp.getObjectProperties(currentMO.qInfo.qId).then(function(model){
                                            //console.log(model.layout.qChildList.qItems.length);
                                            $scope.filters[0].filterpane.childFilters=model.layout.qChildList.qItems.length;
                                            currentMO.childFilters=model.layout.qChildList.qItems.length;
                                        });

                                        filtersTmp.push(currentMO);
                                        return filtersTmp;
                                        filterIndex++;
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
                    console.log($scope.filters);
                });
            }

            $scope.$watch('layout.props', function(newValue, oldValue, scope) {
                setUpView();
            }, true);
          
		
        }],


        paint: function ( $element /*, layout*/ ) {

            
            
            /*console.log('Basic Objects');
            console.info('$element:');
            console.log($element);
            console.info('layout:');
            console.log(layout);
            console.groupEnd();
            */

            //$element.empty();
            // var $helloWorld = $(document.createElement('div'));
            // $helloWorld.addClass('hello-world');
            // $helloWorld.html('Hello World from the extension "QS Side Menu"');
            // $element.append($helloWorld);

        }
    };

});
