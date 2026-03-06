/**
 * 学生プラン用ブロックのエディター登録（useBlockProps でドラッグ・並べ替え可能に）
 * window.rakutenmusicSectionBlocksData.planStudentBlocks を PHP で渡すこと
 */
(function () {
	'use strict';

	var data = window.rakutenmusicSectionBlocksData || {};
	var planStudentBlocks = data.planStudentBlocks || [];

	function run() {
		var w = window.wp;
		if (!w || !w.blocks || !w.element || !w.blockEditor || !w.blockEditor.useBlockProps) return false;

		var unregisterBlockType = w.blocks.unregisterBlockType;
		var registerBlockType = w.blocks.registerBlockType;
		var createElement = w.element.createElement;
		var useBlockProps = w.blockEditor.useBlockProps;

		planStudentBlocks.forEach(function (b) {
			try {
				if (unregisterBlockType) try { unregisterBlockType(b.name); } catch (e) {}
				registerBlockType(b.name, {
					title: b.title,
					category: b.category || 'rakutenmusic-plan-student',
					keywords: (b.keywords || []).concat('楽天', 'ミュージック', '学生プラン'),
					icon: b.icon || 'align-wide',
					description: b.description || '',
					attributes: {},
					example: { attributes: {} },
					supports: { inserter: true },
					edit: function (props) {
						var blockProps = useBlockProps({ className: 'rakutenmusic-plan-student-block-placeholder' });
						var style = {
							padding: '16px',
							background: '#f0f0f0',
							border: '1px dashed #999',
							borderRadius: '4px',
							textAlign: 'center',
							fontSize: '13px',
						};
						return createElement('div', Object.assign({}, blockProps, { style: style }), createElement('strong', null, b.title));
					},
					save: function () { return null; },
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
