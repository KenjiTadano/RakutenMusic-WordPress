(function () {
  'use strict';

  var BLOCK_NAME = 'rakutenmusic/campaign-hero';

  function registerCampaignHeroBlock() {
    if ( typeof wp === 'undefined' || ! wp.blocks ) {
      return;
    }
    if ( ! wp.blockEditor || ! wp.components ) {
      setTimeout( registerCampaignHeroBlock, 50 );
      return;
    }

    var el = wp.element.createElement;
    var useBlockProps = wp.blockEditor.useBlockProps;
    var InspectorControls = wp.blockEditor.InspectorControls;
    var PanelBody = wp.components.PanelBody;
    var TextControl = wp.components.TextControl;
    var CheckboxControl = wp.components.CheckboxControl;
    var __ = wp.i18n.__;

    try {
      wp.blocks.unregisterBlockType( BLOCK_NAME );
    } catch ( e ) {}

    wp.blocks.registerBlockType( BLOCK_NAME, {
      title: __( 'キャンペーンヒーロー', 'rakutenmusic-theme' ),
      category: 'rakutenmusic',
      icon: 'cover-image',
      description: __( 'キャンペーンページ用ヒーロー（PC/SP画像・背景・スケジュール・注釈を編集可能）', 'rakutenmusic-theme' ),
      attributes: {
        imagePcUrl: { type: 'string', default: '' },
        imagePcAlt: { type: 'string', default: '' },
        imageSpUrl: { type: 'string', default: '' },
        imageSpAlt: { type: 'string', default: '' },
        heroBackgroundImage: { type: 'string', default: '' },
        heroBackgroundColor: { type: 'string', default: '#ffcf31' },
        heroBackgroundRepeat: { type: 'string', default: 'no-repeat' },
        heroBackgroundPosition: { type: 'string', default: 'center top' },
        heroBackgroundPositionY: { type: 'string', default: '' },
        heroBackgroundSize: { type: 'string', default: 'auto 82%' },
        scheduleVisible: { type: 'boolean', default: true },
        scheduleBackgroundColor: { type: 'string', default: '#ffcf31' },
        scheduleAlwaysOn: { type: 'boolean', default: false },
        scheduleStartDate: { type: 'string', default: '' },
        scheduleEndDate: { type: 'string', default: '' },
        scheduleNoteVisible: { type: 'boolean', default: true },
        scheduleFontSize: { type: 'string', default: '14px' },
        scheduleTextColor: { type: 'string', default: '#333' },
        scheduleTextOffsetY: { type: 'string', default: '' },
        scheduleNoteOffsetY: { type: 'string', default: '' }
      },
      edit: function (props) {
        var attrs = props.attributes;
        var blockProps = useBlockProps ? useBlockProps({ className: 'campaign-hero-block-editor' }) : { className: 'campaign-hero-block-editor' };

        var heroBgStyle = {};
        if ( attrs.heroBackgroundImage ) {
          heroBgStyle.backgroundImage = 'url(' + attrs.heroBackgroundImage + ')';
          heroBgStyle.backgroundRepeat = attrs.heroBackgroundRepeat || 'no-repeat';
          var pos = attrs.heroBackgroundPosition || 'center top';
          if ( attrs.heroBackgroundPositionY && /^-?\d+$/.test( String( attrs.heroBackgroundPositionY ).trim() ) ) {
            pos = pos + ' ' + attrs.heroBackgroundPositionY.trim() + 'px';
          }
          heroBgStyle.backgroundPosition = pos;
          heroBgStyle.backgroundSize = attrs.heroBackgroundSize || 'auto 82%';
        }
        if ( attrs.heroBackgroundColor ) {
          heroBgStyle.backgroundColor = attrs.heroBackgroundColor;
        }

        var scheduleStyle = {};
        if ( attrs.scheduleBackgroundColor ) { scheduleStyle.backgroundColor = attrs.scheduleBackgroundColor; }
        if ( attrs.scheduleFontSize ) { scheduleStyle.fontSize = attrs.scheduleFontSize; }
        if ( attrs.scheduleTextColor ) { scheduleStyle.color = attrs.scheduleTextColor; }
        if ( attrs.scheduleTextOffsetY && /^-?\d+$/.test( String( attrs.scheduleTextOffsetY ).trim() ) ) {
          scheduleStyle['--schedule-text-offset-y'] = attrs.scheduleTextOffsetY.trim() + 'px';
        }
        if ( attrs.scheduleNoteOffsetY && /^-?\d+$/.test( String( attrs.scheduleNoteOffsetY ).trim() ) ) {
          scheduleStyle['--schedule-note-offset-y'] = attrs.scheduleNoteOffsetY.trim() + 'px';
        }
        var defaultPc = '//music.r10s.jp/external/prod/assets/campaign/2026/annual-plan-campaign/img/ogp.png';
        var defaultSp = '//music.r10s.jp/external/prod/assets/campaign/2026/annual-plan-campaign/img/ogp_sp.png';
        var imgPc = attrs.imagePcUrl && attrs.imagePcUrl.trim() ? attrs.imagePcUrl : defaultPc;
        var imgSp = attrs.imageSpUrl && attrs.imageSpUrl.trim() ? attrs.imageSpUrl : defaultSp;

        return el(
          wp.element.Fragment,
          null,
          el(
            InspectorControls,
            { key: 'inspector' },
            el(
              PanelBody,
              { title: __('PC画像', 'rakutenmusic-theme'), initialOpen: true },
              el(TextControl, {
                label: __('画像URL', 'rakutenmusic-theme'),
                value: attrs.imagePcUrl || '',
                onChange: function (v) { props.setAttributes({ imagePcUrl: v }); }
              }),
              el(TextControl, {
                label: __('altテキスト', 'rakutenmusic-theme'),
                value: attrs.imagePcAlt || '',
                onChange: function (v) { props.setAttributes({ imagePcAlt: v }); }
              })
            ),
            el(
              PanelBody,
              { title: __('SP画像', 'rakutenmusic-theme'), initialOpen: false },
              el(TextControl, {
                label: __('画像URL', 'rakutenmusic-theme'),
                value: attrs.imageSpUrl || '',
                onChange: function (v) { props.setAttributes({ imageSpUrl: v }); }
              }),
              el(TextControl, {
                label: __('altテキスト', 'rakutenmusic-theme'),
                value: attrs.imageSpAlt || '',
                onChange: function (v) { props.setAttributes({ imageSpAlt: v }); }
              })
            ),
            el(
              PanelBody,
              { title: __('ヒーロー背景', 'rakutenmusic-theme'), initialOpen: false },
              el(TextControl, {
                label: __('背景画像URL', 'rakutenmusic-theme'),
                value: attrs.heroBackgroundImage || '',
                onChange: function (v) { props.setAttributes({ heroBackgroundImage: v }); }
              }),
              el(TextControl, {
                label: __('背景色', 'rakutenmusic-theme'),
                value: attrs.heroBackgroundColor || '#ffcf31',
                onChange: function (v) { props.setAttributes({ heroBackgroundColor: v }); }
              }),
              el(TextControl, {
                label: __('背景の繰り返し (repeat)', 'rakutenmusic-theme'),
                value: attrs.heroBackgroundRepeat || 'no-repeat',
                onChange: function (v) { props.setAttributes({ heroBackgroundRepeat: v }); }
              }),
              el(TextControl, {
                label: __('背景の位置 (position)', 'rakutenmusic-theme'),
                value: attrs.heroBackgroundPosition || 'center top',
                onChange: function (v) { props.setAttributes({ heroBackgroundPosition: v }); }
              }),
              el(TextControl, {
                label: __('背景の縦オフセット (px)。下へ: 正の数、上へ: 負の数', 'rakutenmusic-theme'),
                value: attrs.heroBackgroundPositionY || '',
                onChange: function (v) { props.setAttributes({ heroBackgroundPositionY: v }); }
              }),
              el(TextControl, {
                label: __('背景のサイズ (size)', 'rakutenmusic-theme'),
                value: attrs.heroBackgroundSize || 'auto 82%',
                onChange: function (v) { props.setAttributes({ heroBackgroundSize: v }); }
              })
            ),
            el(
              PanelBody,
              { title: __('スケジュール', 'rakutenmusic-theme'), initialOpen: true },
              el(CheckboxControl, {
                label: __('スケジュールを表示する', 'rakutenmusic-theme'),
                checked: attrs.scheduleVisible,
                onChange: function (v) { props.setAttributes({ scheduleVisible: v }); }
              }),
              attrs.scheduleVisible ? el('div', { style: { marginTop: '12px' } },
                el(TextControl, {
                  label: __('背景色', 'rakutenmusic-theme'),
                  value: attrs.scheduleBackgroundColor || '#ffcf31',
                  onChange: function (v) { props.setAttributes({ scheduleBackgroundColor: v }); }
                }),
                el(TextControl, {
                  label: __('テキストサイズ', 'rakutenmusic-theme'),
                  value: attrs.scheduleFontSize || '14px',
                  onChange: function (v) { props.setAttributes({ scheduleFontSize: v }); }
                }),
                el(TextControl, {
                  label: __('テキストカラー', 'rakutenmusic-theme'),
                  value: attrs.scheduleTextColor || '#333',
                  onChange: function (v) { props.setAttributes({ scheduleTextColor: v }); }
                }),
                el(TextControl, {
                  label: __('開始終了テキストの縦オフセット (px)。下: 正、上: 負', 'rakutenmusic-theme'),
                  value: attrs.scheduleTextOffsetY || '',
                  onChange: function (v) { props.setAttributes({ scheduleTextOffsetY: v }); }
                }),
                el(TextControl, {
                  label: __('注釈の縦オフセット (px)。下: 正、上: 負', 'rakutenmusic-theme'),
                  value: attrs.scheduleNoteOffsetY || '',
                  onChange: function (v) { props.setAttributes({ scheduleNoteOffsetY: v }); }
                }),
                el(CheckboxControl, {
                  label: __('常時開催', 'rakutenmusic-theme'),
                  checked: attrs.scheduleAlwaysOn,
                  onChange: function (v) { props.setAttributes({ scheduleAlwaysOn: v }); }
                }),
                attrs.scheduleAlwaysOn ? null : el('div', { style: { marginTop: '8px' } },
                  el(TextControl, {
                    label: __('開始日時', 'rakutenmusic-theme'),
                    value: attrs.scheduleStartDate || '',
                    onChange: function (v) { props.setAttributes({ scheduleStartDate: v }); }
                  }),
                  el(TextControl, {
                    label: __('終了日時', 'rakutenmusic-theme'),
                    value: attrs.scheduleEndDate || '',
                    onChange: function (v) { props.setAttributes({ scheduleEndDate: v }); }
                  })
                ),
                el(CheckboxControl, {
                  label: __('注釈を表示する（※進呈するポイント...詳細はこちら）', 'rakutenmusic-theme'),
                  checked: attrs.scheduleNoteVisible,
                  onChange: function (v) { props.setAttributes({ scheduleNoteVisible: v }); }
                })
              ) : null
            )
          ),
          el(
            'section',
            Object.assign({}, blockProps, { className: 's-campaign-hero', style: heroBgStyle }),
            el('div', { className: 'l-inner l-inner--sp-full' },
              el('figure', { className: 'campaign-hero__image' },
                el('img', { src: imgPc, alt: attrs.imagePcAlt || '', className: 'is-hidden--sp' }),
                el('img', { src: imgSp, alt: attrs.imageSpAlt || '', className: 'is-hidden--pc' })
              ),
              attrs.scheduleVisible ? el('div', { className: 'campaign-hero__schedule', style: scheduleStyle },
                attrs.scheduleAlwaysOn
                  ? el('p', null, __('常時開催', 'rakutenmusic-theme'))
                  : el('p', null, ( attrs.scheduleStartDate || '' ) + ( attrs.scheduleEndDate ? ' ～ ' + attrs.scheduleEndDate : '' )),
                attrs.scheduleNoteVisible ? el('p', { className: 'campaign-hero__schedule__note' },
                  __('※進呈するポイント(期間限定含む)には上限や条件があります。', 'rakutenmusic-theme'),
                  ' ',
                  el('a', { href: '#cpn-detail', className: 'scroll' }, __('詳細はこちら', 'rakutenmusic-theme'))
                ) : null
              ) : null
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
    wp.domReady( registerCampaignHeroBlock );
  } else if ( typeof document !== 'undefined' && document.readyState === 'loading' ) {
    document.addEventListener( 'DOMContentLoaded', registerCampaignHeroBlock );
  } else {
    registerCampaignHeroBlock();
  }
})();
