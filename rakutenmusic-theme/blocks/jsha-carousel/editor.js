(function () {
  'use strict';

  var BLOCK_NAME = 'rakutenmusic/jsha-carousel';

  function registerJshaCarouselBlock() {
    if ( typeof wp === 'undefined' || ! wp.blocks ) {
      return;
    }
    if ( ! wp.blockEditor || ! wp.components ) {
      setTimeout( registerJshaCarouselBlock, 50 );
      return;
    }

    var el = wp.element.createElement;
    var useBlockProps = wp.blockEditor.useBlockProps;
    var InspectorControls = wp.blockEditor.InspectorControls;
    var PanelBody = wp.components.PanelBody;
    var TextControl = wp.components.TextControl;
    var Button = wp.components.Button;
    var __ = wp.i18n.__;

    var defaultItems = [
      { src: 'https://image.music.rakuten.net/0/3/03b6/63ca/1b61/3eb6/f99f/a7ca/708c/7091.s2.jpg', alt: 'aiko' },
      { src: 'https://image.music.rakuten.net/1/c/1ccf/87d9/c783/eaed/b30a/4d21/cadf/181f.s2.jpg', alt: 'Official髭男dism' },
      { src: 'https://image.music.rakuten.net/2/2/22ea/0119/06c3/bbd5/ec21/bee9/9739/3548.s2.jpg', alt: 'BE:FIRST' },
      { src: 'https://image.music.rakuten.net/9/f/9f0c/22b9/267f/9040/94b5/b0c4/2675/6be6.s2.jpg', alt: 'Number_i' },
      { src: 'https://image.music.rakuten.net/5/1/51e8/9aba/46f7/8ff3/74e6/144a/071c/d0e4.s2.jpg', alt: '20th Century' }
    ];

    try {
      wp.blocks.unregisterBlockType( BLOCK_NAME );
    } catch ( e ) {}

    wp.blocks.registerBlockType( BLOCK_NAME, {
      title: __( 'ジャケ写カルーセル', 'rakutenmusic-theme' ),
      category: 'rakutenmusic',
      icon: 'images-alt2',
      description: __( '画像が横にスライドするカルーセル。各画像のURL・altを編集できます。', 'rakutenmusic-theme' ),
      attributes: {
        items: {
          type: 'array',
          default: defaultItems
        }
      },
      edit: function ( props ) {
        var attrs = props.attributes;
        var items = Array.isArray( attrs.items ) ? attrs.items : [];
        var blockProps = useBlockProps ? useBlockProps( { className: 'jsha-carousel-block-editor' } ) : { className: 'jsha-carousel-block-editor' };

        function updateItem( index, field, value ) {
          var next = items.slice();
          if ( ! next[ index ] ) {
            next[ index ] = { src: '', alt: '' };
          }
          next[ index ] = Object.assign( {}, next[ index ], { [ field ]: value } );
          props.setAttributes( { items: next } );
        }

        function removeItem( index ) {
          var next = items.filter( function ( _, i ) { return i !== index; } );
          props.setAttributes( { items: next } );
        }

        function duplicateItem( index ) {
          var item = items[ index ];
          if ( ! item ) return;
          var copy = { src: item.src || '', alt: item.alt || '' };
          var next = items.concat( [ copy ] );
          props.setAttributes( { items: next } );
        }

        function moveItem( index, delta ) {
          var j = index + delta;
          if ( j < 0 || j >= items.length ) return;
          var next = items.slice();
          var t = next[ index ];
          next[ index ] = next[ j ];
          next[ j ] = t;
          props.setAttributes( { items: next } );
        }

        function addItem() {
          props.setAttributes( { items: items.concat( [ { src: '', alt: '' } ] ) } );
        }

        return el(
          wp.element.Fragment,
          null,
          el(
            InspectorControls,
            { key: 'inspector' },
            el(
              PanelBody,
              { title: __( 'カルーセル画像', 'rakutenmusic-theme' ), initialOpen: true },
              items.map( function ( item, i ) {
                return el(
                  'div',
                  { key: i, style: { marginBottom: '16px', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' } },
                  el( 'div', { style: { marginBottom: '8px', fontWeight: '600', fontSize: '12px' } }, __( '画像', 'rakutenmusic-theme' ) + ' #' + ( i + 1 ) ),
                  el( TextControl, {
                    label: __( '画像URL', 'rakutenmusic-theme' ),
                    value: item.src || '',
                    onChange: function ( v ) { updateItem( i, 'src', v ); }
                  } ),
                  el( TextControl, {
                    label: __( 'altテキスト', 'rakutenmusic-theme' ),
                    value: item.alt || '',
                    onChange: function ( v ) { updateItem( i, 'alt', v ); }
                  } ),
                  el( 'div', { style: { display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' } },
                    el( Button, {
                      isSmall: true,
                      variant: 'secondary',
                      onClick: function () { moveItem( i, -1 ); },
                      disabled: i === 0
                    }, '↑ ' + __( '上へ', 'rakutenmusic-theme' ) ),
                    el( Button, {
                      isSmall: true,
                      variant: 'secondary',
                      onClick: function () { moveItem( i, 1 ); },
                      disabled: i === items.length - 1
                    }, '↓ ' + __( '下へ', 'rakutenmusic-theme' ) ),
                    el( Button, {
                      isSmall: true,
                      variant: 'secondary',
                      onClick: function () { duplicateItem( i ); }
                    }, __( '複製', 'rakutenmusic-theme' ) ),
                    el( Button, {
                      isDestructive: true,
                      isSmall: true,
                      onClick: function () { removeItem( i ); }
                    }, __( '削除', 'rakutenmusic-theme' ) )
                  )
                );
              } ),
              el( Button, { isPrimary: true, onClick: addItem, style: { marginTop: '8px' } }, __( '画像を追加', 'rakutenmusic-theme' ) )
            )
          ),
          el(
            'div',
            blockProps,
            el(
              'div',
              { className: 'jsha-carousel-editor-preview', style: { overflowX: 'auto', overflowY: 'hidden', display: 'flex', gap: '8px', padding: '8px 0', minHeight: '80px' } },
              items.length === 0
                ? el( 'p', { style: { margin: 0, color: '#757575', fontSize: '13px' } }, __( '右のパネルで画像を追加してください', 'rakutenmusic-theme' ) )
                : items.map( function ( item, i ) {
                  return el(
                    'div',
                    { key: i, style: { flex: '0 0 80px', width: '80px' } },
                    item.src
                      ? el( 'img', { src: item.src, alt: item.alt || '', style: { width: '100%', height: 'auto', display: 'block', objectFit: 'cover' } } )
                      : el( 'div', { style: { width: '100%', paddingTop: '100%', background: '#eee', borderRadius: '4px', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center' } }, __( 'URL未設定', 'rakutenmusic-theme' ) )
                  );
                } )
            )
          )
        );
      },
      save: function () {
        return null;
      }
    } );
  }

  if ( typeof wp !== 'undefined' && wp.domReady ) {
    wp.domReady( registerJshaCarouselBlock );
  } else if ( typeof document !== 'undefined' && document.readyState === 'loading' ) {
    document.addEventListener( 'DOMContentLoaded', registerJshaCarouselBlock );
  } else {
    registerJshaCarouselBlock();
  }
})();
