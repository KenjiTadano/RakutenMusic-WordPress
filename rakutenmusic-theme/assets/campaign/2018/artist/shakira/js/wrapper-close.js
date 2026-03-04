$(function () {
	$('#HTMLBlock1025').nextAll().slice(0, 8).wrapAll('<div class="wrapper" id="cpn01"></div>');
	$('.wrapper').nextAll().slice(0, 4).wrapAll('<div class="wrapper" id="cpn02"></div>');
	$('#page #HTMLBlock1158 + .text-box').nextAll().slice(0, 4).wrapAll('<div class="cpnArea"></div>');
});