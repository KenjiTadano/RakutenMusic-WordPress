(function () {
	'use strict';
	var BLOCK_NAME = 'rakutenmusic/column-article-badge';
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
		try { wp.blocks.unregisterBlockType( BLOCK_NAME ); } catch ( e ) {}
		wp.blocks.registerBlockType( BLOCK_NAME, {
			title: __( '記事：バッジ', 'rakutenmusic-theme' ),
			category: 'rakutenmusic',
			icon: 'tag',
			attributes: { badge: { type: 'string', default: 'feature' } },
			edit: function ( props ) {
				var a = props.attributes;
				var blockProps = useBlockProps ? useBlockProps( {
					style: ( a.spacingTop || a.spacingBottom ) ? { marginTop: a.spacingTop || undefined, marginBottom: a.spacingBottom || undefined } : undefined
				} ) : {};
				var opts = [
					{ value: 'feature', label: '特集 (#0099FF)' },
					{ value: 'column', label: 'コラム (#EC0606)' },
					{ value: 'interview', label: 'インタビュー (#F59600)' },
					{ value: 'ranking', label: 'ランキング (#009500)' }
				];
				var spacingOpts = [
					{ value: '', label: __( 'なし', 'rakutenmusic-theme' ) },
					{ value: '8px', label: __( '小 (8px)', 'rakutenmusic-theme' ) },
					{ value: '16px', label: __( '中 (16px)', 'rakutenmusic-theme' ) },
					{ value: '24px', label: __( '大 (24px)', 'rakutenmusic-theme' ) },
					{ value: '32px', label: __( '特大 (32px)', 'rakutenmusic-theme' ) }
				];
				return el( wp.element.Fragment, null,
					el( InspectorControls, null,
						el( PanelBody, { title: __( 'バッジ', 'rakutenmusic-theme' ), initialOpen: true },
							el( SelectControl, {
								label: __( '種類', 'rakutenmusic-theme' ),
								value: a.badge || 'feature',
								options: opts,
								onChange: function ( v ) { props.setAttributes( { badge: v || 'feature' } ); }
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
							el( 'div', { className: 'tags' },
								el( 'div', { className: a.badge || 'feature' },
									opts.find( function ( o ) { return o.value === ( a.badge || 'feature' ); } ).label.split( ' ' )[0]
								)
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
