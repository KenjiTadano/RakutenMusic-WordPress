// --- ステップ1: User-Agent（ユーザーのブラウザ情報）に基づいてJSONパスを決定する ---

const menuElement = document.getElementById("entmt-common-ui-menu");

if (!menuElement) {
  console.warn('ID "entmt-common-ui-menu" の要素が見つかりませんでした。メニューのJSONパスを設定できません。');
} else {
  const userAgent = navigator.userAgent;
  let jsonPath = "/assets/common/json/music.json"; // デフォルトはPC用

  let isInAppBrowser = false; // インアプリブラウザと判断されたかどうかを示すフラグ

  // 検出ロジックの優先順位を考慮して記述します。
  // より確実性の高いものから順にチェックしていきます。

  // 1. あなたのアプリが独自にUser-Agentに追加している可能性のある文字列をチェック (元のコードのApp-)
  //    もしアプリ開発者が「App-」という文字列を確実に追加していると確認できているなら、これが最も信頼できます。
  if (userAgent.includes("App-")) {
    isInAppBrowser = true;
    console.log('User-Agentに"App-"が含まれています。');
  }
  // 2. Android WebView の一般的な検出
  //    User-Agentに"Android"と"wv"（WebViewの略）が含まれている場合が多い
  else if (userAgent.includes("Android") && userAgent.includes("wv")) {
    isInAppBrowser = true;
    console.log("Android WebView の一般的なパターンを検出しました。");
  }
  // 3. iOS WKWebView の一般的な検出
  //    - iOSデバイスであること (/iPhone|iPad|iPod/ で検出)
  //    - 通常のSafariではないこと (!/Safari/ && !/CriOS|FxiOS|EdgiOS/ で検出)
  //    iOSのWKWebViewはUser-AgentがSafariに似ているため、Safariではないことを確認するのが重要です。
  else if (
    /iPhone|iPad|iPod/.test(userAgent) && // iOSデバイスである
    !/Safari/.test(userAgent) && // "Safari" が含まれない (通常のSafariではない)
    !/CriOS|FxiOS|EdgiOS/.test(userAgent) // Chrome, Firefox, EdgeなどのWebViewではない
  ) {
    isInAppBrowser = true;
    console.log("iOS WKWebView の一般的なパターンを検出しました。");
  }
  // 4. より広範な、主要ブラウザではないモバイル環境の検出 (最後の手段)
  //    主要なブラウザの識別子がいずれも含まれず、かつモバイルデバイスである場合に、
  //    何らかのWebViewである可能性を推測します。これは確度が最も低いです。
  else if (
    !userAgent.includes("Chrome") &&
    !userAgent.includes("Safari") &&
    !userAgent.includes("Firefox") &&
    !userAgent.includes("Edge") &&
    !userAgent.includes("OPR") && // Opera
    !userAgent.includes("SamsungBrowser") &&
    /Mobile|Tablet/.test(userAgent) // モバイルデバイスである
  ) {
    isInAppBrowser = true;
    console.log("主要ブラウザではないモバイル環境を推測しました。");
  }

  // isInAppBrowser フラグに基づいてJSONパスを決定
  if (isInAppBrowser) {
    jsonPath = "/assets/common/json/music_app.json";
    console.log("インアプリ環境と判断しました。アプリ用メニューのJSONパスに設定:", jsonPath);
  } else {
    console.log("通常のブラウザ環境と判断しました。PC用メニューのJSONパスに設定:", jsonPath);
  }

  menuElement.dataset.menuJson = jsonPath;
}

// --- ステップ2: メニュー描画用の外部JavaScriptファイルを読み込む ---
// (この部分は変更なし)
const entmtCommonUiSpMenuJsPromise = new Promise((resolve, reject) => {
  const script = document.createElement("script");
  document.body.appendChild(script);
  script.onload = resolve;
  script.onerror = reject;
  script.charset = "utf-8";
  script.src = "https://image.books.rakuten.co.jp/books/img/js/entmt-common-ui/assets/js/v1/entmt-common-ui-sp-menu.js";
});

// --- ステップ3: スクリプトの読み込み結果を処理する ---
// (この部分は変更なし)
entmtCommonUiSpMenuJsPromise
  .then(() => {
    console.log("entmt-common-ui-sp-menu.js が正常に読み込まれ、メニューの初期化が完了しました。");
  })
  .catch((error) => {
    console.error("entmt-common-ui-sp-menu.js の読み込みに失敗しました:", error);
  });
