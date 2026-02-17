/**
 * 楽天ミュージック セクションブロックのエディター登録
 * データは wp_localize_script で rakutenmusicBlocksData.blocks に渡す
 */
(function () {
	var w = window.wp;
	if (!w || !w.blocks || !w.element) return;

	var blocks = (window.rakutenmusicBlocksData && window.rakutenmusicBlocksData.blocks) || [];
	var useBP = w.blockEditor && w.blockEditor.useBlockProps;
	var reg = w.blocks.registerBlockType;
	var el = w.element.createElement;

	blocks.forEach(function (b) {
		try {
			reg('rakutenmusic/rakuten-music-section-' + b.name, {
				title: '[楽天ミュージック] ' + b.title,
				category: 'rakutenmusic',
				keywords: ['楽天', 'ミュージック'].concat(b.keywords || []),
				icon: 'align-wide',
				description: '楽天ミュージック セクション: ' + b.title,
				edit: function () {
					var o = {
						className: 'rakutenmusic-section-placeholder',
						style: {
							padding: '16px',
							background: '#f0f0f0',
							border: '1px dashed #999',
							borderRadius: '4px',
							textAlign: 'center',
						},
					};
					var p = useBP ? useBP(o) : o;
					return el('div', p, el('strong', null, b.title));
				},
				save: function () {
					return null;
				},
			});
		} catch (err) {
			// 1件失敗しても他を登録する
		}
	});
})();
