function doTrim(el) {
  el.value = el.value.replace(/^\s+|\s+$/g, '');
}

function isInput(el) {
  return el.value.length != 0;
}

function isChecked(el) {
  if (el.length) {
    for (var i = 0; i < el.length; i++) {
      if (el[i].checked) {
        return true;
      }
    }
  } else {
    if (el.checked) {
      return true;
    }
  }
  return false;
}

function isLength(el, len) {
  if ('え'.length == 2) {
    len *= 2;
  }
  return el.value.length <= len;
}

function zen2han(el) {
  el.value = el.value.replace(/[０]/g, '0');
  el.value = el.value.replace(/[１]/g, '1');
  el.value = el.value.replace(/[２]/g, '2');
  el.value = el.value.replace(/[３]/g, '3');
  el.value = el.value.replace(/[４]/g, '4');
  el.value = el.value.replace(/[５]/g, '5');
  el.value = el.value.replace(/[６]/g, '6');
  el.value = el.value.replace(/[７]/g, '7');
  el.value = el.value.replace(/[８]/g, '8');
  el.value = el.value.replace(/[９]/g, '9');
}

function checkForm() {
  var el;
  var obj = document.enenForm;

  el = obj.elements['answers[42057_285146]'];
  if (!isChecked(el)) {
    alert('「AからCのうちいずれか１つを選択してください」を選択してください。');
    return false;
  }

  el = obj.elements['answers[42057_285147]'];
  doTrim(el);
  zen2han(el);
  if (!isLength(el, 256)) {
    alert('「Aを選んだ理由を教えてください」は256文字以内で入力してください。');
    return false;
  }

  el = obj.elements['answers[42057_285187]'];
  doTrim(el);
  zen2han(el);
  if (!isLength(el, 256)) {
    alert('「Cを選んだ理由を教えてください」は256文字以内で入力してください。');
    return false;
  }

  el = obj.elements['answers[42057_285188]'];
  doTrim(el);
  zen2han(el);
  if (!isInput(el)) {
    alert('「【改ページ後の質問】あなたはDについてどう思いますか？」を入力してください。');
    return false;
  }

  if (!isLength(el, 256)) {
    alert('「【改ページ後の質問】あなたはDについてどう思いますか？」は256文字以内で入力してください。');
    return false;
  }
}
