(function () {
	'use strict';
	var BLOCK_NAME = 'rakutenmusic/column-article-title';
	function register() {
		if ( typeof wp === 'undefined' || ! wp.blocks || ! wp.blockEditor || ! wp.element ) {
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
		var fontSizeOpts = [
			{ value: '', label: __( 'デフォルト (30px)', 'rakutenmusic-theme' ) },
			{ value: '24px', label: __( '24px', 'rakutenmusic-theme' ) },
			{ value: '28px', label: __( '28px', 'rakutenmusic-theme' ) },
			{ value: '32px', label: __( '32px', 'rakutenmusic-theme' ) },
			{ value: '36px', label: __( '36px', 'rakutenmusic-theme' ) },
			{ value: '40px', label: __( '40px', 'rakutenmusic-theme' ) }
		];
		try { wp.blocks.unregisterBlockType( BLOCK_NAME ); } catch ( e ) {}
		wp.blocks.registerBlockType( BLOCK_NAME, {
			title: __( '記事：タイトル', 'rakutenmusic-theme' ),
			category: 'rakutenmusic',
			icon: 'heading',
			attributes: { content: { type: 'string', default: '' }, fontSize: { type: 'string', default: '' }, spacingTop: { type: 'string', default: '' }, spacingBottom: { type: 'string', default: '' } },
			edit: function ( props ) {
				var a = props.attributes;
				var blockProps = useBlockProps ? useBlockProps( {
					style: ( a.spacingTop || a.spacingBottom ) ? { marginTop: a.spacingTop || undefined, marginBottom: a.spacingBottom || undefined } : undefined
				} ) : {};
				var h1Style = ( a.fontSize && a.fontSize.trim() ) ? { fontSize: a.fontSize } : undefined;
				return el( wp.element.Fragment, null,
					el( InspectorControls, null,
						el( PanelBody, { title: __( 'フォントサイズ', 'rakutenmusic-theme' ), initialOpen: true },
							el( SelectControl, {
								label: __( 'タイトルのフォントサイズ', 'rakutenmusic-theme' ),
								value: a.fontSize || '',
								options: fontSizeOpts,
								onChange: function ( v ) { props.setAttributes( { fontSize: v || '' } ); }
							} )
						),
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
						el( 'div', { className: 'article' },
							el( RichText, {
								tagName: 'h1',
								value: a.content,
								onChange: function ( v ) { props.setAttributes( { content: v } ); },
								placeholder: __( '記事タイトルを入力', 'rakutenmusic-theme' ),
								style: h1Style
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
