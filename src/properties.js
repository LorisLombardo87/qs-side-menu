define([], function() {
    "use strict";
    var a = {
            ref: "props.loadByTag",
            label: "Load Masteritems by Defined Tags",
            type: "boolean",
            show: !0,
            defaultValue: !0
        },
        b = {
            ref: "props.btnLabel",
            label: "Menu Name",
            type: "string",
            show: !0,
            defaultValue: "QS Side Menu"
        },
        c = {
            ref: "props.groups.group1.tag",
            label: "Associated Tag",
            type: "string",
            show: function(a) {
                return a.props.loadByTag
            },
            defaultValue: "QSSideMenu"
        },
        d = {
            ref: "props.groups.group2.tag",
            label: "Associated Tag",
            type: "string",
            show: function(a) {
                return a.props.loadByTag
            }
        },
        e = {
            ref: "props.groups.group3.tag",
            label: "Associated Tag",
            type: "string",
            show: function(a) {
                return a.props.loadByTag
            }
        },
        f = {
            ref: "props.groups.group4.tag",
            label: "Associated Tag",
            type: "string",
            show: function(a) {
                return a.props.loadByTag
            }
        },
        g = {
            ref: "props.groups.group1.label",
            label: "Menu Heading",
            type: "string",
            show: function(a) {
                return a.props.loadByTag
            },
            defaultValue: "Filters"
        },
        h = {
            ref: "props.groups.group2.label",
            label: "Menu Heading",
            type: "string",
            show: function(a) {
                return a.props.loadByTag
            }
        },
        i = {
            ref: "props.groups.group3.label",
            label: "Menu Heading",
            type: "string",
            show: function(a) {
                return a.props.loadByTag
            }
        },
        j = {
            ref: "props.groups.group4.label",
            label: "Menu Heading",
            type: "string",
            show: function(a) {
                return a.props.loadByTag
            }
        },
        k = {
            uses: "settings",
            items: {
                settings: {
                    type: "items",
                    label: "QS Side Menu",
                    items: {
                        loadByTag: a,
                        btnLabel: b
                    }
                },
                group1: {
                    type: "items",
                    label: "Group 1",
                    items: {
                        group1Tag: c,
                        group1Label: g
                    }
                },
                group2: {
                    type: "items",
                    label: "Group 2",
                    items: {
                        group2Tag: d,
                        group2Label: h
                    }
                },
                group3: {
                    type: "items",
                    label: "Group 3",
                    items: {
                        group3Tag: e,
                        group3Label: i
                    }
                },
                group4: {
                    type: "items",
                    label: "Group 4",
                    items: {
                        group4Tag: f,
                        group4Label: j
                    }
                }
            }
        };
    return {
        type: "items",
        component: "accordion",
        items: {
            filterPanel: k
        }
    }
});