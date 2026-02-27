(function () {
  'use strict';

  var BLOCK_NAME = 'rakutenmusic/rakuten-music-section-campaign';

  function registerCampaignBlock() {
    if ( typeof wp === 'undefined' || ! wp.blocks ) {
      return;
    }
    if ( ! wp.blockEditor || ! wp.components ) {
      setTimeout( registerCampaignBlock, 50 );
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
      { link: '/campaign/2025/200point_winter/?scid=wi_msc_topslider_200point_winter', imageUrl: 'https://music.rakuten.co.jp/assets/campaign/2025/200point_winter/img/bnr/600x200.png', imageAlt: '新規入会200ポイントプレゼント！', title: '新規入会200ポイントプレゼント！' },
      { link: '/campaign/2024/timesale/?scid=wi_msc_topslider_timesale', imageUrl: 'https://music.rakuten.co.jp/assets/campaign/2024/timesale/img/bnr/600x200.png', imageAlt: '3か月間、毎月半額分ポイント還元！最大1,170ポイントプレゼントキャンペーン', title: '3か月間、毎月半額分ポイント還元キャンペーン' },
      { link: 'https://music.rakuten.co.jp/plan/bundle/?scid=wi_msc_topslider_bundle', imageUrl: 'https://music.rakuten.co.jp/assets/plan/bundle/img/20251101/600x200.png', imageAlt: 'エントリー＆バンドルプランを初めて利用された方にもれなく5ポイント進呈', title: 'バンドルプラン初回利用でもれなく5ポイント進呈' },
      { link: '/campaign/2025/referral_bundle/?scid=wi_msc_topslider_referral_bundle', imageUrl: 'https://music.rakuten.co.jp/assets/campaign/2025/referral_bundle/img/bnr/600x200.png', imageAlt: '人数制限なし！友達紹介するたびに10ポイントGET♪紹介された方にも10ポイントプレゼント！', title: 'バンドルプラン紹介キャンペーン' },
      { link: '/campaign/referral/?scid=wi_msc_topslider_refferal', imageUrl: 'https://music.rakuten.co.jp/assets/campaign/referral/img/bnr/20250324/600x200.png', imageAlt: '友達紹介で1,000ポイントGET♪紹介された方には60日無料クーポンコードプレゼント！', title: '友達紹介キャンペーン' },
      { link: '/campaign/group/bank/?scid=wi_msc_topslider_bank_100pt', imageUrl: 'https://music.rakuten.co.jp/assets/campaign/group/bank/img/20240228/600x200_music.png', imageAlt: '【楽天銀行をご利用のお客様】新規入会+1回目のお支払いで250ポイント', title: '【楽天銀行をご利用のお客様】新規入会+1回目のお支払いで250ポイント' }
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
      title: __( 'キャンペーン（スライダー）', 'rakutenmusic-theme' ),
      category: 'rakutenmusic',
      icon: 'align-wide',
      description: __( '楽天ミュージック汎用テンプレート用セクション: キャンペーン（スライダー・リスト編集可能）', 'rakutenmusic-theme' ),
      attributes: {
        items: { type: 'string', default: '' }
      },
      edit: function (props) {
        var attrs = props.attributes;
        var itemsAttr = attrs.items || '';
        var list = getItemsList(itemsAttr);
        var blockProps = useBlockProps ? useBlockProps({ className: 'top-section-campaign top-section-campaign--editor' }) : { className: 'top-section-campaign top-section-campaign--editor' };

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
              { title: __('キャンペーン', 'rakutenmusic-theme'), initialOpen: true },
              list.map(function (item, i) {
                return el(
                  'div',
                  { key: i, className: 'campaign-editor__row', style: { marginBottom: '12px', padding: '10px', background: '#f9f9f9', borderRadius: '4px' } },
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
            Object.assign({}, blockProps, { id: 'top-section-campaign', className: 'bg-dark top-section-campaign--editor' }),
            el('div', { className: 'bg-dark-txt font-rakuten-b' }, 'CAMPAIGN'),
            el('div', { className: 'ttl-group' },
              el('sub', { className: 'font-rakuten-b' }, 'CAMPAIGN'),
              el('h2', null, __('キャンペーン', 'rakutenmusic-theme'))
            ),
            el('div', { className: 'splide cp-for-newsubscriber campaign-editor-preview' },
              el('div', { className: 'splide__track' },
                el('ul', { className: 'splide__list' },
                  list.map(function (item, i) {
                    var imgSrc = item.imageUrl && item.imageUrl.trim() ? item.imageUrl : 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="80" viewBox="0 0 200 80"%3E%3Crect fill="%23eee" width="200" height="80"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23999" font-size="12"%3E画像%3C/text%3E%3C/svg%3E';
                    return el(
                      'li',
                      { key: i, className: 'splide__slide' },
                      el('a', { href: item.link || '#', style: { display: 'block' } },
                        el('img', { src: imgSrc, alt: item.imageAlt || '', style: { maxWidth: '100%', height: 'auto', display: 'block' } }),
                        el('p', { style: { margin: '0.5em 0 0', fontSize: '13px' } }, item.title || __('（タイトル未設定）', 'rakutenmusic-theme'))
                      )
                    );
                  })
                )
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
    wp.domReady( registerCampaignBlock );
  } else if ( typeof document !== 'undefined' && document.readyState === 'loading' ) {
    document.addEventListener( 'DOMContentLoaded', registerCampaignBlock );
  } else {
    registerCampaignBlock();
  }
})();
