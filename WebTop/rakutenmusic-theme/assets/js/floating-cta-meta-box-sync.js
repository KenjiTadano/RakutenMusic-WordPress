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

	function getFormValues() {
		var visibleEl = getEl('rakutenmusic_fcta_visible');
		var textEl = getEl('rakutenmusic_fcta_text');
		var colorEl = getEl('rakutenmusic_fcta_color');
		if (!visibleEl || !textEl || !colorEl) return null;
		return {
			visible: visibleEl.checked ? 'show' : 'hidden',
			text: textEl.value || '',
			color: colorEl.value || ''
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
		form.append('text', values.text);
		form.append('color', values.color);
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
		var textEl = getEl('rakutenmusic_fcta_text');
		var colorEl = getEl('rakutenmusic_fcta_color');
		if (!visibleEl || !textEl || !colorEl) return false;

		readConfigFromDom();

		visibleEl.addEventListener('change', function () {
			saveViaAjax();
		});
		textEl.addEventListener('input', scheduleSave);
		textEl.addEventListener('change', scheduleSave);
		textEl.addEventListener('blur', function () {
			if (saveTimer) clearTimeout(saveTimer);
			saveTimer = null;
			saveViaAjax();
		});
		colorEl.addEventListener('input', scheduleSave);
		colorEl.addEventListener('change', scheduleSave);
		colorEl.addEventListener('blur', function () {
			if (saveTimer) clearTimeout(saveTimer);
			saveTimer = null;
			saveViaAjax();
		});

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
