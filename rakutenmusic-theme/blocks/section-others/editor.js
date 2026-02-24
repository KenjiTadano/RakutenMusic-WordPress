(function () {
  'use strict';

  var BLOCK_NAME = 'rakutenmusic/rakuten-music-section-others';

  var DEFAULT_ITEMS = [
    { link: '/column/archive/10/?scid=wi_msc_topslider_90sartist', imageUrl: 'https://music.rakuten.co.jp/assets/column/img/10/bnr/600x200.png', imageAlt: '特集_90年代渋谷系アーティスト', title: '特集_90年代渋谷系アーティスト -' },
    { link: 'https://books.rakuten.co.jp/event/okaimonopanda/2512/?scid=wi_rcc_pandacp_music', imageUrl: 'https://music.rakuten.co.jp/assets/top/img/bnr/20251201_panda_600x200.jpg', imageAlt: '【楽天ブックス】みんなでハグ得！スペシャルプレゼントキャンペーン', title: '【楽天ブックス】みんなでハグ得！スペシャルプレゼントキャンペーン', target: '_blank' },
    { link: 'https://music.rakuten.co.jp/news/award/seasonal/2025/year/?scid=wi_msc_topslider_award_ranking_2025', imageUrl: 'https://music.rakuten.co.jp/assets/news/award/seasonal/2025/year/img/bnr/600x200.png', imageAlt: '2025年年間ランキング', title: '2025年年間ランキング' },
    { link: 'https://www.rakuten-card.co.jp/campaign/rakuten_card/app/', imageUrl: 'https://www.rakuten-card.co.jp/assets/top/img/bnr/20250630_card_165x100.png', imageAlt: '【楽天カード】新規入会でポイント進呈！', title: '', target: '_blank' },
    { link: '/column/archive/?scid=wi_msc_topslider_music-guide_archive', imageUrl: 'https://music.rakuten.co.jp/assets/column/img/common/bnr/600x200.png', imageAlt: '読む音楽ガイド -新しい発見がここに-', title: '読む音楽ガイド -新しい発見がここに-' },
    { link: '/news/podcast/kpop-2plus1/', imageUrl: 'https://music.rakuten.co.jp/assets/news/podcast/kpop-2plus1/img/bnr/kpop2plus1_600x200.png', imageAlt: 'K-POP 2+1', title: '【Rakuten Musicオリジナルポッドキャスト】K-POP 2+1' }
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

  function registerOthersBlock() {
    if ( typeof wp === 'undefined' || ! wp.blocks ) {
      return;
    }
    if ( ! wp.blockEditor || ! wp.components ) {
      setTimeout( registerOthersBlock, 50 );
      return;
    }

    var el = wp.element.createElement;
    var useBlockProps = wp.blockEditor.useBlockProps;
    var InspectorControls = wp.blockEditor.InspectorControls;
    var PanelBody = wp.components.PanelBody;
    var TextControl = wp.components.TextControl;
    var Button = wp.components.Button;
    var __ = wp.i18n.__;

    try {
      wp.blocks.unregisterBlockType( BLOCK_NAME );
    } catch ( e ) {}

    wp.blocks.registerBlockType( BLOCK_NAME, {
      title: __( 'その他キャンペーン', 'rakutenmusic-theme' ),
      category: 'rakutenmusic',
      icon: 'align-wide',
      description: __( '楽天ミュージック汎用テンプレート用セクション: その他キャンペーン（スライダー・リスト編集可能）', 'rakutenmusic-theme' ),
      attributes: {
        items: { type: 'string', default: '' }
      },
      edit: function (props) {
        var attrs = props.attributes;
        var itemsAttr = attrs.items || '';
        var list = getItemsList(itemsAttr);
        var blockProps = useBlockProps ? useBlockProps({ className: 'top-section-others top-section-others--editor' }) : { className: 'top-section-others top-section-others--editor' };

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
              { title: __('その他キャンペーン', 'rakutenmusic-theme'), initialOpen: true },
              list.map(function (item, i) {
                return el(
                  'div',
                  { key: i, className: 'others-editor__row', style: { marginBottom: '12px', padding: '10px', background: '#f9f9f9', borderRadius: '4px' } },
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
            Object.assign({}, blockProps, { id: 'top-section-others', className: 'bg-light top-section-others--editor' }),
            el('div', { className: 'bg-light-txt font-rakuten-b' }, 'OTHERS'),
            el('div', { className: 'ttl-group' },
              el('sub', { className: 'font-rakuten-b' }, 'OTHERS'),
              el('h2', null, __('その他キャンペーンや', 'rakutenmusic-theme'), el('br', null), __('リリース情報など', 'rakutenmusic-theme'))
            ),
            el('div', { className: 'splide cp-for-newsubscriber others-editor-preview' },
              el('div', { className: 'splide__track' },
                el('ul', { className: 'splide__list' },
                  list.map(function (item, i) {
                    var imgSrc = item.imageUrl && item.imageUrl.trim() ? item.imageUrl : 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="80" viewBox="0 0 200 80"%3E%3Crect fill="%23eee" width="200" height="80"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23999" font-size="12"%3E画像%3C/text%3E%3C/svg%3E';
                    return el(
                      'li',
                      { key: i, className: 'splide__slide' },
                      el('a', { href: item.link || '#', target: item.target === '_blank' ? '_blank' : null, rel: item.target === '_blank' ? 'noopener noreferrer' : null, style: { display: 'block' } },
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
    wp.domReady( registerOthersBlock );
  } else if ( typeof document !== 'undefined' && document.readyState === 'loading' ) {
    document.addEventListener( 'DOMContentLoaded', registerOthersBlock );
  } else {
    registerOthersBlock();
  }
})();
