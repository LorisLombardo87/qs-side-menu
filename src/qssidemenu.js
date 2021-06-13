define(["qlik", "jquery", "./properties", "./initialproperties", "./lib/js/extensionUtils", "text!./lib/css/style.css", "text!./lib/partials/template.html", "text!./lib/css/scoped-bootstrap.css", "./lib/partials/qvSlidePanel"], function(a, b, c, d, e, f, g, h) {
    "use strict";
    return e.addStyleToHeader(f), e.addStyleToHeader(h), {
        definition: c,
        initialProperties: d,
        snapshot: {
            canTakeSnapshot: !0
        },
        resize: function() {},
        template: g,
        controller: ["$scope", function(b) {
            function c() {
                b.groups = b.layout.props.loadByTag ? Object.keys(b.layout.props.groups).reduce(function(a, c) {
                    return b.layout.props.groups[c].tag.length > 0 && a.push(b.layout.props.groups[c]), a
                }, []) : [], b.qlikApp.getList("masterobject").then(function(a) {
                    if (0 == b.groups.length) {
                        var c = a.layout.qAppObjectList.qItems.reduce(function(a, c) {
                            return "filterpane" == c.qData.visualization ? (c.childFilters = 1, a.push(c), b.qlikApp.getObjectProperties(c.qInfo.qId).then(function(a) {
                                c.childFilters = a.layout.qChildList.qItems.length, b.filters[0].filterpane.childFilters = a.layout.qChildList.qItems.length
                            }), a) : a
                        }, []);
                        b.filters = [{
                            heading: "",
                            filterpane: c
                        }]
                    } else b.filters = [], b.groups.forEach(function(c) {
                        var d = a.layout.qAppObjectList.qItems.reduce(function(a, d) {
                            if ("filterpane" == d.qData.visualization && d.qMeta.tags.indexOf(c.tag) > -1) {
                                return d.childFilters = 1, b.qlikApp.getObjectProperties(d.qInfo.qId).then(function(a) {
                                    b.filters[0].filterpane.childFilters = a.layout.qChildList.qItems.length, d.childFilters = a.layout.qChildList.qItems.length
                                }), a.push(d), a
                            }
                            return a
                        }, []);
                        b.filters.push({
                            heading: c.label,
                            filterpane: d
                        })
                    })
                })
            }
            b.sideBarOpen = !1, b.filters = [], b.qlikApp = a.currApp(), b.groups = [], b.toggleMenu = function() {
                b.sideBarOpen = !b.sideBarOpen
            }, b.$watch("layout.props", function() {
                c()
            }, !0)
        }],
        paint: function() {}
    }
});