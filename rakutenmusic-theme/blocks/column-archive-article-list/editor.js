(function () {
	'use strict';

	var BLOCK_NAME = 'rakutenmusic/column-archive-article-list';

	var BADGE_OPTIONS = [
		{ value: 'feature', label: '特集', color: '#0099FF' },
		{ value: 'column', label: 'コラム', color: '#EC0606' },
		{ value: 'interview', label: 'インタビュー', color: '#F59600' },
		{ value: 'ranking', label: 'ランキング', color: '#009500' }
	];
	var BADGE_LABELS = { feature: '特集', column: 'コラム', interview: 'インタビュー', ranking: 'ランキング' };

	function resolveAssetsUrl( url ) {
		if ( ! url || typeof url !== 'string' ) return url;
		url = url.trim();
		if ( url.indexOf( '/assets/' ) === 0 && typeof rakutenmusicColumnArchive !== 'undefined' && rakutenmusicColumnArchive.assetsUri ) {
			return rakutenmusicColumnArchive.assetsUri + url.slice( 7 );
		}
		return url;
	}

	/** 表示用 "2026/3/5" などを input[type=date] 用 "2026-03-05" に変換 */
	function dateToInputValue( str ) {
		if ( ! str || typeof str !== 'string' ) return '';
		str = str.trim().replace( /\//g, '-' );
		var m = str.match( /^(\d{4})-(\d{1,2})-(\d{1,2})$/ );
		if ( m ) {
			return m[1] + '-' + m[2].padStart( 2, '0' ) + '-' + m[3].padStart( 2, '0' );
		}
		var m2 = str.match( /^(\d{4})-(\d{2})-(\d{2})$/ );
		if ( m2 ) return str;
		return '';
	}

	/** input[type=date] の値 "2026-03-05" を表示用 "2026/3/5" に変換 */
	function inputValueToDate( val ) {
		if ( ! val || typeof val !== 'string' ) return '';
		val = val.trim();
		var parts = val.split( '-' );
		if ( parts.length !== 3 ) return val;
		var y = parseInt( parts[0], 10 );
		var mo = parseInt( parts[1], 10 );
		var d = parseInt( parts[2], 10 );
		if ( isNaN( y ) || isNaN( mo ) || isNaN( d ) ) return val;
		return y + '/' + mo + '/' + d;
	}

	function registerColumnArchiveArticleListBlock() {
		if ( typeof wp === 'undefined' || ! wp.blocks || ! wp.blockEditor || ! wp.components ) {
			setTimeout( registerColumnArchiveArticleListBlock, 50 );
			return;
		}

		var el = wp.element.createElement;
		var useState = wp.element.useState;
		var useBlockProps = wp.blockEditor.useBlockProps;
		var InspectorControls = wp.blockEditor.InspectorControls;
		var PanelBody = wp.components.PanelBody;
		var TextControl = wp.components.TextControl;
		var SelectControl = wp.components.SelectControl;
		var Button = wp.components.Button;
		var __ = wp.i18n.__;

		function getDefaultItem() {
			return {
				imageUrl: '',
				linkUrl: '',
				badge: 'feature',
				title: '',
				date: ''
			};
		}

		try {
			wp.blocks.unregisterBlockType( BLOCK_NAME );
		} catch ( e ) {}

		wp.blocks.registerBlockType( BLOCK_NAME, {
			title: __( '読む音楽ガイド：記事一覧', 'rakutenmusic-theme' ),
			category: 'rakutenmusic',
			icon: 'list-view',
			description: __( '読む音楽ガイドアーカイブの過去記事サムネイルリスト', 'rakutenmusic-theme' ),
			attributes: {
				items: { type: 'array', default: [] }
			},
			edit: function ( props ) {
				var attrs = props.attributes;
				var items = Array.isArray( attrs.items ) ? attrs.items : [];
				var selectedState = useState( items.length > 0 ? 0 : -1 );
				var selectedIndex = selectedState[ 0 ];
				var setSelectedIndex = selectedState[ 1 ];

				var blockProps = useBlockProps ? useBlockProps( { className: 'column-archive-article-list-editor' } ) : { className: 'column-archive-article-list-editor' };

				function setItems( next ) {
					props.setAttributes( { items: next } );
					if ( selectedIndex >= next.length ) {
						setSelectedIndex( Math.max( -1, next.length - 1 ) );
					}
				}

				function updateItem( index, field, value ) {
					var next = items.slice();
					if ( ! next[ index ] ) {
						next[ index ] = getDefaultItem();
					}
					next[ index ] = Object.assign( {}, next[ index ], { [ field ]: value } );
					setItems( next );
				}

				function removeItem( index ) {
					var next = items.filter( function ( _, i ) { return i !== index; } );
					var newSel = selectedIndex;
					if ( selectedIndex >= next.length ) {
						newSel = next.length - 1;
					} else if ( selectedIndex >= index && selectedIndex > 0 ) {
						newSel = selectedIndex - 1;
					}
					setSelectedIndex( newSel );
					props.setAttributes( { items: next } );
				}

				function addItem() {
					var next = items.concat( [ getDefaultItem() ] );
					props.setAttributes( { items: next } );
					setSelectedIndex( next.length - 1 );
				}

				function moveItem( index, delta ) {
					var j = index + delta;
					if ( j < 0 || j >= items.length ) return;
					var next = items.slice();
					var t = next[ index ];
					next[ index ] = next[ j ];
					next[ j ] = t;
					props.setAttributes( { items: next } );
					if ( selectedIndex === index ) {
						setSelectedIndex( j );
					} else if ( selectedIndex === j ) {
						setSelectedIndex( index );
					}
				}

				function duplicateItem( index ) {
					if ( index < 0 || index >= items.length ) return;
					var copy = Object.assign( {}, getDefaultItem(), items[ index ] );
					var next = items.slice( 0, index + 1 ).concat( [ copy ], items.slice( index + 1 ) );
					props.setAttributes( { items: next } );
					setSelectedIndex( index + 1 );
				}

				function selectItem( index ) {
					setSelectedIndex( index );
				}

				var selectedItem = selectedIndex >= 0 && items[ selectedIndex ] ? items[ selectedIndex ] : null;
				var badgeChoices = BADGE_OPTIONS.map( function ( o ) {
					return { value: o.value, label: o.label };
				} );

				// プレビュー用：表示する項目（imageUrl があるもの）
				var previewItems = items.filter( function ( item ) {
					return item && ( ( item.imageUrl && item.imageUrl.trim() ) || ( item.title && item.title.trim() ) );
				} );

				return el(
					wp.element.Fragment,
					null,
					el(
						InspectorControls,
						null,
						el(
							PanelBody,
							{ title: __( '記事一覧', 'rakutenmusic-theme' ), initialOpen: true },
							el( 'div', { style: { marginBottom: '12px' } },
								el( Button, {
									isPrimary: true,
									isSmall: true,
									onClick: addItem
								}, __( '項目を追加', 'rakutenmusic-theme' ) )
							),
							items.length === 0
								? el( 'p', { style: { color: '#666', fontSize: '12px' } }, __( '「項目を追加」で記事を追加してください。', 'rakutenmusic-theme' ) )
								: items.map( function ( item, i ) {
									var label = ( item.title && item.title.trim() ) ? item.title.trim() : ( __( '項目', 'rakutenmusic-theme' ) + ' ' + ( i + 1 ) );
									var isSelected = i === selectedIndex;
									return el(
										'div',
										{ key: i, style: {
											marginBottom: '8px',
											padding: '8px 10px',
											border: '1px solid ' + ( isSelected ? '#0073aa' : '#ddd' ),
											borderRadius: '4px',
											background: isSelected ? '#f0f6fc' : '#fff',
											cursor: 'pointer'
										}, onClick: function () { selectItem( i ); } },
										el( 'div', { style: { fontWeight: 600, fontSize: '12px', marginBottom: '4px' } }, label ),
										el( 'div', { style: { display: 'flex', flexWrap: 'wrap', gap: '4px' } },
											el( Button, {
												isSmall: true,
												variant: 'secondary',
												onClick: function ( e ) { e.stopPropagation(); moveItem( i, -1 ); },
												disabled: i === 0
											}, '↑' ),
											el( Button, {
												isSmall: true,
												variant: 'secondary',
												onClick: function ( e ) { e.stopPropagation(); moveItem( i, 1 ); },
												disabled: i === items.length - 1
											}, '↓' ),
											el( Button, {
												isSmall: true,
												variant: 'secondary',
												onClick: function ( e ) { e.stopPropagation(); duplicateItem( i ); }
											}, __( '複製', 'rakutenmusic-theme' ) ),
											el( Button, {
												isSmall: true,
												variant: 'secondary',
												isDestructive: true,
												onClick: function ( e ) { e.stopPropagation(); removeItem( i ); }
											}, __( '削除', 'rakutenmusic-theme' ) )
										)
									);
								} )
						),
						selectedItem && el(
							PanelBody,
							{ title: __( '選択中の項目', 'rakutenmusic-theme' ), initialOpen: true },
							el( TextControl, {
								label: __( 'サムネイル画像URL', 'rakutenmusic-theme' ),
								value: selectedItem.imageUrl || '',
								onChange: function ( v ) { updateItem( selectedIndex, 'imageUrl', v || '' ); }
							} ),
							el( TextControl, {
								label: __( 'リンクURL', 'rakutenmusic-theme' ),
								value: selectedItem.linkUrl || '',
								onChange: function ( v ) { updateItem( selectedIndex, 'linkUrl', v || '' ); }
							} ),
							el( SelectControl, {
								label: __( 'バッジ', 'rakutenmusic-theme' ),
								value: selectedItem.badge || 'feature',
								options: badgeChoices,
								onChange: function ( v ) { updateItem( selectedIndex, 'badge', v || 'feature' ); }
							} ),
							el( TextControl, {
								label: __( 'タイトル', 'rakutenmusic-theme' ),
								value: selectedItem.title || '',
								onChange: function ( v ) { updateItem( selectedIndex, 'title', v || '' ); }
							} ),
							el( 'div', { className: 'column-archive-date-field', style: { marginBottom: '16px' } },
								el( 'label', { style: { display: 'block', marginBottom: '4px', fontWeight: 600, fontSize: '13px' } }, __( '掲載日', 'rakutenmusic-theme' ) ),
								el( 'input', {
									type: 'date',
									value: dateToInputValue( selectedItem.date || '' ),
									onChange: function ( e ) {
										var v = e.target && e.target.value;
										updateItem( selectedIndex, 'date', inputValueToDate( v ) );
									},
									style: { width: '100%', padding: '8px', fontSize: '14px', boxSizing: 'border-box' }
								} ),
								el( 'p', { style: { margin: '4px 0 0', fontSize: '12px', color: '#757575' } }, __( 'カレンダーから選択するか、下の欄で直接入力もできます。', 'rakutenmusic-theme' ) )
							),
							el( TextControl, {
								label: __( '掲載日（直接入力）', 'rakutenmusic-theme' ),
								value: selectedItem.date || '',
								onChange: function ( v ) { updateItem( selectedIndex, 'date', v || '' ); },
								help: __( '例: 2026/3/5（カレンダーで設定した場合は自動で入ります）', 'rakutenmusic-theme' )
							} )
						)
					),
					el(
						'div',
						blockProps,
						previewItems.length === 0
							? el( 'div', {
								className: 'column-archive-article-list-placeholder',
								style: { padding: '20px', background: '#f5f5f5', borderRadius: '4px', textAlign: 'center' }
							},
								el( 'strong', null, __( '記事一覧', 'rakutenmusic-theme' ) ),
								el( 'p', { style: { margin: '8px 0 0', fontSize: '13px', color: '#666' } },
									__( '右サイドバーで「項目を追加」から記事を追加してください。', 'rakutenmusic-theme' )
								)
							)
							: el( 'section', { className: 'bg-archive' },
								el( 'div', { className: 'archive' },
									el( 'div', { className: 'title-latest' },
										el( 'div', { className: 'page-subtitle-en' }, 'Articles' ),
										el( 'h2', { className: 'page-subtitle' }, __( '記事一覧', 'rakutenmusic-theme' ) )
									),
									el( 'ul', { id: 'target-row', className: 'column-archive-preview-list' },
										previewItems.map( function ( item, idx ) {
											var imgUrl = resolveAssetsUrl( item.imageUrl || '' );
											var badge = ( item.badge && BADGE_LABELS[ item.badge ] ) ? item.badge : 'feature';
											var label = BADGE_LABELS[ badge ] || '特集';
											return el( 'li', { key: idx },
												el( 'div', { className: 'article-card' },
													el( 'div', { className: 'cover-img' },
														el( 'a', { href: item.linkUrl || '#', onClick: function ( e ) { e.preventDefault(); } },
															imgUrl
																? el( 'img', { src: imgUrl, alt: item.title || '', loading: 'lazy' } )
																: el( 'div', { style: { background: '#ddd', aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#666' } }, __( '画像なし', 'rakutenmusic-theme' ) )
														)
													),
													el( 'div', { className: 'tags' },
														el( 'div', { className: badge }, label )
													),
													el( 'div', { className: 'name' },
														el( 'p', null, item.title || '' )
													),
													el( 'div', { className: 'date' },
														el( 'p', null, item.date || '' )
													)
												)
											);
										} )
									)
								)
							)
					)
				);
			},
			save: function () {
				return null;
			}
		} );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', registerColumnArchiveArticleListBlock );
	} else {
		registerColumnArchiveArticleListBlock();
	}
})();
