/**
 * ブロックをレジストリに登録（リストビューで「非サポート」にならないようにする）
 * ライトプラン・学生プラン・共通は useBlockProps でドラッグ・並べ替え可能に
 * window.rakutenmusicSectionBlocksData を PHP で渡すこと
 */
(function () {
	'use strict';

	var data = window.rakutenmusicSectionBlocksData || {};
	var blocks = data.blocks || [];
	var rankBlocks = data.rankBlocks || [];
	var rewardBlocks = data.rewardBlocks || [];
	var planLiteBlocks = data.planLiteBlocks || [];
	var planStudentBlocks = data.planStudentBlocks || [];
	var commonBlocks = data.commonBlocks || [];
	var columnArticleBlocks = data.columnArticleBlocks || [];

	function run() {
		var w = window.wp;
		if (!w || !w.blocks || !w.element) return false;
		// ドラッグ用に wp.blockEditor.useBlockProps が必要
		if (!w.blockEditor || !w.blockEditor.useBlockProps) return false;

		var registerBlockType = w.blocks.registerBlockType;
		var createElement = w.element.createElement;
		var useBlockProps = w.blockEditor.useBlockProps;

		function minimalEdit(title) {
			return function () {
				return createElement('div', {
					className: 'rakutenmusic-block-early-placeholder',
					style: { padding: '8px', fontSize: '13px', color: '#666' }
				}, title);
			};
		}
		// ライトプラン・学生プラン・共通・ランク・リワード用（useBlockProps でドラッグ・並べ替え可能）
		function placeholderEdit(className, title) {
			return function (props) {
				var blockProps = useBlockProps ? useBlockProps({ className: className }) : { className: className };
				var style = { padding: '16px', background: '#f0f0f0', border: '1px dashed #999', borderRadius: '4px', textAlign: 'center', fontSize: '13px' };
				return createElement('div', Object.assign({}, blockProps, { style: style }), createElement('strong', null, title));
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

		// ランク・リワード（枠・背景付きプレースホルダー）
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
					edit: placeholderEdit('rakutenmusic-rank-block-placeholder', b.title),
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
					edit: placeholderEdit('rakutenmusic-reward-block-placeholder', b.title),
					save: function () { return null; }
				});
			} catch (err) {}
		});
		// ライトプラン（ライトプラン・学生プラン・共通で同じ見た目）
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
					edit: placeholderEdit('rakutenmusic-plan-lite-block-placeholder', b.title),
					save: function () { return null; }
				});
			} catch (err) {}
		});
		planStudentBlocks.forEach(function (b) {
			try {
				registerBlockType(b.name, {
					title: b.title,
					category: b.category || 'rakutenmusic-plan-student',
					keywords: (b.keywords || []).concat('楽天', 'ミュージック', '学生プラン'),
					icon: b.icon || 'align-wide',
					description: b.description || '',
					attributes: {},
					example: { attributes: {} },
					supports: { inserter: true },
					edit: placeholderEdit('rakutenmusic-plan-student-block-placeholder', b.title),
					save: function () { return null; }
				});
			} catch (err) {}
		});
		commonBlocks.forEach(function (b) {
			try {
				registerBlockType(b.name, {
					title: b.title,
					category: b.category || 'rakutenmusic-common',
					keywords: (b.keywords || []).concat('楽天', 'ミュージック'),
					icon: b.icon || 'align-wide',
					description: b.description || '',
					attributes: {},
					example: { attributes: {} },
					supports: { inserter: true },
					edit: placeholderEdit('rakutenmusic-common-block-placeholder', b.title),
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
