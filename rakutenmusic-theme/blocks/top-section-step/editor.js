(function () {
	'use strict';
	var BLOCK_NAME = 'rakutenmusic/top-section-step';
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
		var __ = wp.i18n.__;
		var fontSizeOptions = [
			{ value: '', label: 'デフォルト' },
			{ value: '16px', label: '16px' },
			{ value: '18px', label: '18px' },
			{ value: '20px', label: '20px' },
			{ value: '24px', label: '24px' },
			{ value: '28px', label: '28px' }
		];
		var weightOptions = [
			{ value: '', label: 'デフォルト' },
			{ value: '400', label: '400' },
			{ value: '700', label: '700' },
			{ value: '900', label: '900' }
		];
		wp.blocks.registerBlockType( BLOCK_NAME, {
			title: __( 'STEP（キャンペーン参加方法）', 'rakutenmusic-theme' ),
			category: 'rakutenmusic-common',
			icon: 'list-view',
			attributes: {
				summaryH3: { type: 'string', default: 'キャンペーンコードを入力すると<br><strong>初回30日間無料 → 90日間無料に!</strong>' },
				summaryH3FontSize: { type: 'string', default: '' },
				summaryH3Color: { type: 'string', default: '' },
				summaryH3StrongColor: { type: 'string', default: '' },
				summaryH3FontWeight: { type: 'string', default: '' },
				codeText: { type: 'string', default: 'gakusei90' }
			},
			edit: function ( props ) {
				var a = props.attributes;
				var blockProps = useBlockProps ? useBlockProps( { className: 'top-section-step-editor' } ) : { className: 'top-section-step-editor' };
				return el(
					wp.element.Fragment,
					null,
					el(
						InspectorControls,
						{ key: 'inspector' },
						el(
							PanelBody,
							{ title: __( 'summary-group（見出し）', 'rakutenmusic-theme' ), initialOpen: true },
							el( wp.components.SelectControl, {
								label: __( 'フォントサイズ', 'rakutenmusic-theme' ),
								value: a.summaryH3FontSize || '',
								options: fontSizeOptions,
								onChange: function ( v ) { props.setAttributes( { summaryH3FontSize: v || '' } ); }
							} ),
							el( wp.components.TextControl, {
								label: __( '文字色', 'rakutenmusic-theme' ),
								value: a.summaryH3Color || '',
								onChange: function ( v ) { props.setAttributes( { summaryH3Color: v || '' } ); },
								help: '例: #333 または transparent'
							} ),
							el( wp.components.TextControl, {
								label: __( 'strong部分の色', 'rakutenmusic-theme' ),
								value: a.summaryH3StrongColor || '',
								onChange: function ( v ) { props.setAttributes( { summaryH3StrongColor: v || '' } ); }
							} ),
							el( wp.components.SelectControl, {
								label: __( 'フォントの太さ', 'rakutenmusic-theme' ),
								value: a.summaryH3FontWeight || '',
								options: weightOptions,
								onChange: function ( v ) { props.setAttributes( { summaryH3FontWeight: v || '' } ); }
							} )
						),
						el(
							PanelBody,
							{ title: __( 'キャンペーンコード', 'rakutenmusic-theme' ), initialOpen: true },
							el( TextControl, {
								label: __( 'コード（.code）', 'rakutenmusic-theme' ),
								value: a.codeText || '',
								onChange: function ( v ) { props.setAttributes( { codeText: v || '' } ); }
							} )
						)
					),
					el( 'div', blockProps,
						el( 'div', { className: 'summary-group', style: {
							'--summary-h3-strong-color': a.summaryH3StrongColor || undefined
						} },
							el( 'h3', {
								style: {
									fontSize: a.summaryH3FontSize || undefined,
									color: a.summaryH3Color || undefined,
									fontWeight: a.summaryH3FontWeight || undefined
								}
							},
								el( RichText, {
									tagName: 'span',
									multiline: false,
									value: a.summaryH3,
									onChange: function ( v ) { props.setAttributes( { summaryH3: v } ); },
									placeholder: __( '見出しテキスト', 'rakutenmusic-theme' ),
									allowedFormats: [ 'core/bold', 'core/br' ]
								} )
							)
						),
						el( 'div', { className: 'ccode', style: { marginTop: '12px' } },
							el( 'p', { className: 'txt' }, __( 'キャンペーンコード', 'rakutenmusic-theme' ) ),
							el( 'p', { className: 'code', style: { fontFamily: 'monospace', padding: '8px', background: '#f5f5f5' } }, a.codeText || 'gakusei90' )
						),
						el( 'p', { style: { marginTop: '8px', fontSize: '12px', color: '#666' } }, __( '「コードをコピーする」ボタンはフロントで .code のテキストをコピーします。', 'rakutenmusic-theme' ) )
					)
				);
			},
			save: function () { return null; }
		} );
	}
	if ( document.readyState === 'loading' ) document.addEventListener( 'DOMContentLoaded', register );
	else register();
})();
