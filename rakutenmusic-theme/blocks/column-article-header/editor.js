(function () {
	'use strict';
	var BLOCK_NAME = 'rakutenmusic/column-article-header';
	function register() {
		if ( typeof wp === 'undefined' || ! wp.blocks || ! wp.blockEditor || ! wp.components || ! wp.element ) {
			setTimeout( register, 50 );
			return;
		}
		var el = wp.element.createElement;
		var useBlockProps = wp.blockEditor.useBlockProps;
		var RichText = wp.blockEditor.RichText;
		var InspectorControls = wp.blockEditor.InspectorControls;
		var PanelBody = wp.components.PanelBody;
		var SelectControl = wp.components.SelectControl;
		var __ = wp.i18n.__;
		var spacingOpts = [
			{ value: '', label: __( 'なし', 'rakutenmusic-theme' ) },
			{ value: '8px', label: __( '小 (8px)', 'rakutenmusic-theme' ) },
			{ value: '16px', label: __( '中 (16px)', 'rakutenmusic-theme' ) },
			{ value: '24px', label: __( '大 (24px)', 'rakutenmusic-theme' ) },
			{ value: '32px', label: __( '特大 (32px)', 'rakutenmusic-theme' ) }
		];
		try { wp.blocks.unregisterBlockType( BLOCK_NAME ); } catch ( e ) {}
		wp.blocks.registerBlockType( BLOCK_NAME, {
			title: __( '記事：小見出し', 'rakutenmusic-theme' ),
			category: 'rakutenmusic',
			icon: 'heading',
			attributes: { content: { type: 'string', default: '' }, spacingTop: { type: 'string', default: '' }, spacingBottom: { type: 'string', default: '' } },
			edit: function ( props ) {
				var a = props.attributes;
				var blockProps = useBlockProps ? useBlockProps( {
					style: ( a.spacingTop || a.spacingBottom ) ? { marginTop: a.spacingTop || undefined, marginBottom: a.spacingBottom || undefined } : undefined
				} ) : {};
				return el( wp.element.Fragment, null,
					el( InspectorControls, null,
						el( PanelBody, { title: __( '余白', 'rakutenmusic-theme' ), initialOpen: true },
							el( SelectControl, {
								label: __( '上余白', 'rakutenmusic-theme' ),
								value: a.spacingTop || '',
								options: spacingOpts,
								onChange: function ( v ) { props.setAttributes( { spacingTop: v || '' } ); }
							} ),
							el( SelectControl, {
								label: __( '下余白', 'rakutenmusic-theme' ),
								value: a.spacingBottom || '',
								options: spacingOpts,
								onChange: function ( v ) { props.setAttributes( { spacingBottom: v || '' } ); }
							} )
						)
					),
					el( 'div', blockProps,
					el( 'div', { className: 'article-header' },
						el( RichText, {
							tagName: 'p',
							value: a.content,
							onChange: function ( v ) { props.setAttributes( { content: v } ); },
							placeholder: __( '小見出しを入力', 'rakutenmusic-theme' )
						} )
					)
				)
				);
			},
			save: function () { return null; }
		} );
	}
	if ( document.readyState === 'loading' ) document.addEventListener( 'DOMContentLoaded', register );
	else register();
})();
