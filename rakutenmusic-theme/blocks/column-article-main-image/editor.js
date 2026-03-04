(function () {
	'use strict';
	var BLOCK_NAME = 'rakutenmusic/column-article-main-image';
	function register() {
		if ( typeof wp === 'undefined' || ! wp.blocks || ! wp.blockEditor || ! wp.components ) {
			setTimeout( register, 50 );
			return;
		}
		var el = wp.element.createElement;
		var useBlockProps = wp.blockEditor.useBlockProps;
		var InspectorControls = wp.blockEditor.InspectorControls;
		var PanelBody = wp.components.PanelBody;
		var TextControl = wp.components.TextControl;
		var SelectControl = wp.components.SelectControl;
		var __ = wp.i18n.__;
		try { wp.blocks.unregisterBlockType( BLOCK_NAME ); } catch ( e ) {}
		wp.blocks.registerBlockType( BLOCK_NAME, {
			title: __( '記事：メイン画像', 'rakutenmusic-theme' ),
			category: 'rakutenmusic-column',
			icon: 'format-image',
			attributes: { url: { type: 'string', default: '' }, alt: { type: 'string', default: '' } },
			edit: function ( props ) {
				var a = props.attributes;
				var blockProps = useBlockProps ? useBlockProps( {
					style: ( a.spacingTop || a.spacingBottom ) ? { marginTop: a.spacingTop || undefined, marginBottom: a.spacingBottom || undefined } : undefined
				} ) : {};
				var url = ( a.url && a.url.trim() ) ? a.url.trim() : '';
				if ( url && url.indexOf( '/assets/' ) === 0 && typeof rakutenmusicColumnArchive !== 'undefined' && rakutenmusicColumnArchive.assetsUri ) {
					url = rakutenmusicColumnArchive.assetsUri + url.slice( 7 );
				}
				var spacingOpts = [
					{ value: '', label: __( 'なし', 'rakutenmusic-theme' ) },
					{ value: '8px', label: __( '小 (8px)', 'rakutenmusic-theme' ) },
					{ value: '16px', label: __( '中 (16px)', 'rakutenmusic-theme' ) },
					{ value: '24px', label: __( '大 (24px)', 'rakutenmusic-theme' ) },
					{ value: '32px', label: __( '特大 (32px)', 'rakutenmusic-theme' ) }
				];
				return el( wp.element.Fragment, null,
					el( InspectorControls, null,
						el( PanelBody, { title: __( 'メイン画像', 'rakutenmusic-theme' ), initialOpen: true },
							el( TextControl, { label: __( '画像URL', 'rakutenmusic-theme' ), value: a.url || '', onChange: function ( v ) { props.setAttributes( { url: v || '' } ); } } ),
							el( TextControl, { label: __( 'alt', 'rakutenmusic-theme' ), value: a.alt || '', onChange: function ( v ) { props.setAttributes( { alt: v || '' } ); } } )
						)
					),
					el( 'div', blockProps,
						el( 'div', { className: 'main-image' },
							url ? el( 'img', { src: url, alt: a.alt || '', width: 800, height: 420, style: { maxWidth: '100%', height: 'auto', display: 'block' } } )
								: el( 'div', { style: { padding: 40, background: '#f0f0f0', textAlign: 'center', color: '#666' } }, __( 'メイン画像（右サイドバーでURLを設定）', 'rakutenmusic-theme' ) )
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
