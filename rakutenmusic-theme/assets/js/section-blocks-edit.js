/**
 * 楽天ミュージック セクションブロックの編集用プレビュー（インサーター・キャンバス両方）
 * window.rakutenmusicSectionBlocksData を PHP で渡すこと
 */
(function () {
	'use strict';

	var data = window.rakutenmusicSectionBlocksData || {};
	var blocks = data.blocks || [];
	var previewUrls = data.previewUrls || {};

	function run() {
		var w = window.wp;
		if (!w || !w.blocks || !w.element) return false;

		var unregisterBlockType = w.blocks.unregisterBlockType;
		var registerBlockType = w.blocks.registerBlockType;
		var createElement = w.element.createElement;

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

		blocks.forEach(function (b) {
			// バンドル：OVERVIEW は独自の editor（サイドバーでアプリDL設定）を持つため再登録しない
			if (b.name === 'top-section-overview') return;
			try {
				var blockName = 'rakutenmusic/rakuten-music-section-' + b.name;
				var previewUrl = previewUrls[blockName] || null;
				if (unregisterBlockType) {
					try {
						unregisterBlockType(blockName);
					} catch (e) {}
				}
				registerBlockType(blockName, {
					title: '[楽天ミュージック] ' + b.title,
					category: 'rakutenmusic',
					keywords: ['楽天', 'ミュージック'].concat(b.keywords || []),
					icon: previewUrl ? { src: previewUrl } : 'align-wide',
					description: '楽天ミュージック: ' + b.title,
					attributes: {},
					example: { attributes: {} },
					edit: function (props) {
						return createElement(PreviewEdit, {
							blockTitle: b.title,
							previewUrl: previewUrl,
							props: props
						});
					},
					save: function () {
						return null;
					}
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
