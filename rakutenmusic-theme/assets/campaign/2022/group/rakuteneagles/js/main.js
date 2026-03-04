$(function () {
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

    function checkForm() {
        var el;
        var obj = document.enenForm;

        el = obj.elements['answers[37318_256552]'];
        if (!isChecked(el)) {
            alert("ご希望の日程と席種をお選びください");
            return false;
        }
    }
});