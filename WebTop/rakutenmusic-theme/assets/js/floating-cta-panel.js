(function () {
	'use strict';

	// PluginDocumentSettingPanel は wp.editor または wp.editPost にあり得る
	var PluginDocumentSettingPanel = (wp.editor && wp.editor.PluginDocumentSettingPanel) || (wp.editPost && wp.editPost.PluginDocumentSettingPanel);
	if (!PluginDocumentSettingPanel) {
		return;
	}

	var el = wp.element.createElement;
	var Fragment = wp.element.Fragment;
	var useSelect = wp.data.useSelect;
	var useDispatch = wp.data.useDispatch;
	var CheckboxControl = wp.components.CheckboxControl;
	var TextControl = wp.components.TextControl;
	var PanelBody = wp.components.PanelBody;
	var __ = wp.i18n.__;

	var META_VISIBLE = '_rakutenmusic_floating_cta_visible';
	var META_TEXT = '_rakutenmusic_floating_cta_text';
	var META_COLOR = '_rakutenmusic_floating_cta_color';
	var DEFAULT_VISIBLE = '1';
	var DEFAULT_TEXT = 'いますぐ始める(無料)';
	var DEFAULT_COLOR = '#bf0000';

	function FloatingCtaPanel() {
		var postType = useSelect(function (select) {
			return select('core/editor').getCurrentPostType();
		}, []);

		if (postType !== 'page') {
			return null;
		}

		var meta = useSelect(function (select) {
			return select('core/editor').getEditedPostAttribute('meta') || {};
		}, []);

		var editPost = useDispatch('core/editor').editPost;

		var visible = meta[META_VISIBLE] !== undefined ? meta[META_VISIBLE] : DEFAULT_VISIBLE;
		var text = meta[META_TEXT] !== undefined ? meta[META_TEXT] : DEFAULT_TEXT;
		var color = meta[META_COLOR] !== undefined ? meta[META_COLOR] : DEFAULT_COLOR;

		var setMeta = function (key, value) {
			var next = {};
			next[key] = value;
			editPost({ meta: Object.assign({}, meta, next) });
		};
		var setVisible = function (value) {
			setMeta(META_VISIBLE, value ? '1' : '0');
		};
		var setText = function (value) {
			setMeta(META_TEXT, value || '');
		};
		var setColor = function (value) {
			setMeta(META_COLOR, value || '');
		};

		return el(
			PluginDocumentSettingPanel,
			{
				name: 'rakutenmusic-floating-cta',
				title: __('フローティングCTA', 'rakutenmusic-theme'),
				className: 'rakutenmusic-floating-cta-panel'
			},
			el(
				PanelBody,
				{ initialOpen: true },
				el(CheckboxControl, {
					label: __('フローティングボタンを表示する', 'rakutenmusic-theme'),
					checked: visible === '1' || visible === true,
					onChange: setVisible
				}),
				el(TextControl, {
					label: __('ボタンの文字', 'rakutenmusic-theme'),
					value: text,
					onChange: setText,
					help: __('例: いますぐ始める(無料)', 'rakutenmusic-theme')
				}),
				el(TextControl, {
					label: __('ボタンの色', 'rakutenmusic-theme'),
					value: color,
					onChange: setColor,
					help: __('例: #bf0000', 'rakutenmusic-theme')
				})
			)
		);
	}

	function register() {
		wp.plugins.registerPlugin('rakutenmusic-floating-cta-panel', {
			render: function () {
				return el(Fragment, null, el(FloatingCtaPanel));
			}
		});
	}

	if (typeof wp.domReady === 'function') {
		wp.domReady(register);
	} else {
		register();
	}
})();
