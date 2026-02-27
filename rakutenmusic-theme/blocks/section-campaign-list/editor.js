(function () {
  'use strict';

  var BLOCK_NAME = 'rakutenmusic/rakuten-music-section-campaign-list';

  function registerCampaignListBlock() {
    if ( typeof wp === 'undefined' || ! wp.blocks ) {
      return;
    }
    if ( ! wp.blockEditor || ! wp.components ) {
      setTimeout( registerCampaignListBlock, 50 );
      return;
    }

    var el = wp.element.createElement;
    var useBlockProps = wp.blockEditor.useBlockProps;
    var InspectorControls = wp.blockEditor.InspectorControls;
    var PanelBody = wp.components.PanelBody;
    var TextControl = wp.components.TextControl;
    var Button = wp.components.Button;
    var __ = wp.i18n.__;

    var DEFAULT_ITEMS = [
    { link: 'https://music.rakuten.co.jp/link/album/32444014?scid=wi_msc_topslider_kawaiilab', imageUrl: '//music.r10s.jp/external/prod/assets/top/img/bnr/20260211_KAWAIILAB_600x200.png', imageAlt: 'Rakuten Musicにて「KAWAII LAB. BEST ALBUM」を全曲再生した方から抽選で10名様に、楽天ポイント1,000ポイント進呈', title: 'KAWAII LAB.再生キャンペーン開催中！' },
    { link: '/campaign/2026/annual-plan-campaign/', imageUrl: '//music.r10s.jp/external/prod/assets/campaign/2026/annual-plan-campaign/img/bnr/600x200.png', imageAlt: '年額スタンダード　初回課金で半額分ポイント還元', title: '年額スタンダード　初回課金で半額分ポイント還元' },
    { link: '/campaign/referral/', imageUrl: '//music.r10s.jp/external/prod/assets/campaign/referral/img/bnr/20250324/600x200.png', imageAlt: '友達紹介キャンペーン', title: '友達紹介キャンペーン' },
    { link: '/campaign/2025/referral_bundle/', imageUrl: '//music.r10s.jp/external/prod/assets/campaign/2025/referral_bundle/img/bnr/600x200.png', imageAlt: 'バンドルプラン紹介キャンペーン', title: 'バンドルプラン紹介キャンペーン' },
    { link: '/campaign/group/bank/', imageUrl: '//music.r10s.jp/external/prod/assets/campaign/group/bank/img/20240228/600x200_music.png', imageAlt: '【楽天銀行をご利用のお客様】新規入会+1回目のお支払いで250ポイント', title: '【楽天銀行をご利用のお客様】新規入会+1回目のお支払いで250ポイント' },
    { link: 'https://music.rakuten.co.jp/link/album/32436069/?scid=wi_msc_topslider_snowman_stars', imageUrl: '//music.r10s.jp/external/prod/assets/top/img/bnr/20260202_SnowMan_STARS_600x200.png', imageAlt: 'Snow Man「STARS」配信開始！', title: 'Snow Man「STARS」配信開始！' },
    { link: 'https://event.rakuten.co.jp/group/collab/mnoreferral_books/?scid=wi_msc_campaignbannerlist', imageUrl: '//music.r10s.jp/external/prod/assets/top/img/bnr/20250530_books_600x200.png', imageAlt: '【楽天ブックス】楽天モバイルの紹介キャンペーン拡散でクーポン進呈', title: '【楽天ブックス】楽天モバイルの紹介キャンペーン拡散でクーポン進呈', target: '_blank' }
  ];

  function getItemsList(itemsAttr) {
    if (!itemsAttr || itemsAttr === '[]') return DEFAULT_ITEMS.slice();
    try {
      var parsed = JSON.parse(itemsAttr);
      return Array.isArray(parsed) && parsed.length ? parsed : DEFAULT_ITEMS.slice();
    } catch (e) {
      return DEFAULT_ITEMS.slice();
    }
  }

  try {
    wp.blocks.unregisterBlockType( BLOCK_NAME );
  } catch ( e ) {}

  wp.blocks.registerBlockType( BLOCK_NAME, {
    title: __( 'キャンペーンリスト（一覧）', 'rakutenmusic-theme' ),
    category: 'rakutenmusic',
    icon: 'list-view',
    description: __( '開催中のお得なキャンペーン一覧（リスト数・順番・バナーURL/alt・タイトルを編集可能）', 'rakutenmusic-theme' ),
    attributes: {
      items: { type: 'string', default: '' }
    },
    edit: function (props) {
      var attrs = props.attributes;
      var itemsAttr = attrs.items || '';
      var list = getItemsList(itemsAttr);
      var blockProps = useBlockProps ? useBlockProps({ className: 's-campaign-list s-campaign-list--editor' }) : { className: 's-campaign-list s-campaign-list--editor' };

      function setList(newList) {
        props.setAttributes({ items: JSON.stringify(newList) });
      }

      function updateItem(i, key, value) {
        var next = list.slice();
        next[i] = next[i] || {};
        next[i][key] = value;
        setList(next);
      }

      function addItem() {
        setList(list.concat([{ link: '#', imageUrl: '', imageAlt: '', title: '' }]));
      }

      function removeItem(i) {
        var next = list.filter(function (_, idx) { return idx !== i; });
        setList(next.length ? next : [{ link: '#', imageUrl: '', imageAlt: '', title: '' }]);
      }

      function moveItem(i, delta) {
        var j = i + delta;
        if (j < 0 || j >= list.length) return;
        var next = list.slice();
        var t = next[i];
        next[i] = next[j];
        next[j] = t;
        setList(next);
      }

      return el(
        wp.element.Fragment,
        null,
        el(
          InspectorControls,
          { key: 'inspector' },
          el(
            PanelBody,
            { title: __('キャンペーンリスト', 'rakutenmusic-theme'), initialOpen: true },
            list.map(function (item, i) {
              return el(
                'div',
                { key: i, className: 'campaign-list-editor__row', style: { marginBottom: '12px', padding: '10px', background: '#f9f9f9', borderRadius: '4px' } },
                el('div', { style: { fontWeight: 'bold', marginBottom: '6px' } }, __('項目', 'rakutenmusic-theme') + ' ' + (i + 1)),
                el(TextControl, {
                  label: __('リンクURL', 'rakutenmusic-theme'),
                  value: item.link || '',
                  onChange: function (v) { updateItem(i, 'link', v); }
                }),
                el(TextControl, {
                  label: __('バナーURL', 'rakutenmusic-theme'),
                  value: item.imageUrl || '',
                  onChange: function (v) { updateItem(i, 'imageUrl', v); }
                }),
                el(TextControl, {
                  label: __('バナーalt', 'rakutenmusic-theme'),
                  value: item.imageAlt || '',
                  onChange: function (v) { updateItem(i, 'imageAlt', v); }
                }),
                el(TextControl, {
                  label: __('タイトル', 'rakutenmusic-theme'),
                  value: item.title || '',
                  onChange: function (v) { updateItem(i, 'title', v); }
                }),
                el('div', { style: { marginTop: '6px', display: 'flex', gap: '4px', flexWrap: 'wrap' } },
                  el(Button, { isSmall: true, variant: 'secondary', onClick: function () { moveItem(i, -1); }, disabled: i === 0 }, '↑'),
                  el(Button, { isSmall: true, variant: 'secondary', onClick: function () { moveItem(i, 1); }, disabled: i === list.length - 1 }, '↓'),
                  el(Button, { isSmall: true, variant: 'secondary', isDestructive: true, onClick: function () { removeItem(i); } }, __('削除', 'rakutenmusic-theme'))
                )
              );
            }),
            el('div', { style: { marginTop: '8px' } },
              el(Button, { isPrimary: true, onClick: addItem }, __('＋ リストを追加', 'rakutenmusic-theme'))
            )
          )
        ),
        el(
          'section',
          blockProps,
          el('div', { className: 'l-inner' },
            el('h2', { className: 'heading heading--m' }, __('開催中のお得なキャンペーン', 'rakutenmusic-theme')),
            el('ul', { className: 'campaign-list campaign-list--sp-s campaign-list--editor-preview' },
              list.map(function (item, i) {
                var imgSrc = item.imageUrl && item.imageUrl.trim() ? item.imageUrl : 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="80" viewBox="0 0 200 80"%3E%3Crect fill="%23eee" width="200" height="80"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23999" font-size="12"%3E画像%3C/text%3E%3C/svg%3E';
                return el(
                  'li',
                  { key: i, className: 'campaign__item' },
                  el('div', { className: 'campaign__card' },
                    el('figure', { className: 'campaign__image' },
                      el('img', { src: imgSrc, alt: item.imageAlt || '', style: { maxWidth: '100%', height: 'auto', display: 'block' } }),
                      el('figcaption', { className: 'campaign__title' }, item.title || __('（タイトル未設定）', 'rakutenmusic-theme'))
                    )
                  )
                );
              })
            )
          )
        )
      );
    },
    save: function () {
      return null;
    }
  });
  }

  if ( typeof wp !== 'undefined' && wp.domReady ) {
    wp.domReady( registerCampaignListBlock );
  } else if ( typeof document !== 'undefined' && document.readyState === 'loading' ) {
    document.addEventListener( 'DOMContentLoaded', registerCampaignListBlock );
  } else {
    registerCampaignListBlock();
  }
})();
