$(function () {
    // +++++++++++++++++++++++++++
    //   Form
    // +++++++++++++++++++++++++++

    function doTrim(el) {
        el.value = el.value.replace(/^\s+|\s+$/g, '');
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

        el = obj.elements['answers[37810_259709]'];
        doTrim(el);
        zen2han(el);
        if (!isLength(el, 10)) {
            alert("店舗コード入力してください。");
            return false;
        }

        el = obj.elements['answers[37810_259710]'];
        doTrim(el);
        zen2han(el);
        if (!isLength(el, 10)) {
            alert("STAFF IDを入力してください。");
            return false;
        }
    }
});