// 選択状態を監視してボタンの有効/無効を切り替える関数
function updateButtonState() {
    const select1 = document.querySelector('input[name="select1"]:checked');
    const select2 = document.querySelector('input[name="select2"]:checked');
    const select3 = document.querySelector('input[name="select3"]:checked');
    const decisionButton = document.getElementById("decisionButton");

    if (select1 && select2 && select3) {
        decisionButton.disabled = false;
    } else {
        decisionButton.disabled = true;
    }

    // circleのクラスを更新
    const circles = document.querySelectorAll(".plan__result-area__checked-item-circle");
    circles.forEach((circle) => circle.classList.remove("plan__result-area__checked-item-circle-active"));
    const selectedOptions = [select1, select2, select3].filter(Boolean);
    selectedOptions.forEach((_, index) => {
        circles[index].classList.add("plan__result-area__checked-item-circle-active");
    });
}

// ヘッダーの高さを取得する関数
function getHeaderHeight() {
    const header = document.querySelector("#page .l-header");
    if (!header) return 0;

    const style = window.getComputedStyle(header);
    const marginTop = parseFloat(style.marginTop) || 0;
    const marginBottom = parseFloat(style.marginBottom) || 0;
    const totalHeight = header.offsetHeight + marginTop + marginBottom;

    return totalHeight;
}

// スクロール
function scrollToElement(element, offset = 0) {
    const headerHeight = getHeaderHeight();
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition + offset - headerHeight;

    window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
    });
}

// リサイズ
// function handleResize() {
//     const container = document.getElementById("planSimulatorContainer");
//     if (window.innerWidth <= 767) {
//         container.style.flexDirection = "column";
//     } else {
//         container.style.flexDirection = "row";
//     }
// }

// window.addEventListener("resize", handleResize);
// document.addEventListener("DOMContentLoaded", handleResize);

// ラジオボタンの選択状態を監視
const radios = document.querySelectorAll('input[type="radio"]');
radios.forEach((radio) => {
    radio.addEventListener("change", updateButtonState);
});

function showResult() {
    // 初期表示を隠す
    $("#initialDisplay").addClass("plan__is-hidden");

    // 新たに追加: 特定の要素を非表示にする
    $(".plan__initial-message").addClass("plan__is-hidden");

    // 前の結果をすぐに隠す
    $("#resultDisplay").addClass("plan__is-hidden");
    const patterns = document.querySelectorAll("#resultDisplay > section");
    patterns.forEach((pattern) => {
        pattern.classList.add("plan__is-hidden");
        // console.log(`Hiding pattern: ${pattern.id}`); // デバッグ用ログ
    });

    // ローディング表示を見せる
    $("#loadingDisplay")
        .removeClass("plan__is-hidden")
        .addClass("fade-in")
        .one("animationend", function () {
            $(this).removeClass("fade-in");
        });

    // 0.5秒後にスクロール
    if (window.innerWidth <= 767) {
        const resultColumn = document.getElementById("resultColumn");
        setTimeout(() => {
            scrollToElement(resultColumn);
        }, 500);
    }

    // 2秒後に結果を表示
    setTimeout(() => {
        // ローディング表示を隠す
        $("#loadingDisplay").addClass("plan__is-hidden");

        // 結果表示を見せる
        $("#resultDisplay")
            .removeClass("plan__is-hidden")
            .addClass("fade-in")
            .one("animationend", function () {
                $(this).removeClass("fade-in");
            });

        // 選択された値を取得
        const select1 = document.querySelector('input[name="select1"]:checked')?.value;
        const select2 = document.querySelector('input[name="select2"]:checked')?.value;
        const select3 = document.querySelector('input[name="select3"]:checked')?.value;

        // すべてのパターンを非表示にする
        patterns.forEach((pattern) => pattern.classList.add("plan__is-hidden"));

        // 選択されたパターンを表示
        const selectedPattern = `${select1}${select2}${select3}`;
        // console.log(`Selected pattern: ${selectedPattern}`); // デバッグ用ログ
        switch (selectedPattern) {
            case "AAA":
            case "AAB":
            case "ABA":
            case "ABB":
                // console.log("学生パターン");
                $("#pattern1")
                    .removeClass("plan__is-hidden")
                    .addClass("fade-in")
                    .one("animationend", function () {
                        $(this).removeClass("fade-in");
                    });
                break;
            case "BAA":
            case "BBA":
                // console.log("楽天カード/モバイル");
                $("#pattern2")
                    .removeClass("plan__is-hidden")
                    .addClass("fade-in")
                    .one("animationend", function () {
                        $(this).removeClass("fade-in");
                    });
                break;
            case "BAB":
                // console.log("スタンダード");
                $("#pattern6")
                    .removeClass("plan__is-hidden")
                    .addClass("fade-in")
                    .one("animationend", function () {
                        $(this).removeClass("fade-in");
                    });

                break;
            case "BBB":
                // console.log("ライトプラン");
                $("#pattern8")
                    .removeClass("plan__is-hidden")
                    .addClass("fade-in")
                    .one("animationend", function () {
                        $(this).removeClass("fade-in");
                    });
                break;
            default:
                // console.log("該当するパターンがありません");
                // patterns.forEach((pattern) => pattern.classList.add("plan__is-hidden"));
                break;
        }

        // 月額プランに切り替える
        const plans = document.querySelectorAll(".plan-info");
        plans.forEach((plan) => {
            const monthlyButton = plan.querySelector('.plan__toggle-btn[data-plan="monthly"]');
            if (monthlyButton) {
                monthlyButton.click();
            }
        });
    }, 2000);
}

function showResult() {
    // 初期表示を隠す
    $("#initialDisplay").addClass("plan__is-hidden");

    // 新たに追加: 特定の要素を非表示にする
    $(".plan__initial-message").addClass("plan__is-hidden");

    // 前の結果をすぐに隠す
    $("#resultDisplay").addClass("plan__is-hidden");
    const patterns = document.querySelectorAll("#resultDisplay > section");
    patterns.forEach((pattern) => {
        pattern.classList.add("plan__is-hidden");
        // console.log(`Hiding pattern: ${pattern.id}`); // デバッグ用ログ
    });

    // ローディング表示を見せる
    $("#loadingDisplay")
        .removeClass("plan__is-hidden")
        .addClass("fade-in")
        .one("animationend", function () {
            $(this).removeClass("fade-in");
        });

    // 0.5秒後にスクロール
    if (window.innerWidth <= 767) {
        const resultColumn = document.getElementById("resultColumn");
        setTimeout(() => {
            scrollToElement(resultColumn);
        }, 500);
    }

    // 2秒後に結果を表示
    setTimeout(() => {
        // ローディング表示を隠す
        $("#loadingDisplay").addClass("plan__is-hidden");

        // 結果表示を見せる
        $("#resultDisplay")
            .removeClass("plan__is-hidden")
            .addClass("fade-in")
            .one("animationend", function () {
                $(this).removeClass("fade-in");
            });

        // 選択された値を取得
        const select1 = document.querySelector('input[name="select1"]:checked')?.value;
        const select2 = document.querySelector('input[name="select2"]:checked')?.value;
        const select3 = document.querySelector('input[name="select3"]:checked')?.value;

        // すべてのパターンを非表示にする
        patterns.forEach((pattern) => pattern.classList.add("plan__is-hidden"));

        // 選択されたパターンを表示
        const selectedPattern = `${select1}${select2}${select3}`;
        // console.log(`Selected pattern: ${selectedPattern}`); // デバッグ用ログ
        switch (selectedPattern) {
            case "AAA":
            case "AAB":
            case "ABA":
            case "ABB":
                // console.log("学生パターン");
                $("#pattern1")
                    .removeClass("plan__is-hidden")
                    .addClass("fade-in")
                    .one("animationend", function () {
                        $(this).removeClass("fade-in");
                    });
                break;
            case "BAA":
            case "BBA":
                // console.log("楽天カード/モバイル");
                $("#pattern2")
                    .removeClass("plan__is-hidden")
                    .addClass("fade-in")
                    .one("animationend", function () {
                        $(this).removeClass("fade-in");
                    });
                break;
            case "BAB":
                // console.log("スタンダード");
                $("#pattern6")
                    .removeClass("plan__is-hidden")
                    .addClass("fade-in")
                    .one("animationend", function () {
                        $(this).removeClass("fade-in");
                    });

                break;
            case "BBB":
                // console.log("ライトプラン");
                $("#pattern8")
                    .removeClass("plan__is-hidden")
                    .addClass("fade-in")
                    .one("animationend", function () {
                        $(this).removeClass("fade-in");
                    });
                break;
            default:
                // console.log("該当するパターンがありません");
                // patterns.forEach((pattern) => pattern.classList.add("plan__is-hidden"));
                break;
        }

        // 月額プランに切り替える
        const plans = document.querySelectorAll(".plan-info");
        plans.forEach((plan) => {
            const monthlyButton = plan.querySelector('.plan__toggle-btn[data-plan="monthly"]');
            if (monthlyButton) {
                monthlyButton.click();
            }
        });
    }, 2000);
}

document.addEventListener("DOMContentLoaded", function () {
    const plans = document.querySelectorAll(".plan-info");

    plans.forEach((plan) => {
        const toggleButtons = plan.querySelectorAll(".plan__toggle-btn");
        const toggleBg = plan.querySelector(".plan__toggle-bg");
        const annualContent = plan.querySelector(".plan__annual-content");
        const monthlyContent = plan.querySelector(".plan__monthly-content");

        toggleButtons.forEach((button) => {
            button.addEventListener("click", function () {
                const planType = this.getAttribute("data-plan");

                // Update active button
                toggleButtons.forEach((btn) => btn.classList.remove("plan__is-active"));
                this.classList.add("plan__is-active");

                // Update toggle background position
                if (planType === "annual") {
                    toggleBg.style.left = "50%";
                } else {
                    toggleBg.style.left = "0%";
                }

                // Update plan contents
                if (planType === "annual") {
                    plan.classList.add("plan-info--annual");
                    plan.classList.remove("plan-info--monthly");
                    annualContent.classList.add("plan__is-active");
                    monthlyContent.classList.remove("plan__is-active");
                } else {
                    plan.classList.add("plan-info--monthly");
                    plan.classList.remove("plan-info--annual");
                    monthlyContent.classList.add("plan__is-active");
                    annualContent.classList.remove("plan__is-active");
                }
            });
        });
    });

    // リセットボタンのクリックイベントを追加
    const resetButtons = document.querySelectorAll(".plan__reset-button");
    resetButtons.forEach((resetButton) => {
        resetButton.addEventListener("click", function () {
            // ラジオボタンの選択を解除
            radios.forEach((radio) => {
                radio.checked = false;
            });

            // ボタンの状態を更新
            updateButtonState();

            // 初期表示に戻す
            $("#initialDisplay").removeClass("plan__is-hidden");
            $("#resultDisplay").addClass("plan__is-hidden");
            $("#loadingDisplay").addClass("plan__is-hidden");

            // 新たに追加: 特定の要素を表示する
            $(".plan__initial-message").removeClass("plan__is-hidden");

            // circleのクラスをリセット
            const circles = document.querySelectorAll(".plan__result-area__checked-item-circle");
            circles.forEach((circle) => circle.classList.remove("plan__is-hidden"));

            // スムーズスクロール
            const container = document.getElementById("planSimulator");
            scrollToElement(container);

            // 月額プランに切り替える
            plans.forEach((plan) => {
                const monthlyButton = plan.querySelector('.plan__toggle-btn[data-plan="monthly"]');
                if (monthlyButton) {
                    monthlyButton.click();
                }
            });
        });
    });

    // 初期状態のボタンの状態を設定
    updateButtonState();

    // トリガーのクリックイベントを追加
    const trigger = document.querySelector(".plan__simulator-trigger");
    const wrapper = document.querySelector(".plan__simulator-check-wrapper");
    const triggerText = trigger.querySelector(".plan__simulator-trigger__text");

    trigger.addEventListener("click", function () {
        if (wrapper.classList.contains("plan__simulator-check-wrapper--visible")) {
            wrapper.classList.remove("plan__simulator-check-wrapper--visible");
            wrapper.style.display = "none";
            trigger.classList.remove("plan__is-active");
            triggerText.textContent = "診断スタート！";
        } else {
            wrapper.style.display = "block";
            setTimeout(() => {
                wrapper.classList.add("plan__simulator-check-wrapper--visible");
                trigger.classList.add("plan__is-active");
                triggerText.textContent = "診断を閉じる";
            }, 10); // 少し遅延させてからクラスを追加
        }

        // 追加: スムーズスクロール
        const planSimulator = document.getElementById("planSimulator");
        if (window.innerWidth <= 767) {
            scrollToElement(planSimulator); // 767px以下の場合のオフセット
        } else {
            scrollToElement(planSimulator); // それ以外の場合のオフセット
        }
    });

    // エンターキーでの動作を追加
    trigger.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            trigger.click();
        }
    });

    // ラジオボタンをエンターで動作させる
    const radioLabels = document.querySelectorAll(".radio-label");
    radioLabels.forEach((label) => {
        label.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                const radio = document.getElementById(this.getAttribute("for"));
                radio.checked = !radio.checked;
                radio.dispatchEvent(new Event("change")); // updateButtonStateを呼び出すため
            }
        });
    });
});
