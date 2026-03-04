(function () {
	'use strict';

	var BLOCK_NAME = 'rakutenmusic/column-archive-hero';

	function registerColumnArchiveHeroBlock() {
		if ( typeof wp === 'undefined' || ! wp.blocks || ! wp.blockEditor || ! wp.components ) {
			setTimeout( registerColumnArchiveHeroBlock, 50 );
			return;
		}

		var el = wp.element.createElement;
		var useBlockProps = wp.blockEditor.useBlockProps;
		var InspectorControls = wp.blockEditor.InspectorControls;
		var PanelBody = wp.components.PanelBody;
		var TextControl = wp.components.TextControl;
		var __ = wp.i18n.__;

		try {
			wp.blocks.unregisterBlockType( BLOCK_NAME );
		} catch ( e ) {}

		wp.blocks.registerBlockType( BLOCK_NAME, {
			title: __( '読む音楽ガイド：メイン看板', 'rakutenmusic-theme' ),
			category: 'rakutenmusic-column',
			icon: 'cover-image',
			description: __( '読む音楽ガイドアーカイブページのヒーロー（メイン看板）部分', 'rakutenmusic-theme' ),
			attributes: {
				title: { type: 'string', default: '読む音楽ガイド' },
				subtitle: { type: 'string', default: '新しい発見がここに' },
				description: { type: 'string', default: '楽天ミュージックが贈る、聴いても読んでも楽しめる音楽記事をお届け' },
				topImageUrl: { type: 'string', default: '' },
				bottomImageUrl: { type: 'string', default: '' }
			},
			edit: function ( props ) {
				var attrs = props.attributes;
				var blockProps = useBlockProps ? useBlockProps( { className: 'column-archive-hero-editor' } ) : { className: 'column-archive-hero-editor' };

				return el(
					wp.element.Fragment,
					null,
					el(
						InspectorControls,
						null,
						el(
							PanelBody,
							{ title: __( 'メイン看板', 'rakutenmusic-theme' ), initialOpen: true },
							el( TextControl, {
								label: __( 'タイトル', 'rakutenmusic-theme' ),
								value: attrs.title || '',
								onChange: function ( v ) { props.setAttributes( { title: v || '' } ); }
							} ),
							el( TextControl, {
								label: __( 'サブタイトル', 'rakutenmusic-theme' ),
								value: attrs.subtitle || '',
								onChange: function ( v ) { props.setAttributes( { subtitle: v || '' } ); }
							} ),
							el( TextControl, {
								label: __( '説明文', 'rakutenmusic-theme' ),
								value: attrs.description || '',
								onChange: function ( v ) { props.setAttributes( { description: v || '' } ); }
							} ),
							el( TextControl, {
								label: __( '右上画像URL', 'rakutenmusic-theme' ),
								value: attrs.topImageUrl || '',
								onChange: function ( v ) { props.setAttributes( { topImageUrl: v || '' } ); }
							} ),
							el( TextControl, {
								label: __( '左下画像URL', 'rakutenmusic-theme' ),
								value: attrs.bottomImageUrl || '',
								onChange: function ( v ) { props.setAttributes( { bottomImageUrl: v || '' } ); }
							} )
						)
					),
					el(
						'div',
						blockProps,
						el( 'div', {
							className: 'column-archive-hero-placeholder',
							style: { padding: '24px', background: '#f0f0f0', borderRadius: '4px', textAlign: 'center' }
						},
							el( 'strong', null, attrs.title || '読む音楽ガイド' ),
							el( 'p', { style: { margin: '8px 0 0', fontSize: '13px', color: '#666' } }, attrs.subtitle || '新しい発見がここに' )
						)
					)
				);
			},
			save: function () {
				return null;
			}
		} );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', registerColumnArchiveHeroBlock );
	} else {
		registerColumnArchiveHeroBlock();
	}
})();
