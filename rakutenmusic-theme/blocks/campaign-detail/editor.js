(function () {
  'use strict';

  var el = wp.element.createElement;
  var useEffect = wp.element.useEffect;
  var RichText = wp.blockEditor.RichText;
  var InnerBlocks = wp.blockEditor.InnerBlocks;
  var useBlockProps = wp.blockEditor.useBlockProps;
  var Button = wp.components.Button;
  var __ = wp.i18n.__;

  var campaignDetailTableDefaults = {
    caption: '',
    rows: [
      { header: '■キャンペーン期間', content: '' },
      { header: '■キャンペーン内容', content: '' },
    ],
  };

  function CampaignDetailPreview(_ref) {
    var props = _ref.props;
    var previewUrl = _ref.previewUrl;
    if (useEffect && props.attributes.__preview) {
      useEffect(function () {
        props.setAttributes({ __preview: false });
      }, []);
    }
    return el('img', {
      src: previewUrl,
      alt: 'キャンペーン詳細',
      style: { width: '100%', maxHeight: '200px', objectFit: 'cover', display: 'block' },
    });
  }

  wp.blocks.registerBlockType('rakutenmusic/campaign-detail', {
    attributes: {
      heading: { type: 'string', default: 'キャンペーン詳細' },
      __preview: { type: 'boolean', default: false },
    },
    example: { attributes: { __preview: true } },
    edit: function (props) {
      var previewUrls = (window.rakutenmusicBlockPreviewUrls && window.rakutenmusicBlockPreviewUrls.urls) || {};
      var previewUrl = previewUrls['rakutenmusic/campaign-detail'];
      if (props.attributes.__preview && previewUrl) {
        return el(CampaignDetailPreview, { props: props, previewUrl: previewUrl });
      }
      var blockProps = useBlockProps ? useBlockProps() : { className: 's-campaign-detail' };
      var heading = props.attributes.heading || 'キャンペーン詳細';
      return el(
        'section',
        Object.assign({}, blockProps, { className: 's-campaign-detail' }),
        el('div', { className: 'l-inner' },
          el(RichText, {
            tagName: 'h2',
            className: 'heading heading--m',
            value: heading,
            onChange: function (val) {
              props.setAttributes({ heading: val });
            },
            placeholder: __('キャンペーン詳細', 'rakutenmusic-theme'),
          }),
          el(InnerBlocks, {
            allowedBlocks: ['rakutenmusic/campaign-detail-table'],
            template: [['rakutenmusic/campaign-detail-table', campaignDetailTableDefaults]],
            templateLock: false,
            renderAppender: InnerBlocks.ButtonBlockAppender,
          })
        )
      );
    },
    save: function (props) {
      var blockProps = wp.blockEditor.useBlockProps ? wp.blockEditor.useBlockProps.save() : {};
      var heading = props.attributes.heading || 'キャンペーン詳細';
      return el(
        'section',
        Object.assign({}, blockProps, { className: 's-campaign-detail' }),
        el('div', { className: 'l-inner' },
          el('h2', { className: 'heading heading--m' }, heading),
          el(InnerBlocks.Content)
        )
      );
    },
  });

  wp.blocks.registerBlockType('rakutenmusic/campaign-detail-table', {
    attributes: {
      caption: { type: 'string', default: '' },
      rows: {
        type: 'array',
        default: [
          { header: '■キャンペーン期間', content: '' },
          { header: '■キャンペーン内容', content: '' },
        ],
      },
    },
    edit: function (props) {
      var attrs = props.attributes;
      var caption = attrs.caption || '';
      var rows = attrs.rows && attrs.rows.length ? attrs.rows : campaignDetailTableDefaults.rows.slice();
      var blockProps = useBlockProps ? useBlockProps({ className: 'campaign-detail-table-editor' }) : { className: 'campaign-detail-table-editor' };

      function updateCaption(val) {
        props.setAttributes({ caption: val });
      }
      function updateRow(i, field, val) {
        var next = rows.slice();
        next[i] = next[i] || { header: '', content: '' };
        next[i][field] = val;
        props.setAttributes({ rows: next });
      }
      function addRow() {
        props.setAttributes({ rows: rows.concat([{ header: '', content: '' }]) });
      }
      function removeRow(i) {
        var next = rows.filter(function (_, idx) { return idx !== i; });
        props.setAttributes({ rows: next.length ? next : [{ header: '', content: '' }] });
      }
      function moveRow(i, delta) {
        var j = i + delta;
        if (j < 0 || j >= rows.length) return;
        var next = rows.slice();
        var t = next[i];
        next[i] = next[j];
        next[j] = t;
        props.setAttributes({ rows: next });
      }

      return el(
        'div',
        blockProps,
        el('table', { className: 'campaign-detail__table campaign-detail__table--edit' },
          el('caption', null,
            el('div', { className: 'campaign-detail__title' },
              el(RichText, {
                tagName: 'p',
                value: caption,
                onChange: updateCaption,
                placeholder: __('キャンペーンタイトル', 'rakutenmusic-theme'),
                multiline: false,
              })
            )
          ),
          el('tbody', null,
            rows.map(function (row, i) {
              return el('tr', { key: i, className: 'js-toggle is-open' },
                el('th', { className: 'js-toggle__trigger', style: { width: '30%' } },
                  el(RichText, {
                    tagName: 'p',
                    value: row.header || '',
                    onChange: function (val) { updateRow(i, 'header', val); },
                    placeholder: __('見出し', 'rakutenmusic-theme'),
                  })
                ),
                el('td', { className: 'js-toggle__panel' },
                  el(RichText, {
                    tagName: 'p',
                    value: row.content || '',
                    onChange: function (val) { updateRow(i, 'content', val); },
                    placeholder: __('内容', 'rakutenmusic-theme'),
                    multiline: true,
                  })
                ),
                el('td', { className: 'campaign-detail-table-actions', style: { width: '80px', verticalAlign: 'middle' } },
                  el(Button, {
                    isSmall: true,
                    variant: 'secondary',
                    onClick: function () { moveRow(i, -1); },
                    disabled: i === 0,
                  }, '↑'),
                  el(Button, {
                    isSmall: true,
                    variant: 'secondary',
                    onClick: function () { moveRow(i, 1); },
                    disabled: i === rows.length - 1,
                  }, '↓'),
                  el(Button, {
                    isSmall: true,
                    variant: 'secondary',
                    isDestructive: true,
                    onClick: function () { removeRow(i); },
                  }, __('削除', 'rakutenmusic-theme'))
                )
              );
            })
          )
        ),
        el('p', { style: { marginTop: '8px' } },
          el(Button, { isPrimary: true, onClick: addRow }, __('行を追加', 'rakutenmusic-theme'))
        )
      );
    },
    save: function (props) {
      var attrs = props.attributes;
      var caption = attrs.caption || '';
      var rows = attrs.rows && attrs.rows.length ? attrs.rows : [];
      var blockProps = wp.blockEditor.useBlockProps ? wp.blockEditor.useBlockProps.save() : {};

      return el('table', Object.assign({}, blockProps, { className: 'campaign-detail__table' }),
        el('caption', null,
          el('div', { className: 'campaign-detail__title' },
            el('p', null, caption)
          )
        ),
        el('tbody', null,
          rows.map(function (row, i) {
            var content = row.content || '';
            return el('tr', { key: i, className: 'js-toggle is-open' },
              el('th', { className: 'js-toggle__trigger', style: { width: '30%' } },
                el('p', null, row.header || '')
              ),
              el('td', {
                className: 'js-toggle__panel',
                dangerouslySetInnerHTML: content ? { __html: content } : undefined,
              }, content ? null : el('p', null))
            );
          })
        )
      );
    },
  });
})();
