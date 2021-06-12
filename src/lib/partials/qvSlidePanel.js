define(["qvangular", "jquery", "qlik"], function(a, b, c) {
    "use strict";
    a.directive("qvSlidePanel", function() {
        return {
            restrict: "A",
            scope: {
                qvSlidePanel: "=",
                qlikApp: "=",
                qsSideFilters: "=",
                qsSideName: "="
            },
            link: function(a) {
                b("div").remove(".qs-side-bar"), b("body").append($("<div>", {
                    "class": "qs-side-bar bootstrap_inside"
                }).append($("<div>", {
                    "class": "row"
                }).append($("<div>", {
                    "class": "col-md-12",
                    "margin-bottom": "20px"
                }).append($("<div>", {
                    "class": "btn btn-block btn-success",
                    id: "toggleSideMenu",
                    text: a.qsSideName
                })))).append($("<div>", {
                    "class": "row filter-container"
                }))), b("#toggleSideMenu").click(function() {
                    a.qvSlidePanel = !a.qvSlidePanel, a.$apply()
                }), a.$watch("qvSlidePanel", function(a) {
                    if (a) {
                        {
                            b(".qvt-sheet.qv-panel-sheet").position()
                        }
                        b(".qs-side-bar").addClass("open")
                    } else b(".qs-side-bar").removeClass("open")
                });
                var d = !0;
                a.$watch("qsSideFilters", function(a, e, f) {
                    var g = a.map(function(a) {
                        if (d = a.filterpane.reduce(function(a, b) {
                                return a && !isNaN(b.childFilters)
                            }, !0)) {
                            b(".filter-container").empty();
                            var e = a.filterpane.map(function(a) {
                                f.qlikApp = c.currApp();
                                if (a.childFilters == 1) {
                                    var b = 440;    //max width it will occupy in case the filters are not loaded fully due to slow network.
                                } else {
                                    var b = 44 * a.childFilters; //in case the filters are loaded correctly then it will occupy this much space.
                                }
                                return '<div class = "col-md-12 filter" style = "height: ' + b + 'px;"><div  qsfilterid = "' + a.qInfo.qId + '" class="qsSideFilterTarget " style = "height: ' + b + 'px; width: 100%;border-radius: 2px;"></div></div>'
                            });
                            return '<div class = "col-md-12 "><div class = "heading">' + a.heading + "</div></div>" + e.join("")
                        }
                    });
                    d && (b(".filter-container").append(g), b(".qsSideFilterTarget").each(function() {
                        f.qlikApp.getObject($(this), $(this).attr("qsfilterid")).then(function() {})
                    }))
                }, !0)
            }
        }
    })
});