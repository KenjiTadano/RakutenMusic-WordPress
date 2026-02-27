(function () {
  'use strict';

  var BLOCK_NAME = 'rakutenmusic/rakuten-music-section-groupservices';
  var themeUri = ( typeof window !== 'undefined' && window.rakutenmusicGroupServices && window.rakutenmusicGroupServices.themeUri ) ? window.rakutenmusicGroupServices.themeUri : '';

  function resolveImgSrc( url ) {
    if ( ! url || ! url.trim() ) return '';
    if ( url.indexOf( 'http' ) === 0 ) return url;
    if ( url.indexOf( '{{T}}' ) === 0 ) return themeUri + url.slice( 6 );
    if ( url.indexOf( '/' ) === 0 ) return themeUri ? themeUri + url : url;
    return url;
  }

  var DEFAULT_ITEMS = [
    { link: 'https://www.rakuten-card.co.jp/campaign/rakuten_card/app/', imageUrl: 'https://music.rakuten.co.jp/assets/top/img/bnr/20250630_card_165x100.png', imageAlt: '【楽天カード】新規入会でポイント進呈！', target: '_blank' },
    { link: 'https://event.rakuten.co.jp/card/pointday/', imageUrl: '{{T}}/assets/top/img/bnr/20250925_card_165x100.jpg', imageAlt: '【楽天市場】毎月5と0のつく日は楽天カード利用でポイント4倍', target: '_blank' },
    { link: 'https://r.gnavi.co.jp/plan/campaign/lottery/?sc_cid=cp_rkt_msc_top_cam260105_01&scid=wi_msc_top_cam260105_01', imageUrl: '{{T}}/assets/top/img/bnr/20260105_gnav_165x100.jpg', imageAlt: '【ぐるなび】冬の乾杯キャンペーン抽選で10,000ポイント進呈！', target: '_blank' },
    { link: 'https://rakuma.rakuten.co.jp/info/campaign/spu/?scid=wi_music_gs', imageUrl: '{{T}}/assets/top/img/bnr/20251101_rakuma_165x100_spu.png', imageAlt: '【SPU】ラクマで販売&発送通知完了で楽天市場のお買い物がポイント+0.5倍', target: '_blank' },
    { link: 'https://car.rakuten.co.jp/shaken/campaign/enemobi/fix/?scid=wi_sha_group_ad_bt_bnr_music_enemobi', imageUrl: '{{T}}/assets/top/img/bnr/20251208_car_165x100.png', imageAlt: '【楽天Car】「ENEOSモビリニア」の対象店舗で車検予約・実施で2,000ポイントキャンペーン！', target: '_blank' },
    { link: 'https://event.rakuten.co.jp/rakken/?scid=music', imageUrl: '{{T}}/assets/top/img/bnr/20251120_31ice_rakken_165x100.gif', imageAlt: '【楽券】楽天で買って街で使うデジタルチケット', target: '_blank' },
    { link: 'https://nft.rakuten.co.jp/?scid=wi_rnf_music', imageUrl: '{{T}}/assets/top/img/bnr/20251021_nft_165x100.jpg', imageAlt: '【Rakuten NFT】みんなのチケット公式NFTチケットリセールサイト', target: '_blank' },
    { link: 'https://event.rakuten.co.jp/beauty/korea/campaign/?scid=we_rakutenmusic_beauty_korea_campaign_3', imageUrl: '{{T}}/assets/top/img/bnr/20250702_kcosmachuri_165x100.png', imageAlt: '【楽天市場】韓コス祭り｜20%OFFクーポンや楽天限定セットも！', target: '_blank' },
    { link: 'https://brandavenue.rakuten.co.jp/contents/rfapp/?l-id=rmusic_pc_rfashion', imageUrl: '{{T}}/assets/top/img/bnr/20241015_fashion_165x100.png', imageAlt: '【楽天ファッション】アプリからの購入で最大ポイント3倍', target: '_blank' },
    { link: 'https://sm.rakuten.co.jp/?scid=wi_music_barter&xadid=wi_music_barter', imageUrl: '{{T}}/assets/top/img/bnr/20240927_mart_logo_165x100.jpg', imageAlt: '【楽天マート(旧楽天西友ネットスーパー)】食品・日用品をいつでも安く最短当日宅配', target: '_blank' }
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

  function registerGroupservicesBlock() {
    if ( typeof wp === 'undefined' || ! wp.blocks ) {
      return;
    }
    if ( ! wp.blockEditor || ! wp.components ) {
      setTimeout( registerGroupservicesBlock, 50 );
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
      title: __( '楽天グループサービス（スライダー）', 'rakutenmusic-theme' ),
      category: 'rakutenmusic',
      icon: 'align-wide',
      description: __( '楽天ミュージック汎用テンプレート用セクション: 楽天グループサービス（スライダー・リスト編集可能）', 'rakutenmusic-theme' ),
      attributes: {
        items: { type: 'string', default: '' }
      },
      edit: function (props) {
        var attrs = props.attributes;
        var itemsAttr = attrs.items || '';
        var list = getItemsList(itemsAttr);
        var blockProps = useBlockProps ? useBlockProps({ className: 'top-section-groupservices top-section-groupservices--editor' }) : { className: 'top-section-groupservices top-section-groupservices--editor' };

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
          setList(list.concat([{ link: '#', imageUrl: '', imageAlt: '', target: '_blank' }]));
        }

        function removeItem(i) {
          var next = list.filter(function (_, idx) { return idx !== i; });
          setList(next.length ? next : [{ link: '#', imageUrl: '', imageAlt: '', target: '_blank' }]);
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
              { title: __('楽天グループサービス', 'rakutenmusic-theme'), initialOpen: true },
              list.map(function (item, i) {
                return el(
                  'div',
                  { key: i, className: 'groupservices-editor__row', style: { marginBottom: '12px', padding: '10px', background: '#f9f9f9', borderRadius: '4px' } },
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
            Object.assign({}, blockProps, { id: 'top-section-groupservices', className: 'bg-light top-section-groupservices--editor' }),
            el('div', { className: 'bg-light-txt font-rakuten-b' }, 'GROUP SERVICES'),
            el('div', { className: 'ttl-group' },
              el('sub', { className: 'font-rakuten-b' }, 'GROUP SERVICES'),
              el('h2', null, __('楽天グループサービス', 'rakutenmusic-theme'))
            ),
            el('div', { className: 'splide top-section-groupservices groupservices-editor-preview' },
              el('div', { className: 'splide__track' },
                el('ul', { className: 'splide__list group-service-bnr' },
                  list.map(function (item, i) {
                    var imgSrc = resolveImgSrc( item.imageUrl );
                    if ( ! imgSrc ) {
                      imgSrc = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="165" height="100" viewBox="0 0 165 100"%3E%3Crect fill="%23eee" width="165" height="100"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23999" font-size="11"%3E画像%3C/text%3E%3C/svg%3E';
                    }
                    return el(
                      'li',
                      { key: i, className: 'splide__slide' },
                      el('a', { href: item.link || '#', target: '_blank', rel: 'noopener noreferrer', style: { display: 'block' } },
                        el('img', { src: imgSrc, alt: item.imageAlt || '', style: { maxWidth: '100%', height: 'auto', display: 'block' } })
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
    wp.domReady( registerGroupservicesBlock );
  } else if ( typeof document !== 'undefined' && document.readyState === 'loading' ) {
    document.addEventListener( 'DOMContentLoaded', registerGroupservicesBlock );
  } else {
    registerGroupservicesBlock();
  }
})();
