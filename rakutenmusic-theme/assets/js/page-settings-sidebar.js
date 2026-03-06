/**
 * ブロックエディタ：ページ設定をサイドバー（ドキュメント設定）に表示し、保存時にメタを送信する
 */
(function () {
	'use strict';

	function getPanelComponent() {
		var el = wp.element.createElement;
		var Fragment = wp.element.Fragment;
		var PluginDocumentSettingPanel = wp.editPost.PluginDocumentSettingPanel;
		var useSelect = wp.data.useSelect;
		var useDispatch = wp.data.useDispatch;
		var TextControl = wp.components.TextControl;
		var TextareaControl = wp.components.TextareaControl;
		var CheckboxControl = wp.components.CheckboxControl;
		var __ = wp.i18n.__;

		var META_TITLE = 'rakutenmusic_page_meta_title';
		var META_DESCRIPTION = 'rakutenmusic_page_meta_description';
		var META_HEADER = 'rakutenmusic_page_header_meta';
		var META_HEADER_SCRIPTS = 'rakutenmusic_page_header_scripts';
		var META_BODY_SCRIPTS = 'rakutenmusic_page_body_footer_scripts';
		var META_EXCLUDE_FEED = 'rakutenmusic_page_exclude_from_feed';

		return function PageSettingsPanel() {
			var meta = useSelect( function ( select ) {
				return select( 'core/editor' ).getEditedPostAttribute( 'meta' ) || {};
			}, [] );
			var editPost = useDispatch( 'core/editor' ).editPost;

			var metaTitle = ( meta[ META_TITLE ] !== undefined ? meta[ META_TITLE ] : '' ) || '';
			var metaDescription = ( meta[ META_DESCRIPTION ] !== undefined ? meta[ META_DESCRIPTION ] : '' ) || '';
			var headerMeta = ( meta[ META_HEADER ] !== undefined ? meta[ META_HEADER ] : '' ) || '';
			var headerScripts = ( meta[ META_HEADER_SCRIPTS ] !== undefined ? meta[ META_HEADER_SCRIPTS ] : '' ) || '';
			var bodyScripts = ( meta[ META_BODY_SCRIPTS ] !== undefined ? meta[ META_BODY_SCRIPTS ] : '' ) || '';
			var excludeFeed = ( meta[ META_EXCLUDE_FEED ] === '1' || meta[ META_EXCLUDE_FEED ] === 'yes' );

			function setMeta( key, value ) {
				editPost( { meta: { [ key ]: value } } );
			}

			return el(
				PluginDocumentSettingPanel,
				{ name: 'rakutenmusic-page-settings', title: __( 'ページ設定', 'rakutenmusic-theme' ), className: 'rakutenmusic-page-settings-panel' },
				el( TextControl, {
					label: __( 'Metaタイトル', 'rakutenmusic-theme' ),
					value: metaTitle,
					onChange: function ( v ) { setMeta( META_TITLE, v || '' ); },
					help: __( '未入力の場合は投稿タイトルが使用されます。<title>タグに反映されます。', 'rakutenmusic-theme' )
				} ),
				el( TextareaControl, {
					label: __( 'Meta Description', 'rakutenmusic-theme' ),
					value: metaDescription,
					onChange: function ( v ) { setMeta( META_DESCRIPTION, v || '' ); },
					help: __( '検索エンジンの検索結果に表示される説明文です。', 'rakutenmusic-theme' ),
					rows: 3
				} ),
				el( TextareaControl, {
					label: __( 'ヘッダーに追加するHTML（metaタグなど・複数可）', 'rakutenmusic-theme' ),
					value: headerMeta,
					onChange: function ( v ) { setMeta( META_HEADER, v || '' ); },
					help: __( '<head>内にそのまま出力されます。', 'rakutenmusic-theme' ),
					rows: 4
				} ),
				el( TextareaControl, {
					label: __( 'ヘッダーに追加するJavaScript/CSS', 'rakutenmusic-theme' ),
					value: headerScripts,
					onChange: function ( v ) { setMeta( META_HEADER_SCRIPTS, v || '' ); },
					help: __( '<head>末尾に出力されます。', 'rakutenmusic-theme' ),
					rows: 4
				} ),
				el( TextareaControl, {
					label: __( 'body 末尾に追加するJavaScript', 'rakutenmusic-theme' ),
					value: bodyScripts,
					onChange: function ( v ) { setMeta( META_BODY_SCRIPTS, v || '' ); },
					help: __( '</body>直前に出力されます。', 'rakutenmusic-theme' ),
					rows: 4
				} ),
				el( CheckboxControl, {
					label: __( '検索エンジンに引っ掛からなくようにする（Exclude From atom.xml）', 'rakutenmusic-theme' ),
					help: __( 'チェックを入れた場合、RSS・Atom フィードに含めません。', 'rakutenmusic-theme' ),
					checked: excludeFeed,
					onChange: function ( checked ) { setMeta( META_EXCLUDE_FEED, checked ? '1' : '0' ); }
				} )
			);
		};
	}

	function init() {
		if ( typeof wp === 'undefined' || ! wp.plugins || ! wp.editPost || ! wp.data || ! wp.element || ! wp.components ) {
			setTimeout( init, 50 );
			return;
		}
		wp.plugins.registerPlugin( 'rakutenmusic-page-settings', {
			render: function () {
				return wp.element.createElement( getPanelComponent() );
			}
		} );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}
})();
