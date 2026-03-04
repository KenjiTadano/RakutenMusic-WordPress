(function () {
	'use strict';
	var BLOCK_NAME = 'rakutenmusic/column-article-youtube';
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
		var TextControl = wp.components.TextControl;
		var TextareaControl = wp.components.TextareaControl;
		var __ = wp.i18n.__;
		try { wp.blocks.unregisterBlockType( BLOCK_NAME ); } catch ( e ) {}
		wp.blocks.registerBlockType( BLOCK_NAME, {
			title: __( '記事：YouTube', 'rakutenmusic-theme' ),
			category: 'rakutenmusic-column',
			icon: 'video-alt3',
			attributes: {
				videoType: { type: 'string', default: 'iframe' },
				iframeSrc: { type: 'string', default: '' },
				imageUrl: { type: 'string', default: '' },
				linkUrl: { type: 'string', default: '' },
				songName: { type: 'string', default: '' },
				artistName: { type: 'string', default: '' },
				description: { type: 'string', default: '' }
			},
			edit: function ( props ) {
				var a = props.attributes;
				var blockProps = useBlockProps ? useBlockProps( { className: 'column-article-youtube-editor' } ) : {};
				var typeOpts = [
					{ value: 'iframe', label: __( 'iframe（埋め込み）', 'rakutenmusic-theme' ) },
					{ value: 'image', label: __( '画像リンク', 'rakutenmusic-theme' ) }
				];
				var imgUrl = ( a.imageUrl && a.imageUrl.trim() ) ? a.imageUrl.trim() : '';
				if ( imgUrl && imgUrl.indexOf( '/assets/' ) === 0 && typeof rakutenmusicColumnArchive !== 'undefined' && rakutenmusicColumnArchive.assetsUri ) {
					imgUrl = rakutenmusicColumnArchive.assetsUri + imgUrl.slice( 7 );
				}
				var isIframe = ( a.videoType || 'iframe' ) === 'iframe';
				var hasVideo = isIframe ? ( a.iframeSrc && a.iframeSrc.trim() ) : !! imgUrl;
				return el( wp.element.Fragment, null,
					el( InspectorControls, null,
						el( PanelBody, { title: __( 'YouTubeエリア', 'rakutenmusic-theme' ), initialOpen: true },
							el( SelectControl, {
								label: __( '表示タイプ', 'rakutenmusic-theme' ),
								value: a.videoType || 'iframe',
								options: typeOpts,
								onChange: function ( v ) { props.setAttributes( { videoType: v || 'iframe' } ); }
							} ),
							( a.videoType || 'iframe' ) === 'iframe' && el( TextControl, {
								label: __( 'iframeのsrc（YouTube埋め込みURL）', 'rakutenmusic-theme' ),
								value: a.iframeSrc || '',
								onChange: function ( v ) { props.setAttributes( { iframeSrc: v || '' } ); }
							} ),
							( a.videoType || '' ) === 'image' && el( TextControl, {
								label: __( '画像URL', 'rakutenmusic-theme' ),
								value: a.imageUrl || '',
								onChange: function ( v ) { props.setAttributes( { imageUrl: v || '' } ); }
							} ),
							( a.videoType || '' ) === 'image' && el( TextControl, {
								label: __( 'リンクURL', 'rakutenmusic-theme' ),
								value: a.linkUrl || '',
								onChange: function ( v ) { props.setAttributes( { linkUrl: v || '' } ); }
							} )
						),
						el( PanelBody, { title: __( '楽曲名・説明', 'rakutenmusic-theme' ), initialOpen: true },
							el( TextControl, {
								label: __( '楽曲名', 'rakutenmusic-theme' ),
								value: a.songName || '',
								onChange: function ( v ) { props.setAttributes( { songName: v || '' } ); }
							} ),
							el( TextControl, {
								label: __( 'アーティスト名', 'rakutenmusic-theme' ),
								value: a.artistName || '',
								onChange: function ( v ) { props.setAttributes( { artistName: v || '' } ); }
							} ),
							el( TextareaControl, {
								label: __( '説明文', 'rakutenmusic-theme' ),
								value: a.description || '',
								onChange: function ( v ) { props.setAttributes( { description: v || '' } ); }
							} )
						)
					),
					el( 'div', blockProps,
						el( 'div', { className: 'video-article-block' },
							el( 'div', { className: 'video-area' },
								hasVideo ? ( isIframe ? el( 'iframe', {
									src: a.iframeSrc.trim(),
									title: 'YouTube',
									style: { width: '100%', maxWidth: 560, height: 315, border: 0 }
								} ) : el( 'a', { href: a.linkUrl.trim() || '#', target: '_blank', rel: 'noopener' },
									el( 'img', { src: imgUrl, alt: a.songName || '' } )
								) ) : el( 'div', { style: { background: '#eee', aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', fontSize: 14 } }, __( '動画を設定', 'rakutenmusic-theme' ) )
							),
							el( 'div', { className: 'video-desc-area' },
								el( 'div', { className: 'video-name-group' },
									el( 'span', { className: 'song-name' }, a.songName || __( '楽曲名', 'rakutenmusic-theme' ) ),
									el( 'p', { className: 'artist-name' }, a.artistName || '' )
								),
								el( 'div', { className: 'video-artist-desc' }, a.description || '' )
							)
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
