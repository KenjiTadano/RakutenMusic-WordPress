$(function () {
    $('.campaign-detail__table .js-toggle').addClass('is-open');

    var clipboard = new ClipboardJS('.btn-copy-url');

    clipboard.on('success', function (e) {
        $('.btn-copy-url').after('<p style="color: #bf0000; font-size: 12px;">キャンペーン紹介用URLをコピーしました。</p>');
        console.info('Action:', e.action);
        console.info('Text:', e.text);
        console.info('Trigger:', e.trigger);

        e.clearSelection();
    });

    clipboard.on('error', function (e) {
        console.error('Action:', e.action);
        console.error('Trigger:', e.trigger);
    });

    function doTrim(el) {
        el.value = el.value.replace(/^\s+|\s+$/g, '');
    }

    function isInput(el) {
        return el.value.length != 0;
    }

    function isLength(el, len) {
        if ("え".length == 2) {
            len *= 2;
        }
        return el.value.length <= len;
    }

    function zen2han(el) {
        el.value = el.value.replace(/[０]/g, "0");
        el.value = el.value.replace(/[１]/g, "1");
        el.value = el.value.replace(/[２]/g, "2");
        el.value = el.value.replace(/[３]/g, "3");
        el.value = el.value.replace(/[４]/g, "4");
        el.value = el.value.replace(/[５]/g, "5");
        el.value = el.value.replace(/[６]/g, "6");
        el.value = el.value.replace(/[７]/g, "7");
        el.value = el.value.replace(/[８]/g, "8");
        el.value = el.value.replace(/[９]/g, "9");
    }

    function checkForm() {
        var el;
        var obj = document.enenForm;

        el = obj.elements['answers[39116_267343]'];
        doTrim(el);
        zen2han(el);
        if (!isInput(el)) {
            alert("「セイ(全角カナ)」を入力してください。");
            return false;
        }

        if (!isLength(el, 256)) {
            alert("「セイ(全角カナ)」は256文字以内で入力してください。");
            return false;
        }

        el = obj.elements['answers[39116_267344]'];
        doTrim(el);
        zen2han(el);
        if (!isInput(el)) {
            alert("「メイ(全角カナ)」を入力してください。");
            return false;
        }

        if (!isLength(el, 256)) {
            alert("「メイ(全角カナ)」は256文字以内で入力してください。");
            return false;
        }

    }
});