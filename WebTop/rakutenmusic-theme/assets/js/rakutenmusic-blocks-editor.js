/**
 * 楽天ミュージック セクションブロックのエディター登録
 * useBlockProps でラップし、ブロックの「上へ・下へ」で順序変更できるようにする
 */
(function () {
	var w = window.wp;
	if (!w || !w.blocks || !w.element || !w.blockEditor) return;

	var registerBlockType = w.blocks.registerBlockType;
	var createElement = w.element.createElement;
	var useBlockProps = w.blockEditor.useBlockProps;
	var blocks = typeof _rakutenmusicBlocks !== 'undefined' ? _rakutenmusicBlocks : [];

	blocks.forEach(function (b) {
		var blockName = 'rakutenmusic/rakuten-music-section-' + b.name;
		registerBlockType(blockName, {
			title: '[楽天ミュージック] ' + b.title,
			category: 'rakutenmusic',
			keywords: ['楽天', 'ミュージック'].concat(b.keywords || []),
			icon: 'align-wide',
			description: '楽天ミュージック セクション: ' + b.title,
			edit: function () {
				var blockProps = useBlockProps ? useBlockProps({ className: 'rakutenmusic-section-placeholder' }) : { className: 'rakutenmusic-section-placeholder' };
				return createElement(
					'div',
					Object.assign({}, blockProps, {
						style: {
							padding: '16px',
							background: '#f0f0f0',
							border: '1px dashed #999',
							borderRadius: '4px',
							textAlign: 'center',
						},
					}),
					createElement('strong', null, b.title),
					createElement('p', { style: { margin: '8px 0 0', fontSize: '12px', color: '#666' } }, 'ブロックを選択し、ツールバーの ↑↓ で順序を変更できます')
				);
			},
			save: function () {
				return null;
			},
		});
	});
})();
