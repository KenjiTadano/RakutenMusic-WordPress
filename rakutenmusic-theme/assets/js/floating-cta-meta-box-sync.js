(function () {
	'use strict';

	var saveTimer = null;
	var SAVE_DELAY = 400;
	var ajaxUrl = '';
	var nonce = '';
	var postId = 0;

	function getEl(id) {
		return document.getElementById(id);
	}

	function readConfigFromDom() {
		var wrapper = getEl('rakutenmusic_fcta_wrapper');
		if (wrapper && wrapper.dataset) {
			ajaxUrl = wrapper.dataset.ajaxUrl || '';
			nonce = wrapper.dataset.nonce || '';
			postId = parseInt(wrapper.dataset.postId, 10) || 0;
			return true;
		}
		var config = window.rakutenmusicFloatingCta || {};
		ajaxUrl = config.ajaxUrl || window.ajaxurl || '';
		nonce = config.nonce || '';
		postId = config.postId || 0;
		return !!(ajaxUrl && nonce && postId);
	}

	function getType() {
		var w = getEl('rakutenmusic_fcta_wrapper');
		if (!w) return 'trial';
		var r = w.querySelector('input[name="rakutenmusic_floating_cta_type"]:checked');
		return r ? r.value : 'trial';
	}

	function getFormValues() {
		var visibleEl = getEl('rakutenmusic_fcta_visible');
		var textEl = getEl('rakutenmusic_fcta_text');
		var text2El = getEl('rakutenmusic_fcta_text_line2');
		var fontSizeEl = getEl('rakutenmusic_fcta_font_size');
		var colorEl = getEl('rakutenmusic_fcta_color');
		var linkEl = getEl('rakutenmusic_fcta_link');
		var appQrEl = getEl('rakutenmusic_fcta_app_qr_url');
		var appStoreEl = getEl('rakutenmusic_fcta_app_store_url');
		if (!visibleEl) return null;
		return {
			visible: visibleEl.checked ? 'show' : 'hidden',
			type: getType(),
			text: textEl ? textEl.value || '' : '',
			text_line2: text2El ? text2El.value || '' : '',
			font_size: fontSizeEl ? (fontSizeEl.value || '16') : '16',
			color: colorEl ? colorEl.value || '' : '',
			link: linkEl ? linkEl.value || '' : '',
			app_qr_url: appQrEl ? appQrEl.value || '' : '',
			app_store_url: appStoreEl ? appStoreEl.value || '' : ''
		};
	}

	function saveViaAjax() {
		readConfigFromDom();
		if (!ajaxUrl || !nonce || !postId) return;
		var values = getFormValues();
		if (!values) return;
		var form = new FormData();
		form.append('action', 'rakutenmusic_save_floating_cta_meta');
		form.append('nonce', nonce);
		form.append('post_id', String(postId));
		form.append('visible', values.visible);
		form.append('type', values.type);
		form.append('text', values.text);
		form.append('text_line2', values.text_line2);
		form.append('font_size', values.font_size);
		form.append('color', values.color);
		form.append('link', values.link);
		form.append('app_qr_url', values.app_qr_url);
		form.append('app_store_url', values.app_store_url);
		fetch(ajaxUrl, {
			method: 'POST',
			body: form,
			credentials: 'same-origin',
			headers: {
				'X-Requested-With': 'XMLHttpRequest'
			}
		}).then(function (res) { return res.json(); }).then(function (data) {
			if (data.success) {
				// 保存成功
			}
		}).catch(function () {});
	}

	function scheduleSave() {
		if (saveTimer) clearTimeout(saveTimer);
		saveTimer = setTimeout(function () {
			saveTimer = null;
			saveViaAjax();
		}, SAVE_DELAY);
	}

	function run() {
		var visibleEl = getEl('rakutenmusic_fcta_visible');
		var wrapper = getEl('rakutenmusic_fcta_wrapper');
		var textEl = getEl('rakutenmusic_fcta_text');
		var text2El = getEl('rakutenmusic_fcta_text_line2');
		var linkEl = getEl('rakutenmusic_fcta_link');
		var appQrEl = getEl('rakutenmusic_fcta_app_qr_url');
		var appStoreEl = getEl('rakutenmusic_fcta_app_store_url');
		if (!visibleEl || !wrapper) return false;

		readConfigFromDom();

		visibleEl.addEventListener('change', function () {
			saveViaAjax();
		});
		[].forEach.call(wrapper.querySelectorAll('input[name="rakutenmusic_floating_cta_type"]') || [], function (r) {
			r.addEventListener('change', saveViaAjax);
		});
		if (textEl) {
			textEl.addEventListener('input', scheduleSave);
			textEl.addEventListener('blur', function () {
				if (saveTimer) clearTimeout(saveTimer);
				saveTimer = null;
				saveViaAjax();
			});
		}
		if (text2El) {
			text2El.addEventListener('input', scheduleSave);
			text2El.addEventListener('blur', function () {
				if (saveTimer) clearTimeout(saveTimer);
				saveTimer = null;
				saveViaAjax();
			});
		}
		if (linkEl) {
			linkEl.addEventListener('input', scheduleSave);
			linkEl.addEventListener('blur', function () {
				if (saveTimer) clearTimeout(saveTimer);
				saveTimer = null;
				saveViaAjax();
			});
		}
		if (appQrEl) {
			appQrEl.addEventListener('input', scheduleSave);
			appQrEl.addEventListener('blur', function () {
				if (saveTimer) clearTimeout(saveTimer);
				saveTimer = null;
				saveViaAjax();
			});
		}
		if (appStoreEl) {
			appStoreEl.addEventListener('input', scheduleSave);
			appStoreEl.addEventListener('blur', function () {
				if (saveTimer) clearTimeout(saveTimer);
				saveTimer = null;
				saveViaAjax();
			});
		}

		document.addEventListener('mousedown', function (e) {
			var node = e.target;
			if (!node || !node.classList) return;
			var label = (node.innerText || node.textContent || '').trim();
			if (label === '更新' || label === 'Update' || label === '公開' || label === 'Publish') {
				saveViaAjax();
			}
			if (node.classList.contains('editor-post-publish-button') || node.classList.contains('editor-post-publish-panel__toggle')) {
				saveViaAjax();
			}
		}, true);

		return true;
	}

	function tryRun() {
		if (run()) return;
		var attempts = 0;
		var t = setInterval(function () {
			attempts++;
			if (run() || attempts > 50) clearInterval(t);
		}, 200);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', tryRun);
	} else {
		setTimeout(tryRun, 100);
	}
})();
