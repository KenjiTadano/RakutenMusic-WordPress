/**
 * 全 rakutenmusic ブロックの右サイドバーに「余白」パネル（上余白・下余白）を表示
 * 記事ブロックと同じ SelectControl（なし / 小〜特大）で統一
 * registerBlockType で edit をラップするため、editorScript のないライトプラン等でも確実に表示される
 * 今後新規作成するブロックも name が rakutenmusic/ で始まればデフォルトで余白パネルが表示される（追加実装不要）
 */
(function () {
	'use strict';

	var SPACING_OPTS = [
		{ value: '', label: 'なし' },
		{ value: '8px', label: '小 (8px)' },
		{ value: '16px', label: '中 (16px)' },
		{ value: '24px', label: '大 (24px)' },
		{ value: '32px', label: '特大 (32px)' }
	];

	function createSpacingPanel( props ) {
		var el = wp.element.createElement;
		var InspectorControls = wp.blockEditor.InspectorControls;
		var PanelBody = wp.components.PanelBody;
		var SelectControl = wp.components.SelectControl;
		var __ = wp.i18n.__;
		var attrs = props.attributes || {};
		var spacingTop = attrs.spacingTop !== undefined ? attrs.spacingTop : '';
		var spacingBottom = attrs.spacingBottom !== undefined ? attrs.spacingBottom : '';
		var opts = SPACING_OPTS.map( function ( o ) {
			return { value: o.value, label: __( o.label, 'rakutenmusic-theme' ) };
		} );
		return el(
			InspectorControls,
			{ key: 'rakutenmusic-spacing' },
			el(
				PanelBody,
				{ title: __( '余白', 'rakutenmusic-theme' ), initialOpen: true },
				el( SelectControl, {
					label: __( '上余白', 'rakutenmusic-theme' ),
					value: spacingTop || '',
					options: opts,
					onChange: function ( v ) { props.setAttributes( { spacingTop: v || '' } ); }
				} ),
				el( SelectControl, {
					label: __( '下余白', 'rakutenmusic-theme' ),
					value: spacingBottom || '',
					options: opts,
					onChange: function ( v ) { props.setAttributes( { spacingBottom: v || '' } ); }
				} )
			)
		);
	}

	function filterRegisterBlockType( settings, blockName ) {
		if ( ! blockName || blockName.indexOf( 'rakutenmusic/' ) !== 0 ) {
			return settings;
		}
		var originalEdit = settings.edit;
		if ( typeof originalEdit !== 'function' ) {
			return settings;
		}
		var el = wp.element.createElement;
		var Fragment = wp.element.Fragment;
		settings.attributes = settings.attributes || {};
		settings.attributes.spacingTop = settings.attributes.spacingTop || { type: 'string', default: '' };
		settings.attributes.spacingBottom = settings.attributes.spacingBottom || { type: 'string', default: '' };
		settings.edit = function ( props ) {
			return el(
				Fragment,
				null,
				createSpacingPanel( props ),
				originalEdit( props )
			);
		};
		return settings;
	}

	function init() {
		if ( typeof wp === 'undefined' || ! wp.hooks || ! wp.blockEditor || ! wp.element ) {
			setTimeout( init, 50 );
			return;
		}
		// registerBlockType のみで余白パネルを1回だけ追加（editor.BlockEdit でも追加すると二重表示になるため使用しない）
		wp.hooks.addFilter(
			'blocks.registerBlockType',
			'rakutenmusic/block-spacing-register',
			filterRegisterBlockType
		);
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}
})();
