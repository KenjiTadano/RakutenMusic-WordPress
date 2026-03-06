/**
 * 楽天ミュージック セクション・ランク・リワード・ライトプラン・学生プラン・共通ブロックの編集用登録（インサーターに表示）
 * window.rakutenmusicSectionBlocksData を PHP で渡すこと（blocks, previewUrls, rankBlocks, rewardBlocks, planLiteBlocks, planStudentBlocks, commonBlocks）
 */
(function () {
	'use strict';

	var data = window.rakutenmusicSectionBlocksData || {};
	var blocks = data.blocks || [];
	var previewUrls = data.previewUrls || {};
	var rankBlocks = data.rankBlocks || [];
	var rewardBlocks = data.rewardBlocks || [];
	var planLiteBlocks = data.planLiteBlocks || [];
	var planStudentBlocks = data.planStudentBlocks || [];
	var commonBlocks = data.commonBlocks || [];

	function run() {
		var w = window.wp;
		if (!w || !w.blocks || !w.element || !w.blockEditor) return false;

		var unregisterBlockType = w.blocks.unregisterBlockType;
		var registerBlockType = w.blocks.registerBlockType;
		var createElement = w.element.createElement;
		var useBlockProps = w.blockEditor.useBlockProps;

		function PreviewEdit(props) {
			var blockTitle = props.blockTitle;
			var previewUrl = props.previewUrl;
			if (previewUrl) {
				return createElement('img', {
					src: previewUrl,
					alt: blockTitle,
					style: { width: '100%', maxHeight: '200px', objectFit: 'cover', display: 'block' }
				});
			}
			var containerProps = { className: 'rakutenmusic-section-placeholder', style: { padding: '16px', background: '#f0f0f0', border: '1px dashed #999', borderRadius: '4px', textAlign: 'center' } };
			return createElement('div', containerProps, createElement('strong', null, blockTitle));
		}

		// useBlockProps でラップし、ドラッグ・並べ替えができるようにする（ライトプラン・学生プラン・共通で同じ）
		function placeholderEdit(className, title) {
			return function (props) {
				var blockProps = useBlockProps ? useBlockProps({ className: className }) : { className: className };
				var style = { padding: '16px', background: '#f0f0f0', border: '1px dashed #999', borderRadius: '4px', textAlign: 'center', fontSize: '13px' };
				return createElement('div', Object.assign({}, blockProps, { style: style }), createElement('strong', null, title));
			};
		}

		// セクションブロック（rakutenmusic/rakuten-music-section-*）
		blocks.forEach(function (b) {
			if (b.name === 'top-section-overview') return;
			try {
				var blockName = 'rakutenmusic/rakuten-music-section-' + b.name;
				var previewUrl = previewUrls[blockName] || null;
				if (unregisterBlockType) { try { unregisterBlockType(blockName); } catch (e) {} }
				registerBlockType(blockName, {
					title: '[楽天ミュージック] ' + b.title,
					category: (b.category || 'rakutenmusic-common'),
					keywords: ['楽天', 'ミュージック'].concat(b.keywords || []),
					icon: previewUrl ? { src: previewUrl } : 'align-wide',
					description: '楽天ミュージック: ' + b.title,
					attributes: {},
					example: { attributes: {} },
					edit: function (props) {
						return createElement(PreviewEdit, { blockTitle: b.title, previewUrl: previewUrl, props: props });
					},
					save: function () { return null; }
				});
			} catch (err) {}
		});

		// ランクブロック
		rankBlocks.forEach(function (b) {
			try {
				if (unregisterBlockType) { try { unregisterBlockType(b.name); } catch (e) {} }
				registerBlockType(b.name, {
					title: b.title,
					category: b.category || 'rakutenmusic-rank',
					keywords: (b.keywords || []).concat('楽天', 'ミュージック', 'ランク', 'rank'),
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

		// リワードブロック
		rewardBlocks.forEach(function (b) {
			try {
				if (unregisterBlockType) { try { unregisterBlockType(b.name); } catch (e) {} }
				registerBlockType(b.name, {
					title: b.title,
					category: b.category || 'rakutenmusic-reward',
					keywords: (b.keywords || []).concat('楽天', 'ミュージック', 'リワード'),
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

		// ライトプランブロック（バンドル・他プランと同じプレースホルダー構造）
		planLiteBlocks.forEach(function (b) {
			try {
				if (unregisterBlockType) { try { unregisterBlockType(b.name); } catch (e) {} }
				registerBlockType(b.name, {
					title: b.title,
					category: b.category || 'rakutenmusic-plan-lite',
					keywords: (b.keywords || []).concat('楽天', 'ミュージック', 'ライトプラン'),
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

		// 学生プランブロック（ライトプラン・バンドルと同じプレースホルダー構造）
		planStudentBlocks.forEach(function (b) {
			try {
				if (unregisterBlockType) { try { unregisterBlockType(b.name); } catch (e) {} }
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

		// 共通ブロック（top-section-step, stack-section-reward 等・同じプレースホルダー構造）
		commonBlocks.forEach(function (b) {
			try {
				if (unregisterBlockType) { try { unregisterBlockType(b.name); } catch (e) {} }
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

		return true;
	}

	if (run()) return;
	var attempts = 0;
	var id = setInterval(function () {
		if (run() || attempts++ > 100) clearInterval(id);
	}, 50);
})();
