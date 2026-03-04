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
		// 早期登録（input）を上書きして RichText で <strong> 等をレンダリングするため、遅延して登録
		setTimeout( function () {
			wp.blocks.registerBlockType( BLOCK_NAME, {
				title: __( '記事：小見出し', 'rakutenmusic-theme' ),
				category: 'rakutenmusic-column',
				icon: 'heading',
				attributes: { content: { type: 'string', default: '' }, spacingTop: { type: 'string', default: '' }, spacingBottom: { type: 'string', default: '' } },
				edit: function ( props ) {
					var a = props.attributes;
					var blockProps = useBlockProps ? useBlockProps( {
						className: 'wp-block-rakutenmusic-column-article-header',
						style: ( a.spacingTop || a.spacingBottom ) ? { marginTop: a.spacingTop || undefined, marginBottom: a.spacingBottom || undefined } : undefined
					} ) : {};
					// render.php と同じ構造でフロントと同一の見た目で編集（RichText で <strong> 等を解釈）
					return el( 'div', blockProps,
						el( 'div', null,
							el( 'div', { className: 'article-header' },
								el( RichText, {
									tagName: 'p',
									value: a.content,
									onChange: function ( v ) { props.setAttributes( { content: v } ); },
									placeholder: __( '小見出しを入力', 'rakutenmusic-theme' ),
									allowedFormats: [ 'core/bold', 'core/italic' ]
								} )
							)
						)
					);
				},
				save: function () { return null; }
			} );
		}, 100 );
	}
	if ( document.readyState === 'loading' ) document.addEventListener( 'DOMContentLoaded', register );
	else register();
})();
