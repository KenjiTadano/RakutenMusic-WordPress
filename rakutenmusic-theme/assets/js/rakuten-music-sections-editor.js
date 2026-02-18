/**
 * 楽天ミュージック セクションブロックのエディター登録
 * サーバー側でレンダリングするため、edit はプレースホルダーのみ
 */
(function (wp) {
	if (!wp || !wp.blocks || !wp.element) return;

	var registerBlockType = wp.blocks.registerBlockType;
	var createElement = wp.element.createElement;

	var sections = typeof rakutenmusic_sections !== 'undefined' ? rakutenmusic_sections : [];

	sections.forEach(function (item) {
		var name = 'rakutenmusic/rakuten-music-section-' + item.slug;
		registerBlockType(name, {
			title: item.title,
			category: 'rakutenmusic',
			keywords: ['楽天', 'ミュージック', 'rakuten', 'music'].concat(item.keywords || []),
			icon: 'align-wide',
			description: item.description,
			supports: {
				html: false,
				inserter: true,
			},
			edit: function () {
				return createElement(
					'div',
					{
						className: 'rakutenmusic-section-placeholder',
						style: {
							padding: '20px',
							background: '#f0f0f0',
							border: '1px dashed #ccc',
							borderRadius: '4px',
							textAlign: 'center',
						},
					},
					createElement('strong', null, item.title),
					createElement('p', { style: { margin: '8px 0 0', fontSize: '12px', color: '#666' } }, item.description)
				);
			},
			save: function () {
				return null;
			},
		});
	});
})(window.wp);
