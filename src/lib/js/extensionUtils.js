define( [
	'jquery',
	'underscore'
], function ( $, _ ) {
	'use strict';

	return {

		/**
		 * Add a style to the document's header.
		 * @param cssContent {String} CSS content to be added to the header
		 * @param id {String} If id is passed, addStyleToHeader will check if there has already been added a style with the given id, if yes, the css content will not be added to the header again
		 */
		addStyleToHeader: function ( cssContent, id ) {
			if ( id && typeof id === 'string' ) {
				if ( !$( '#' + id ).length ) {
					$( "<style>" )
						.attr( 'id', id )
						.html( cssContent ).appendTo( "head" );
				}
			} else {
				$( "<style>" ).html( cssContent ).appendTo( "head" );
			}
		},
	};

} );
