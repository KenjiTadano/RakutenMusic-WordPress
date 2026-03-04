$(function () {
    $('.campaign-detail__table .js-toggle').addClass('is-open');

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

        el = obj.elements['answers[39123_267367]'];
        doTrim(el);
        zen2han(el);
        if (!isInput(el)) {
            alert("「紹介者様のお名前「セイ(全角カナ)」を入力してください。");
            return false;
        }

        if (!isLength(el, 256)) {
            alert("「紹介者様のお名前「セイ(全角カナ)」は256文字以内で入力してください。");
            return false;
        }

        el = obj.elements['answers[39123_267368]'];
        doTrim(el);
        zen2han(el);
        if (!isInput(el)) {
            alert("「紹介者様のお名前「メイ(全角カナ)」を入力してください。");
            return false;
        }

        if (!isLength(el, 256)) {
            alert("「紹介者様のお名前「メイ(全角カナ)」は256文字以内で入力してください。");
            return false;
        }

    }
});