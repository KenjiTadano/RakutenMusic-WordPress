/**
 * ブロックエディターより先にブロックをレジストリに登録する（リストビューで「非サポート」にならないようにする）
 * 依存は wp-blocks, wp-element のみなので wp-block-editor より先に実行される
 * 詳細な edit は section-blocks-edit.js が後から上書きする
 * window.rakutenmusicSectionBlocksData を PHP で渡すこと
 */
(function () {
	'use strict';

	var data = window.rakutenmusicSectionBlocksData || {};
	var blocks = data.blocks || [];
	var rankBlocks = data.rankBlocks || [];
	var rewardBlocks = data.rewardBlocks || [];
	var planLiteBlocks = data.planLiteBlocks || [];
	var columnArticleBlocks = data.columnArticleBlocks || [];

	function run() {
		var w = window.wp;
		if (!w || !w.blocks || !w.element) return false;

		var registerBlockType = w.blocks.registerBlockType;
		var createElement = w.element.createElement;

		function minimalEdit(title) {
			return function () {
				return createElement('div', {
					className: 'rakutenmusic-block-early-placeholder',
					style: { padding: '8px', fontSize: '13px', color: '#666' }
				}, title);
			};
		}

		// セクションブロック（OVERVIEW・機能比較含む。OVERVIEW は section-blocks-edit では上書きせず独自 editor を維持）
		blocks.forEach(function (b) {
			try {
				var blockName = 'rakutenmusic/rakuten-music-section-' + b.name;
				registerBlockType(blockName, {
					title: '[楽天ミュージック] ' + b.title,
					category: b.category || 'rakutenmusic-common',
					keywords: ['楽天', 'ミュージック'].concat(b.keywords || []),
					icon: 'align-wide',
					description: '楽天ミュージック: ' + b.title,
					attributes: {},
					example: { attributes: {} },
					edit: minimalEdit(b.title),
					save: function () { return null; }
				});
			} catch (err) {}
		});

		// ランク・リワード・ライトプラン
		rankBlocks.forEach(function (b) {
			try {
				registerBlockType(b.name, {
					title: b.title,
					category: b.category || 'rakutenmusic-rank',
					keywords: (b.keywords || []).concat('楽天', 'ミュージック'),
					icon: b.icon || 'align-wide',
					description: b.description || '',
					attributes: {},
					example: { attributes: {} },
					supports: { inserter: true },
					edit: minimalEdit(b.title),
					save: function () { return null; }
				});
			} catch (err) {}
		});
		rewardBlocks.forEach(function (b) {
			try {
				registerBlockType(b.name, {
					title: b.title,
					category: b.category || 'rakutenmusic-reward',
					keywords: (b.keywords || []).concat('楽天', 'ミュージック'),
					icon: b.icon || 'align-wide',
					description: b.description || '',
					attributes: {},
					example: { attributes: {} },
					supports: { inserter: true },
					edit: minimalEdit(b.title),
					save: function () { return null; }
				});
			} catch (err) {}
		});
		planLiteBlocks.forEach(function (b) {
			try {
				registerBlockType(b.name, {
					title: b.title,
					category: b.category || 'rakutenmusic-plan-lite',
					keywords: (b.keywords || []).concat('楽天', 'ミュージック'),
					icon: b.icon || 'align-wide',
					description: b.description || '',
					attributes: {},
					example: { attributes: {} },
					supports: { inserter: true },
					edit: minimalEdit(b.title),
					save: function () { return null; }
				});
			} catch (err) {}
		});

		// 記事ブロック（column-article-*）。content 属性があればフロントに近い見た目で入力可能に
		columnArticleBlocks.forEach(function (b) {
			try {
				var attrs = b.attributes || {};
				var hasContent = attrs && attrs.content;
				var editFn = hasContent
					? function (props) {
							var a = props.attributes || {};
							// 小見出しなどは .article-header でフロントと同じ見た目に
							var isHeader = (b.name || '').indexOf('column-article-header') !== -1;
							var wrap = isHeader
								? createElement('div', { className: 'wp-block-rakutenmusic-column-article-header' },
									createElement('div', null,
										createElement('div', { className: 'article-header' },
											createElement('input', {
												type: 'text',
												value: a.content || '',
												onChange: function (ev) { props.setAttributes({ content: ev.target.value }); },
												placeholder: b.title,
												style: { width: '100%', padding: 0, margin: 0, border: 'none', background: 'transparent', outline: 'none', boxShadow: 'none', fontSize: '20px', fontWeight: '700', lineHeight: '32px', textAlign: 'center', boxSizing: 'border-box' }
											})
										)
									)
								)
								: createElement('div', { className: 'rakutenmusic-block-early-placeholder', style: { padding: '8px' } },
									createElement('input', {
										type: 'text',
										value: a.content || '',
										onChange: function (ev) { props.setAttributes({ content: ev.target.value }); },
										placeholder: b.title,
										style: { width: '100%', padding: '6px', fontSize: '14px', boxSizing: 'border-box' }
									})
								);
							return wrap;
					  }
					: minimalEdit(b.title);
				registerBlockType(b.name, {
					title: b.title,
					category: b.category || 'rakutenmusic-column',
					attributes: attrs,
					example: { attributes: {} },
					edit: editFn,
					save: function () { return null; }
				});
			} catch (err) {}
		});

		return true;
	}

	if (run()) return;
	var attempts = 0;
	var id = setInterval(function () {
		if (run() || attempts++ > 100) clearInterval(id);
	}, 50);
})();
