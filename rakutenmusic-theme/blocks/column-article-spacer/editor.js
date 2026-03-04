(function () {
	'use strict';
	var BLOCK_NAME = 'rakutenmusic/column-article-spacer';
	function register() {
		if ( typeof wp === 'undefined' || ! wp.blocks || ! wp.blockEditor || ! wp.components ) {
			setTimeout( register, 50 );
			return;
		}
		var el = wp.element.createElement;
		var useBlockProps = wp.blockEditor.useBlockProps;
		var InspectorControls = wp.blockEditor.InspectorControls;
		var PanelBody = wp.components.PanelBody;
		var SelectControl = wp.components.SelectControl;
		var __ = wp.i18n.__;
		var heightOpts = [
			{ value: '8', label: __( '8px', 'rakutenmusic-theme' ) },
			{ value: '16', label: __( '16px', 'rakutenmusic-theme' ) },
			{ value: '24', label: __( '24px', 'rakutenmusic-theme' ) },
			{ value: '32', label: __( '32px', 'rakutenmusic-theme' ) }
		];
		try { wp.blocks.unregisterBlockType( BLOCK_NAME ); } catch ( e ) {}
		wp.blocks.registerBlockType( BLOCK_NAME, {
			title: __( '記事：余白', 'rakutenmusic-theme' ),
			category: 'rakutenmusic-column',
			icon: 'image-filter',
			attributes: { height: { type: 'string', default: '16' } },
			edit: function ( props ) {
				var a = props.attributes;
				var blockProps = useBlockProps ? useBlockProps( { className: 'column-article-spacer-editor' } ) : {};
				var h = a.height || '16';
				return el( wp.element.Fragment, null,
					el( InspectorControls, null,
						el( PanelBody, { title: __( '余白の高さ', 'rakutenmusic-theme' ), initialOpen: true },
							el( SelectControl, {
								label: __( '高さ（px）', 'rakutenmusic-theme' ),
								value: h,
								options: heightOpts,
								onChange: function ( v ) { props.setAttributes( { height: v || '16' } ); }
							} )
						)
					),
					el( 'div', blockProps,
						el( 'div', {
							style: {
								height: ( parseInt( h, 10 ) || 16 ) + 'px',
								minHeight: '12px',
								background: 'repeating-linear-gradient(-45deg, #f0f0f0, #f0f0f0 2px, #e8e8e8 2px, #e8e8e8 4px)',
								border: '1px dashed #ccc',
								boxSizing: 'border-box',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center'
							}
						}, el( 'span', { style: { fontSize: 12, color: '#999' } }, __( '余白', 'rakutenmusic-theme' ) + ' ' + h + 'px' ) )
					)
				);
			},
			save: function () { return null; }
		} );
	}
	if ( document.readyState === 'loading' ) document.addEventListener( 'DOMContentLoaded', register );
	else register();
})();
