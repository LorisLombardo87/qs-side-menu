define( [], function () {
	'use strict';

	// ****************************************************************************************
	// Other Settings
	// ****************************************************************************************

	var loadByTag = {
		ref: "props.loadByTag",
		label: "Load Masteritems by Defined Tags",
		type: "boolean",
		show: true,
		defaultValue: true
	};

	var btnLabel = {
		ref: "props.btnLabel",
		label: "Menu Name",
		type: "string",
		show: true,
		defaultValue:'QS Side Menu'
	};

	var group1Tag = {
		ref: "props.groups.group1.tag",
		label: "Associated Tag",
		type: "string",
		show: function(data){return data.props.loadByTag;},
		defaultValue:'QSSideMenu'
	};

	var group2Tag = {
		ref: "props.groups.group2.tag",
		label: "Associated Tag",
		type: "string",
		show: function(data){return data.props.loadByTag;}
	};

	var group3Tag = {
		ref: "props.groups.group3.tag",
		label: "Associated Tag",
		type: "string",
		show: function(data){return data.props.loadByTag;}
	};

	var group4Tag = {
		ref: "props.groups.group4.tag",
		label: "Associated Tag",
		type: "string",
		show: function(data){return data.props.loadByTag;}
	};



	var group1Label = {
		ref: "props.groups.group1.label",
		label: "Menu Heading",
		type: "string",
		show: function(data){return data.props.loadByTag;},
		defaultValue:'Filters'
	};

	var group2Label = {
		ref: "props.groups.group2.label",
		label: "Menu Heading",
		type: "string",
		show: function(data){return data.props.loadByTag;}
	};

	var group3Label = {
		ref: "props.groups.group3.label",
		label: "Menu Heading",
		type: "string",
		show: function(data){return data.props.loadByTag;}
	};

	var group4Label = {
		ref: "props.groups.group4.label",
		label: "Menu Heading",
		type: "string",
		show: function(data){return data.props.loadByTag;}
	};

	// ****************************************************************************************
	// Property Panel Definition
	// ****************************************************************************************

	// Appearance Panel
	var filterPanel = {
		uses: "settings",
		items: {
			settings: {
				type: "items",
				label: "QS Side Menu",
				items: {
					loadByTag: loadByTag,
					btnLabel: btnLabel
				}
			},

			group1: {
				type: "items",
				label: "Group 1",
				items: {
					group1Tag:group1Tag,
					group1Label:group1Label
				}
			},

			group2: {
				type: "items",
				label: "Group 2",
				items: {
					group2Tag:group2Tag,
					group2Label:group2Label
				}
			},

			group3: {
				type: "items",
				label: "Group 3",
				items: {
					group3Tag:group3Tag,
					group3Label:group3Label
				}
			},

			group4: {
				type: "items",
				label: "Group 4",
				items: {
					group4Tag:group4Tag,
					group4Label:group4Label
				}
			}
		}
	};

	// Return values
	return {
		type: "items",
		component: "accordion",
		items: {
			filterPanel: filterPanel

		}
	};

} );
