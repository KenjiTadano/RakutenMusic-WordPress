(function () {
	'use strict';
	var BLOCK_NAME = 'rakutenmusic/column-article-author-start';
	function dateToInputValue( str ) {
		if ( ! str || typeof str !== 'string' ) return '';
		str = str.trim().replace( /\//g, '-' );
		var m = str.match( /^(\d{4})-(\d{1,2})-(\d{1,2})$/ );
		if ( m ) return m[1] + '-' + m[2].padStart( 2, '0' ) + '-' + m[3].padStart( 2, '0' );
		if ( str.match( /^\d{4}-\d{2}-\d{2}$/ ) ) return str;
		return '';
	}
	function inputValueToDate( val ) {
		if ( ! val || typeof val !== 'string' ) return '';
		var parts = val.trim().split( '-' );
		if ( parts.length !== 3 ) return val;
		var y = parseInt( parts[0], 10 ), mo = parseInt( parts[1], 10 ), d = parseInt( parts[2], 10 );
		if ( isNaN( y ) || isNaN( mo ) || isNaN( d ) ) return val;
		return y + '/' + mo + '/' + d;
	}
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
		var CheckboxControl = wp.components.CheckboxControl;
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
			title: __( '記事：サイン情報', 'rakutenmusic-theme' ),
			category: 'rakutenmusic',
			icon: 'admin-users',
			attributes: {
				date: { type: 'string', default: '' },
				twitterHref: { type: 'string', default: '' },
				facebookHref: { type: 'string', default: '' },
				hideTwitter: { type: 'boolean', default: false },
				hideFacebook: { type: 'boolean', default: false }
			},
			edit: function ( props ) {
				var a = props.attributes;
				var blockProps = useBlockProps ? useBlockProps( {
					className: 'column-article-author-start-editor',
					style: ( a.spacingTop || a.spacingBottom ) ? { marginTop: a.spacingTop || undefined, marginBottom: a.spacingBottom || undefined } : undefined
				} ) : {};
				var assetsUri = ( typeof rakutenmusicColumnArchive !== 'undefined' && rakutenmusicColumnArchive.assetsUri ) ? rakutenmusicColumnArchive.assetsUri : '';
				var iconUrl = assetsUri ? assetsUri + '/column/img/common/icon.png' : '';
				return el( wp.element.Fragment, null,
					el( InspectorControls, null,
						el( PanelBody, { title: __( 'サイン情報', 'rakutenmusic-theme' ), initialOpen: true },
							el( 'div', { style: { marginBottom: 16 } },
								el( 'label', { style: { display: 'block', marginBottom: 4, fontWeight: 600 } }, __( '公開日', 'rakutenmusic-theme' ) ),
								el( 'input', {
									type: 'date',
									value: dateToInputValue( a.date ),
									onChange: function ( e ) { props.setAttributes( { date: inputValueToDate( e.target.value ) } ); },
									style: { width: '100%', padding: 8, boxSizing: 'border-box' }
								} )
							),
							el( TextControl, {
								label: __( 'X（Twitter）シェアURL', 'rakutenmusic-theme' ),
								value: a.twitterHref || '',
								onChange: function ( v ) { props.setAttributes( { twitterHref: v || '' } ); }
							} ),
							el( CheckboxControl, {
								label: __( 'Xボタンを表示しない', 'rakutenmusic-theme' ),
								checked: a.hideTwitter,
								onChange: function ( v ) { props.setAttributes( { hideTwitter: !! v } ); }
							} ),
							el( TextControl, {
								label: __( 'Facebook シェア用URL（data-href / リンク先）', 'rakutenmusic-theme' ),
								value: a.facebookHref || '',
								onChange: function ( v ) { props.setAttributes( { facebookHref: v || '' } ); }
							} ),
							el( CheckboxControl, {
								label: __( 'Facebookボタンを表示しない', 'rakutenmusic-theme' ),
								checked: a.hideFacebook,
								onChange: function ( v ) { props.setAttributes( { hideFacebook: !! v } ); }
							} )
						),
						el( PanelBody, { title: __( '余白', 'rakutenmusic-theme' ), initialOpen: false },
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
							el( 'div', { className: 'author-start' },
								el( 'div', { className: 'author-area' },
									iconUrl ? el( 'img', { className: 'author-img', height: 50, width: 50, src: iconUrl, alt: '' } ) : null,
									el( 'div', { className: 'author-desc' },
										el( 'span', null, __( '楽天ミュージック編集室', 'rakutenmusic-theme' ) ),
										el( 'div', { className: 'article-date' }, a.date || '—' )
									)
								),
								( ! a.hideTwitter && a.twitterHref ) || ( ! a.hideFacebook && a.facebookHref ) ? el( 'div', { className: 'sns-area' },
									! a.hideTwitter && a.twitterHref ? el( 'a', { href: a.twitterHref, className: 'twitter-share-button', rel: 'noopener', target: '_blank' }, 'Tweet' ) : null,
									! a.hideFacebook && a.facebookHref ? el( 'a', { href: '#', className: 'fb-xfbml-parse-ignore', style: { marginLeft: '8px' } }, __( 'シェアする', 'rakutenmusic-theme' ) ) : null
								) : null
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
