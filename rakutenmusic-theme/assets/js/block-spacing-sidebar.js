/**
 * 全 rakutenmusic ブロックの右サイドバーに「余白」パネル（上余白・下余白）を表示
 * 記事ブロックと同じ SelectControl（なし / 小〜特大）で統一
 * editor.BlockEdit で注入するため、JS で registerBlockType するブロック（キャンペーン詳細テーブル等）でも確実に表示される
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
		// 属性は PHP で付与されるが、JS のみで登録されるブロック用にクライアントでも追加
		settings.attributes = settings.attributes || {};
		settings.attributes.spacingTop = settings.attributes.spacingTop || { type: 'string', default: '' };
		settings.attributes.spacingBottom = settings.attributes.spacingBottom || { type: 'string', default: '' };
		// コアのマージン UI を出さない（余白パネルのみ使う）
		settings.supports = settings.supports || {};
		settings.supports.spacing = settings.supports.spacing || {};
		settings.supports.spacing.margin = false;
		return settings;
	}

	function filterBlockEdit( BlockEdit ) {
		return function ( props ) {
			var el = wp.element.createElement;
			var Fragment = wp.element.Fragment;
			if ( props.name && props.name.indexOf( 'rakutenmusic/' ) === 0 ) {
				return el(
					Fragment,
					null,
					createSpacingPanel( props ),
					el( BlockEdit, props )
				);
			}
			return el( BlockEdit, props );
		};
	}

	function init() {
		if ( typeof wp === 'undefined' || ! wp.hooks || ! wp.blockEditor || ! wp.element ) {
			setTimeout( init, 50 );
			return;
		}
		// ブロック種別登録時: 属性・supports を付与（JS のみで登録されるブロック用）
		wp.hooks.addFilter(
			'blocks.registerBlockType',
			'rakutenmusic/block-spacing-register',
			filterRegisterBlockType
		);
		// 選択時: 余白パネルを確実に表示（registerBlockType の実行順に依存しない）
		wp.hooks.addFilter(
			'editor.BlockEdit',
			'rakutenmusic/block-spacing-inspector',
			filterBlockEdit
		);
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}
})();
