(function () {
	'use strict';
	var BLOCK_NAME = 'rakutenmusic/column-article-song';

	function resolveImageUrl( url ) {
		if ( ! url || typeof url !== 'string' ) return url;
		url = url.trim();
		if ( url.indexOf( '/assets/' ) === 0 && typeof rakutenmusicColumnArchive !== 'undefined' && rakutenmusicColumnArchive.assetsUri ) {
			return rakutenmusicColumnArchive.assetsUri + url.slice( 7 );
		}
		return url;
	}

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
		var TextControl = wp.components.TextControl;
		var SelectControl = wp.components.SelectControl;
		var __ = wp.i18n.__;

		var spacingOpts = [
			{ value: '', label: __( 'なし', 'rakutenmusic-theme' ) },
			{ value: '8px', label: __( '小 (8px)', 'rakutenmusic-theme' ) },
			{ value: '16px', label: __( '中 (16px)', 'rakutenmusic-theme' ) },
			{ value: '24px', label: __( '大 (24px)', 'rakutenmusic-theme' ) },
			{ value: '32px', label: __( '特大 (32px)', 'rakutenmusic-theme' ) }
		];

		var playSvg = el( 'svg', {
			xmlns: 'http://www.w3.org/2000/svg',
			width: 24,
			height: 25,
			viewBox: '0 0 24 25',
			fill: 'none'
		}, el( 'rect', { x: '0.5', y: '1.02441', width: '23', height: '23', rx: '11.5', stroke: 'white' } ), el( 'path', { d: 'M10.2147 16.8749L16.625 13.1739C17.125 12.8853 17.125 12.1636 16.625 11.8749L10.2147 8.17393C9.71475 7.88526 9.08975 8.2461 9.08975 8.82345L9.08975 16.2254C9.08975 16.8027 9.71475 17.1636 10.2147 16.8749Z', fill: 'white' } ) );

		try {
			wp.blocks.unregisterBlockType( BLOCK_NAME );
		} catch ( e ) {}

		wp.blocks.registerBlockType( BLOCK_NAME, {
			title: __( '記事：音楽再生', 'rakutenmusic-theme' ),
			category: 'rakutenmusic-column',
			icon: 'format-audio',
			attributes: {
				imageUrl: { type: 'string', default: '' },
				linkUrl: { type: 'string', default: '' },
				linkUrlPc: { type: 'string', default: '' },
				linkUrlSp: { type: 'string', default: '' },
				songName: { type: 'string', default: '' },
				description: { type: 'string', default: '' },
				spacingTop: { type: 'string', default: '' },
				spacingBottom: { type: 'string', default: '' }
			},
			edit: function ( props ) {
				var a = props.attributes;
				var blockProps = useBlockProps ? useBlockProps( {
					className: 'column-article-song-editor',
					style: ( a.spacingTop || a.spacingBottom ) ? { marginTop: a.spacingTop || undefined, marginBottom: a.spacingBottom || undefined } : undefined
				} ) : {};
				var imgUrl = resolveImageUrl( a.imageUrl || '' );
				var linkUrl = ( a.linkUrl && a.linkUrl.trim() ) ? a.linkUrl.trim() : '#';
				var linkUrlPc = ( a.linkUrlPc && a.linkUrlPc.trim() ) ? a.linkUrlPc.trim() : linkUrl;
				var linkUrlSp = ( a.linkUrlSp && a.linkUrlSp.trim() ) ? a.linkUrlSp.trim() : linkUrl;

				return el( wp.element.Fragment, null,
					el( InspectorControls, null,
						el( PanelBody, { title: __( '画像・リンク', 'rakutenmusic-theme' ), initialOpen: true },
							el( TextControl, {
								label: __( 'ジャケット写真画像URL', 'rakutenmusic-theme' ),
								value: a.imageUrl || '',
								onChange: function ( v ) { props.setAttributes( { imageUrl: v || '' } ); }
							} ),
							el( TextControl, {
								label: __( 'リンクURL（共通・未指定時）', 'rakutenmusic-theme' ),
								value: a.linkUrl || '',
								onChange: function ( v ) { props.setAttributes( { linkUrl: v || '' } ); },
								help: __( 'PC/スマホどちらも未指定のときに使います。', 'rakutenmusic-theme' )
							} ),
							el( TextControl, {
								label: __( 'リンクURL（PC・タブレット）', 'rakutenmusic-theme' ),
								value: a.linkUrlPc || '',
								onChange: function ( v ) { props.setAttributes( { linkUrlPc: v || '' } ); },
								help: __( 'User-Agent が PC と判定されたときに使用します。', 'rakutenmusic-theme' )
							} ),
							el( TextControl, {
								label: __( 'リンクURL（スマホ）', 'rakutenmusic-theme' ),
								value: a.linkUrlSp || '',
								onChange: function ( v ) { props.setAttributes( { linkUrlSp: v || '' } ); },
								help: __( 'User-Agent がスマホと判定されたときに使用します。', 'rakutenmusic-theme' )
							} )
						)
					),
					el( 'div', blockProps,
						el( 'div', { className: 'song-article-block' },
							el( 'div', { className: 'song-pic-area' },
								el( 'a', { href: linkUrlPc },
									imgUrl
										? el( 'img', { src: imgUrl, alt: '', style: { maxWidth: '120px', height: 'auto' } } )
										: el( 'div', { style: { width: 120, height: 120, background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#666' } }, __( '画像を設定', 'rakutenmusic-theme' ) )
								),
								el( 'a', { className: 'btn-player', href: linkUrlPc, style: { textDecoration: 'none' } },
									el( 'p', null, 'いますぐ聴く' ),
									playSvg
								)
							),
							el( 'div', { className: 'song-desc-area' },
								el( RichText, {
									tagName: 'span',
									className: 'song-name',
									value: a.songName,
									onChange: function ( v ) { props.setAttributes( { songName: v } ); },
									placeholder: __( '曲名（太字・色など編集可）', 'rakutenmusic-theme' ),
									allowedFormats: [ 'core/bold', 'core/italic', 'core/strikethrough', 'core/link' ],
									style: { padding: '12px 0', display: 'block' }
								} ),
								el( RichText, {
									tagName: 'div',
									className: 'artist-desc',
									value: a.description,
									onChange: function ( v ) { props.setAttributes( { description: v } ); },
									placeholder: __( '説明文（太字・色など編集可）', 'rakutenmusic-theme' ),
									allowedFormats: [ 'core/bold', 'core/italic', 'core/strikethrough', 'core/link' ]
								} )
							)
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
		document.addEventListener( 'DOMContentLoaded', register );
	} else {
		register();
	}
})();
