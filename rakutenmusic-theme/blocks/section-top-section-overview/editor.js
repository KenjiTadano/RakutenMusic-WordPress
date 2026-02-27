(function () {
  'use strict';

  var BLOCK_NAME = 'rakutenmusic/rakuten-music-section-top-section-overview';

  function registerOverviewBlock() {
    if (typeof wp === 'undefined' || !wp.blocks) return false;
    if (!wp.blockEditor || !wp.components) return false;

    var el = wp.element.createElement;
    var useBlockProps = wp.blockEditor.useBlockProps;
    var InspectorControls = wp.blockEditor.InspectorControls;
    var PanelBody = wp.components.PanelBody;
    var TextControl = wp.components.TextControl;
    var __ = wp.i18n.__;

    var DEFAULT_APP_STORE_URL = 'https://music.rakuten.co.jp/link/app/app_inflow.html';

    try {
      wp.blocks.unregisterBlockType(BLOCK_NAME);
    } catch (e) {}

    wp.blocks.registerBlockType(BLOCK_NAME, {
      title: __('バンドル：OVERVIEW', 'rakutenmusic-theme'),
      category: 'rakutenmusic',
      icon: 'visibility',
      description: __('バンドルプラン：OVERVIEW セクション（バンドルとは）', 'rakutenmusic-theme'),
      attributes: {
        app_qr_url: { type: 'string', default: '' },
        app_store_url: { type: 'string', default: DEFAULT_APP_STORE_URL }
      },
      edit: function (props) {
        var attrs = props.attributes;
        var app_qr_url = attrs.app_qr_url || '';
        var app_store_url = attrs.app_store_url || '';
        var blockProps = useBlockProps ? useBlockProps({ className: 'section-top-section-overview-editor' }) : { className: 'section-top-section-overview-editor' };

        return el(
          wp.element.Fragment,
          null,
          el(
            InspectorControls,
            null,
            el(
              PanelBody,
              { title: __('アプリをダウンロードボタン', 'rakutenmusic-theme'), initialOpen: true },
              el(TextControl, {
                label: __('QRコード画像URL（PC時モーダル用）', 'rakutenmusic-theme'),
                value: app_qr_url,
                onChange: function (v) { props.setAttributes({ app_qr_url: v || '' }); },
                help: __('PC表示時、ボタンクリックでこのQRコードをモーダル表示します。', 'rakutenmusic-theme')
              }),
              el(TextControl, {
                label: __('ストアリンクURL（スマホ時）', 'rakutenmusic-theme'),
                value: app_store_url,
                onChange: function (v) { props.setAttributes({ app_store_url: v || '' }); },
                placeholder: DEFAULT_APP_STORE_URL,
                help: __('スマホ表示時、ボタンクリックでこのURLへ遷移します。', 'rakutenmusic-theme')
              })
            )
          ),
          el(
            'div',
            blockProps,
            el('div', { className: 'section-overview-editor-placeholder', style: { padding: '20px', background: '#f0f0f0', borderRadius: '4px', textAlign: 'center' } },
              el('strong', null, 'バンドル：OVERVIEW'),
              el('p', { style: { margin: '8px 0 0', fontSize: '13px', color: '#666' } },
                __('「アプリをダウンロード」ボタンの設定は右のサイドバーで行えます。', 'rakutenmusic-theme')
            )
          )
        );
      },
      save: function () {
        return null;
      }
    });
    return true;
  }

  function tryRun() {
    if (registerOverviewBlock()) return true;
    var attempts = 0;
    var id = setInterval(function () {
      if (registerOverviewBlock() || attempts++ > 100) clearInterval(id);
    }, 50);
    return false;
  }

  // section-blocks-edit の後に読み込まれるため、OVERVIEW をサイドバー付き edit で上書き
  setTimeout(tryRun, 0);
})();
