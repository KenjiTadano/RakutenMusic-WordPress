// ******************************
// Slick slide
// ******************************

$('#page .slick-mypage').slick({
    autoplay: false,
    infinite: false,
    adaptiveHeight: true
});

function doTrim(el) {
    el.value = el.value.replace(/^\s+|\s+$/g, '');
}

function isInput(el) {
    return el.value.length != 0;
}

function isSelected(el) {
    return el.selectedIndex != 0;
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

    el = obj.elements['answers[34176_235013]'];
    if (!isSelected(el)) {
        alert("「プレイリストを考えてもらいたい選手を選んでください」を選択してください。");
        return false;
    }

    el = obj.elements['answers[34176_235014]'];
    doTrim(el);
    zen2han(el);
    if (!isInput(el)) {
        alert("「選手に考えてもらいたい音楽プレイリストのテーマをご記入ください」を入力してください。");
        return false;
    }

    if (!isLength(el, 256)) {
        alert("「選手に考えてもらいたい音楽プレイリストのテーマをご記入ください」は256文字以内で入力してください。");
        return false;
    }

    el = obj.elements['answers[34176_235015]'];
    doTrim(el);
    zen2han(el);
    if (!isLength(el, 256)) {
        alert("「ご記入いただいたテーマを考えた理由やコメントなど（自由記述）」は256文字以内で入力してください。");
        return false;
    }

}