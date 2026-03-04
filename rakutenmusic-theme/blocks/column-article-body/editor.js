(function () {
	'use strict';
	var BLOCK_NAME = 'rakutenmusic/column-article-body';
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
			title: __( '記事：本文', 'rakutenmusic-theme' ),
			category: 'rakutenmusic-column',
			icon: 'editor-alignleft',
			attributes: { content: { type: 'string', default: '' }, spacingTop: { type: 'string', default: '' }, spacingBottom: { type: 'string', default: '' } },
			edit: function ( props ) {
				var a = props.attributes;
				var blockProps = useBlockProps ? useBlockProps( {
					className: 'column-article-body-editor',
					style: ( a.spacingTop || a.spacingBottom ) ? { marginTop: a.spacingTop || undefined, marginBottom: a.spacingBottom || undefined } : undefined
				} ) : {};
				return el( 'div', blockProps,
					el( RichText, {
						tagName: 'div',
						className: 'column-desc',
						value: a.content,
						onChange: function ( v ) { props.setAttributes( { content: v } ); },
						placeholder: __( '記事本文を入力（太字・色なども編集できます）', 'rakutenmusic-theme' ),
						allowedFormats: [ 'core/bold', 'core/italic', 'core/strikethrough', 'core/link' ]
					} )
				)
				);
			},
			save: function () { return null; }
		} );
	}
	if ( document.readyState === 'loading' ) document.addEventListener( 'DOMContentLoaded', register );
	else register();
})();
