/**
 * HOW TO USE カルーセル（Vanilla JS・jQuery/Slick 不要）
 * 左右ボタンで1つずつスライド、3秒ごとに自動スライド
 */
(function () {
	'use strict';

	var TOTAL = 6;
	var AUTO_MS = 3000;

	function init() {
		var carousel = document.querySelector('[data-howtouse-carousel]');
		if (!carousel) return;

		var track = carousel.querySelector('.howtouse-carousel-track');
		var prevBtn = carousel.querySelector('.howtouse-carousel-prev');
		var nextBtn = carousel.querySelector('.howtouse-carousel-next');
		if (!track || !prevBtn || !nextBtn) return;

		var index = 0;
		var autoTimer = null;

		function setIndex(i) {
			index = i;
			if (index < 0) index = TOTAL - 1;
			if (index >= TOTAL) index = 0;
			track.style.setProperty('--howtouse-index', String(index));
			prevBtn.disabled = false;
			nextBtn.disabled = false;
		}

		function next() {
			setIndex(index + 1);
		}

		function prev() {
			setIndex(index - 1);
		}

		function startAuto() {
			stopAuto();
			autoTimer = setInterval(next, AUTO_MS);
		}

		function stopAuto() {
			if (autoTimer) {
				clearInterval(autoTimer);
				autoTimer = null;
			}
		}

		prevBtn.addEventListener('click', function () {
			prev();
			startAuto();
		});
		nextBtn.addEventListener('click', function () {
			next();
			startAuto();
		});

		carousel.addEventListener('mouseenter', stopAuto);
		carousel.addEventListener('mouseleave', startAuto);

		track.style.setProperty('--howtouse-index', '0');
		startAuto();
	}

	function run() {
		if (document.querySelector('[data-howtouse-carousel]')) {
			init();
			return true;
		}
		return false;
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', function () {
			if (!run()) {
				var attempts = 0;
				var t = setInterval(function () {
					if (run() || attempts++ >= 25) clearInterval(t);
				}, 200);
			}
		});
	} else {
		if (!run()) {
			var attempts = 0;
			var t = setInterval(function () {
				if (run() || attempts++ >= 25) clearInterval(t);
			}, 200);
		}
	}
})();
