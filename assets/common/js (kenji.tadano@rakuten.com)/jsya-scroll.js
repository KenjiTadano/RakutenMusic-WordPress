document.addEventListener('DOMContentLoaded', () => {
  const scrollContent = document.querySelector('.scroll-content');
  const imageWidth = 4096; // 画像の幅
  const scrollDistance = imageWidth / 2; // スクロールさせる距離 (画像の半分)

  // アニメーションの速度を調整するためのduration
  // 例: 10秒で画像の半分をスクロールさせる場合
  const animationDuration = 30; // 秒

  // CSS変数としてアニメーション時間を設定
  scrollContent.style.setProperty('--scroll-duration', `${animationDuration}s`);

  // CSSアニメーションの100%地点のtranslateXをJavaScriptで動的に設定する場合
  // これにより、CSSの@keyframesの100%を上書きできます
  const styleSheet = document.styleSheets[0];
  let keyframesRule;

  // 既存のkeyframesルールを探すか、新しく作成
  for (let i = 0; i < styleSheet.cssRules.length; i++) {
    if (styleSheet.cssRules[i].name === 'scrollAnimation') {
      keyframesRule = styleSheet.cssRules[i];
      break;
    }
  }

  if (!keyframesRule) {
    styleSheet.insertRule(`@keyframes scrollAnimation { 0% { transform: translateX(0); } 100% { transform: translateX(-${scrollDistance}px); } }`, styleSheet.cssRules.length);
    // 再度ルールを探す
    for (let i = 0; i < styleSheet.cssRules.length; i++) {
      if (styleSheet.cssRules[i].name === 'scrollAnimation') {
        keyframesRule = styleSheet.cssRules[i];
        break;
      }
    }
  } else {
    // 既存のルールがある場合は100%のtransformを更新
    // これは直接は変更できないため、新しいルールを挿入して古いものを削除するか、
    // 単純にCSS側でtransform: translateX(-2048px)を直接指定するのがシンプルです。
    // 今回はCSSで直接指定する方式を採用し、JavaScriptではアニメーション時間のみを制御します。
  }

  // CSSアニメーションのdurationを設定
  scrollContent.style.animationDuration = `${animationDuration}s`;
});
