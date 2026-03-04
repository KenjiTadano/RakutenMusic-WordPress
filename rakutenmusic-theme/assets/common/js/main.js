// main.js - jQueryフリー、統合されたJavaScriptファイル

// グローバルスコープの汚染を防ぐための即時実行関数
(function () {
  "use strict"; // 厳格モードの適用

  // =========================================================================
  // ユーティリティ関数群 (旧 app.js の Const, Selector, Object, Position, UserInfo, PageInfo)
  // =========================================================================

  /**
   * 定数定義モジュール
   * 主にブレイクポイントやコンテンツ幅などの数値定数を管理
   */
  const Const = {
    CONTENT_WIDTH_PC: 1040, // PC版コンテンツ幅
    BREAK_POINT: 768, // PC/SPのブレイクポイント (px)
  };

  /**
   * セレクタ関連ユーティリティモジュール
   * class名をセレクタ文字列に変換するヘルパーなど
   */
  const Selector = {
    /**
     * class名をCSSセレクタ形式に変換
     * @param {string} className - クラス名
     * @returns {string} - CSSセレクタ文字列 (例: ".my-class")
     */
    class: (className) => `.${className}`,
  };

  /**
   * オブジェクト存在チェックユーティリティモジュール
   * 要素の存在確認に使用
   */
  const ObjectUtil = {
    // `Object` はJavaScriptの組み込みオブジェクトと衝突するためリネーム
    /**
     * オブジェクトが存在するかどうかをチェック
     * @param {any} obj - チェックするオブジェクト
     * @returns {boolean} - 存在すれば true
     */
    isExist: (obj) => typeof obj !== "undefined" && obj !== null,
    /**
     * クラス名で要素が存在するかどうかをチェック
     * @param {string} className - クラス名
     * @returns {boolean} - 存在すれば true
     */
    isExistByClassName: (className) => {
      const element = document.getElementsByClassName(className)[0];
      return ObjectUtil.isExist(element);
    },
  };

  /**
   * 要素の座標関連ユーティリティモジュール
   * スクロール位置や要素のトップ位置を取得
   */
  const Position = {
    /**
     * ウィンドウのスクロールトップ位置を取得
     * @returns {number} - スクロールトップ位置 (px)
     */
    windowTop: () => window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop,
    /**
     * ウィンドウのスクロールボトム位置を取得
     * @returns {number} - スクロールボトム位置 (px)
     */
    windowBottom: () => (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight,
    /**
     * 指定された要素のドキュメントからのトップ位置を取得
     * @param {HTMLElement} element - 対象要素
     * @returns {number} - 要素のトップ位置 (px)
     */
    element: (element) => {
      if (element) {
        // getBoundingClientRect().top はビューポートからの相対位置なので、
        // window.pageYOffset を加えてドキュメントからの絶対位置にする
        return element.getBoundingClientRect().top + window.pageYOffset;
      }
      return 0;
    },
  };

  /**
   * ユーザー情報（デバイス、レイアウト）判定モジュール
   */
  const UserInfo = {
    device: {
      SP: "sp", // スマートフォン
      TB: "tb", // タブレット
      PC: "pc", // PC
    },
    layout: {
      SP: "sp", // SPレイアウト
      PC: "pc", // PCレイアウト
    },
    /**
     * ユーザーエージェント文字列を小文字で取得
     * @returns {string} - 小文字のユーザーエージェント文字列
     */
    ua: () => window.navigator.userAgent.toLowerCase(),
    /**
     * デバイスタイプを判定
     * @returns {string} - 'sp', 'tb', 'pc' のいずれか
     */
    getDevice: function () {
      const _UA = this.ua();
      if (_UA.indexOf("iphone") !== -1 || _UA.indexOf("ipod") !== -1 || (_UA.indexOf("android") !== -1 && _UA.indexOf("mobile") !== -1)) {
        return this.device.SP;
      } else if (_UA.indexOf("ipad") !== -1 || (_UA.indexOf("android") !== -1 && _UA.indexOf("mobile") === -1)) {
        return this.device.TB;
      } else {
        return this.device.PC;
      }
    },
    /**
     * 現在のウィンドウ幅に基づいてレイアウトタイプを判定
     * @returns {string} - 'sp' または 'pc'
     */
    getLayout: () => (window.innerWidth < Const.BREAK_POINT ? UserInfo.layout.SP : UserInfo.layout.PC),
  };

  /**
   * ページ情報取得モジュール
   * 現在のURLパスからカテゴリ情報を取得
   */
  const PageInfo = {
    /**
     * 現在のURLパスからカテゴリ名を取得
     * 例: /campaign/hoge/ -> campaign
     * @returns {string} - カテゴリ名
     */
    getCurrentCategory: () => {
      const page_list = window.location.pathname.split("/");
      if (page_list.length > 2) {
        return page_list[1];
      }
      return "";
    },
  };

  // =========================================================================
  // 共通機能群 (Intersection Observer, Smooth Scroll, Lazy Load, etc.)
  // =========================================================================

  /**
   * Intersection Observer を設定する汎用関数
   * 要素がビューポートに入った/出たときにコールバックを実行
   * @param {string} targetSelector - 監視対象要素のCSSセレクタ
   * @param {function(HTMLElement, boolean, IntersectionObserver)} callback - 交差状態が変化したときに呼び出される関数
   * @param {IntersectionObserverInit} options - Intersection Observer のオプション
   * @returns {IntersectionObserver|null} - 設定されたオブザーバー、または要素が見つからない場合は null
   */
  const setupIntersectionObserver = (targetSelector, callback, options = {}) => {
    const targetElement = document.querySelector(targetSelector);
    if (!targetElement) return null;

    const defaultOptions = {
      root: null, // ビューポートをルート要素とする
      rootMargin: "0px",
      threshold: 0.1, // 10%が見えたらコールバックを呼び出す
    };
    const observerOptions = { ...defaultOptions, ...options };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        // コールバック関数に target, isIntersecting, observer インスタンスを渡す
        callback(entry.target, entry.isIntersecting, obs);
      });
    }, observerOptions);

    observer.observe(targetElement);
    return observer;
  };

  /**
   * スムーズスクロール機能の設定 (旧 scroll-animation.js)
   * '.scroll' クラスを持つ要素のクリックイベントを処理
   */
  const setupSmoothScroll = () => {
    const SCROLL_SPEED = 500; // スクロールアニメーション速度 (ms)
    const PC_ADDITIONAL_OFFSET = 96; // PC時の追加オフセット (例: サブヘッダーの高さなど)

    document.querySelectorAll(".scroll").forEach((link) => {
      link.addEventListener("click", function (event) {
        event.preventDefault(); // デフォルトのページ内ジャンプを阻止

        const href = this.getAttribute("href");
        let targetSelector = href === "#" || href === "" ? "html" : href;

        const targetElement = document.querySelector(targetSelector);
        if (!targetElement) {
          console.warn(`Scroll target "${targetSelector}" not found.`);
          return;
        }

        const headerElement = document.querySelector("header");
        const navHeight = headerElement ? headerElement.offsetHeight : 0;

        // スクロール先の要素のドキュメントからの絶対位置を計算
        let position = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

        // PCレイアウトの場合、追加オフセットを適用
        if (window.innerWidth >= Const.BREAK_POINT) {
          position -= PC_ADDITIONAL_OFFSET;
        }

        // スムーズスクロールを実行
        window.scrollTo({
          top: position,
          behavior: "smooth",
        });
      });
    });
  };

  /**
   * フッターのビューポート内検出によるCTAボタン表示制御 (旧 HTMLインラインスクリプト)
   * Intersection Observer を使用して `jquery.inview.min.js` を代替
   */
  const setupFloatingCtaVisibility = () => {
    const footer = document.querySelector(".l-footer");
    const floatingCtaButton = document.querySelector("#page .floating-cta-button");

    if (footer && floatingCtaButton) {
      setupIntersectionObserver(
        ".l-footer",
        (target, isIntersecting) => {
          if (isIntersecting) {
            // フッターがビューポートに入ったらボタンを非表示
            floatingCtaButton.style.display = "none";
          } else {
            // フッターがビューポートから出たらボタンを表示
            floatingCtaButton.style.display = "block";
          }
        },
        { threshold: 0.1 }
      ); // フッターが10%見えたらトリガー
    }
  };

  /**
   * UA 'App-jp' に応じたボタン表示制御 (旧 HTMLインラインスクリプト)
   */
  const handleAppButtonVisibility = () => {
    const _UA = navigator.userAgent;
    if (_UA.indexOf("App-") > -1) {
      // 複数の要素を一括で非表示にする
      document.querySelectorAll(".iap-store-link, .btn-apply--caption, .trial-btn, .sp-menu-mypage, .btn-mypage, .membercart-link").forEach((el) => {
        el.classList.add("is-hidden");
      });
      // .iap-store-link はis-hiddenを外す必要があるため、別途処理
      const iapStoreLink = document.querySelector(".iap-store-link");
      if (iapStoreLink) {
        iapStoreLink.classList.remove("is-hidden"); // 特定の要素は表示に戻す
      }
    }
  };

  /**
   * `notice.html` をAjaxで読み込みDOMに挿入 (旧 HTMLインラインスクリプト)
   * `fetch` API を使用して jQuery.ajax を代替
   */
  const loadNoticeHtml = () => {
    // cdn_url はHTMLで定義されているグローバル変数
    // もしHTMLから削除してmain.jsで定義するなら、ここで `const cdn_url = "...";` とする
    if (typeof cdn_url !== "undefined") {
      const src = "/other/static/notice.html"; // cdn_url を使う場合は `${cdn_url}/other/static/notice.html`
      fetch(src)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.text();
        })
        .then((data) => {
          const lContent = document.querySelector(".l-content");
          if (lContent) {
            // .l-content の直前にHTMLを挿入
            lContent.insertAdjacentHTML("beforebegin", data);
          }
        })
        .catch((error) => {
          console.error("Failed to load notice.html:", error);
        });
    }
  };

  /**
   * 画像の遅延読み込み機能 (旧 jquery.lazy.min.js の代替)
   * Intersection Observer API を使用
   * `data-src`, `data-srcset`, `data-bg-src` 属性に対応
   */
  const lazyLoadImages = () => {
    // 遅延読み込み対象となる要素をすべて選択
    const lazyElements = document.querySelectorAll("img[data-src], img[data-srcset], source[data-srcset], [data-bg-src]");

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 要素がビューポートに入ったら
          const targetElement = entry.target;

          if (targetElement.tagName === "SOURCE") {
            // <picture>内の<source>要素の場合、srcset属性を更新
            if (targetElement.dataset.srcset) {
              targetElement.srcset = targetElement.dataset.srcset;
            }
          } else if (targetElement.tagName === "IMG") {
            // <img>要素の場合、src/srcset属性を更新
            if (targetElement.dataset.src) {
              targetElement.src = targetElement.dataset.src;
            }
            if (targetElement.dataset.srcset) {
              targetElement.srcset = targetElement.dataset.srcset;
            }
          } else if (targetElement.dataset.bgSrc) {
            // 背景画像の場合、style.backgroundImage を更新
            targetElement.style.backgroundImage = `url(${targetElement.dataset.bgSrc})`;
          }

          targetElement.classList.add("lazyloaded"); // 読み込み完了を示すクラスを追加
          observer.unobserve(targetElement); // 一度読み込んだら監視を停止
        }
      });
    });

    lazyElements.forEach((el) => imageObserver.observe(el)); // 各要素を監視対象に追加
  };

  /**
   * 要素がウィンドウの最下部に到達したことを検知するイベント (旧 jquery.bottom-1.0.js の代替)
   * スクロールイベントとCustomEventを使用
   * @param {string} elementSelector - 監視対象要素のCSSセレクタ、または 'window'
   * @param {number} proximity - 最下部からの距離 (px)。この距離に入ったらイベントをトリガー
   */
  const setupBottomEvent = (elementSelector = "window", proximity = 0) => {
    const target = elementSelector === "window" ? window : document.querySelector(elementSelector);
    if (!target) return;

    const checkBottom = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      const clientHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;

      let isAtBottom = false;

      if (target === window) {
        // ウィンドウ全体の場合、スクロール可能な高さと現在の位置を比較
        isAtBottom = scrollHeight - (scrollTop + clientHeight) <= proximity;
      } else {
        // 特定の要素の場合、その要素のボトム位置とビューポートのボトム位置を比較
        const rect = target.getBoundingClientRect();
        isAtBottom = rect.bottom <= clientHeight + proximity;
      }

      // 'bottom' というカスタムイベントをディスパッチ
      target.dispatchEvent(new CustomEvent("bottom", { detail: { isBottom: isAtBottom } }));
    };

    // スクロールとリサイズイベントを監視
    target.addEventListener("scroll", checkBottom);
    window.addEventListener("resize", checkBottom);
    checkBottom(); // 初期状態のチェック
  };

  /**
   * フローティングバナーの表示/非表示制御 (旧 stack-floating-banner.js)
   */
  const FloatingBannerController = (() => {
    const FLOATING_BANNER_SELECTOR = ".floating_wrapper";
    const CLOSE_BUTTON_SELECTOR = ".floating_wrapper .close";
    const SCROLL_THRESHOLD = 600; // トップページでFVを隠すスクロールしきい値

    const floatingBanner = document.querySelector(FLOATING_BANNER_SELECTOR);
    const closeButton = document.querySelector(CLOSE_BUTTON_SELECTOR);

    if (!floatingBanner) {
      return { init: () => {} }; // バナー要素が存在しない場合は何もしない
    }

    /**
     * スクロール位置に基づいてバナーの表示/非表示を切り替える
     */
    const handleScroll = () => {
      if (window.scrollY > SCROLL_THRESHOLD) {
        floatingBanner.style.display = "block";
      } else {
        floatingBanner.style.display = "none";
      }
    };

    /**
     * フローティングバナーの初期化
     */
    const init = () => {
      if (window.location.pathname === "/") {
        // トップページの場合のみスクロールイベントを監視
        window.addEventListener("scroll", handleScroll);
        handleScroll(); // 初期状態のチェック
      } else {
        // トップページ以外の場合、常に表示
        floatingBanner.style.display = "block";
      }

      // 閉じるボタンのイベントリスナーを設定
      if (closeButton) {
        closeButton.addEventListener("click", () => {
          floatingBanner.remove(); // バナー要素をDOMから削除
          // 必要に応じて localStorage などで再表示しない制御を追加
        });
      }
    };
    return { init: init };
  })();

  // =========================================================================
  // メイン機能モジュール群 (旧 app.js の Viewport, Header, Container, GlobalNavigation, SideMenu, Image, Toggle, Slider, EntryList)
  // =========================================================================

  /**
   * Viewport設定モジュール
   * タブレット向けにビューポートを調整
   */
  const ViewportModule = (function () {
    const change = () => {
      if (UserInfo.getDevice() === UserInfo.device.TB) {
        const viewportMeta = document.querySelector("meta[name='viewport']");
        if (viewportMeta) {
          viewportMeta.setAttribute("content", "width=" + Const.CONTENT_WIDTH_PC + "px");
        }
      }
    };
    return { init: change };
  })();

  /**
   * ヘッダー機能モジュール
   * スクロールによる固定、SPメニュー開閉、ナビゲーションハイライト
   */
  const HeaderModule = (function () {
    const headerElement = document.querySelector("header");
    const gnavMenu = document.querySelector(".gnav-menu"); // SPメニュー開閉トリガー (ハンバーガーアイコン)
    const gnavMenuClose = document.querySelector(".gnav-menu-close"); // SPメニュー閉じるボタン
    const gnavSpMenuList = document.querySelector(".gnav-sp-menu-list"); // SPメニューリスト本体

    const class_name = {
      target: "l-header",
      fixed: "is-fixed", // ヘッダー固定時のクラス
    };

    /**
     * スクロール位置に応じてヘッダーの固定スタイルを適用
     */
    const setFixedStyle = () => {
      if (!headerElement) return;

      const pos = Position.windowTop();
      if (pos > 0) {
        headerElement.classList.add(class_name.fixed);
        // Pitariバナー、Unification Common Headerを非表示
        document.getElementById("mkdiv_header_pitari")?.classList.add("is-hidden");
        document.getElementById("entmt-common-ui-topbar")?.classList.add("is-hidden");
      } else {
        headerElement.classList.remove(class_name.fixed);
        // Pitariバナー、Unification Common Headerを表示
        document.getElementById("mkdiv_header_pitari")?.classList.remove("is-hidden");
        document.getElementById("entmt-common-ui-topbar")?.classList.remove("is-hidden");
      }
    };

    /**
     * URL末尾のスラッシュを削除するヘルパー関数
     * @param {string} str - 対象文字列
     * @returns {string} - 末尾スラッシュ削除後の文字列
     */
    const removeTrailingSlash = (str) => str.replace(/\/$/, "");

    /**
     * 現在のページに対応するナビゲーションリンクをハイライト
     */
    const highlightCurrentNav = () => {
      let currentPath = removeTrailingSlash(window.location.pathname);
      document.querySelectorAll("a.gnav-menu-link").forEach((link) => {
        let href = removeTrailingSlash(link.getAttribute("href") || "");
        if (currentPath === href) {
          link.classList.add("is-selected"); // ハイライトクラスを追加
        }
      });
    };

    /**
     * SPメニューの開閉機能設定
     * (jQueryのslideDown/slideUpをCSS Transitionで代替)
     */
    const setupSpMenuToggle = () => {
      if (gnavMenu && gnavMenuClose && gnavSpMenuList) {
        // ハンバーガーアイコンクリックでメニューを開く
        gnavMenu.addEventListener("click", () => {
          gnavMenu.classList.add("is-hidden");
          gnavMenuClose.classList.remove("is-hidden");
          gnavSpMenuList.style.display = "block"; // displayをblockにしてCSSアニメーションを可能にする
          // CSSアニメーションをトリガーするために少し遅延させる
          setTimeout(() => gnavSpMenuList.classList.add("is-open"), 10);
        });
        // 閉じるボタンクリックでメニューを閉じる
        gnavMenuClose.addEventListener("click", () => {
          gnavMenu.classList.remove("is-hidden");
          gnavMenuClose.classList.add("is-hidden");
          gnavSpMenuList.classList.remove("is-open"); // CSSアニメーションで閉じる
          // アニメーション完了後に display を none に戻す
          gnavSpMenuList.addEventListener(
            "transitionend",
            function handler() {
              gnavSpMenuList.style.display = "none";
              gnavSpMenuList.removeEventListener("transitionend", handler);
            },
            { once: true }
          ); // イベントリスナーは一度だけ実行
        });
      }
    };

    /**
     * ヘッダーモジュールの初期化
     */
    const init = () => {
      setFixedStyle(); // 初期ロード時の固定スタイル設定
      highlightCurrentNav(); // 現在のページナビゲーションのハイライト
      setupSpMenuToggle(); // SPメニューのトグル機能設定
    };

    return {
      init: init,
      scroll: setFixedStyle, // スクロールイベント時に呼び出される関数
    };
  })();

  /**
   * コンテナ機能モジュール
   * `l-container` 要素の固定スタイルを管理 (HeaderModuleと類似)
   */
  const ContainerModule = (function () {
    const containerElement = document.querySelector(Selector.class("l-container"));
    const class_name = {
      fixed: "is-fixed", // コンテナ固定時のクラス
    };

    /**
     * スクロール位置に応じてコンテナの固定スタイルを適用
     */
    const setFixedStyle = () => {
      if (!containerElement) return;
      const pos = Position.windowTop();
      if (pos > 0) {
        containerElement.classList.add(class_name.fixed);
      } else {
        containerElement.classList.remove(class_name.fixed);
      }
    };
    return {
      init: setFixedStyle,
      scroll: setFixedStyle,
    };
  })();

  /**
   * グローバルナビゲーション機能モジュール
   * 現在のカテゴリに基づいてナビゲーション項目をハイライト
   */
  const GlobalNavigationModule = (function () {
    const class_name = {
      nav: "global-nav__item",
      current: "is-current", // 現在選択中のクラス
    };
    /**
     * 現在のカテゴリに基づいてナビゲーション項目をハイライト
     */
    const setCurrentStyle = () => {
      const nav_selector = Selector.class(class_name.nav);
      const category_name = PageInfo.getCurrentCategory();
      let selectedLink;

      if (category_name === "") {
        // トップページの場合
        selectedLink = document.querySelector(`${nav_selector} a[href="/"]`);
      } else {
        // カテゴリページの場合
        selectedLink = document.querySelector(`${nav_selector} a[href^="/${category_name}/"]`);
      }

      if (selectedLink) {
        // リンクの親要素（.global-nav__item）にクラスを追加
        selectedLink.closest(nav_selector)?.classList.add(class_name.current);
      }
    };
    return { init: setCurrentStyle };
  })();

  /**
   * サイドメニュー機能モジュール
   * `jquery.sticky-kit` の代替を検討
   */
  const SideMenuModule = (function () {
    const class_name = {
      target: "js-sticky-target",
      container: "js-sticky-container",
    };

    /**
     * サイドメニューの固定機能
     * 現代のブラウザではCSSの `position: sticky;` で代替可能
     * 複雑なロジックが必要な場合は Intersection Observer とJSで実装
     */
    const fixed = () => {
      const stickyTarget = document.querySelector(Selector.class(class_name.target));
      const stickyContainer = document.querySelector(Selector.class(class_name.container));

      if (stickyTarget && stickyContainer) {
        // ここに position: sticky; をサポートしないブラウザ向けのフォールバック、
        // またはより複雑なロジックを実装します。
        // 例: stickyTarget.style.position = 'sticky';
        // stickyTarget.style.top = '0px'; // 必要に応じて
        console.log("SideMenu fixed logic would go here, often replaced by CSS position: sticky.");
      }
    };
    return { init: fixed };
  })();

  /**
   * `data-src` 画像読み込みモジュール (旧 app.js の ImageModule)
   * Lazy Load機能と重複するため、使用状況に応じて整理が必要
   */
  const ImageModule = (function () {
    const attr_name = "data-src";

    /**
     * 指定スコープ内の `data-src` 画像を `src` にロード
     * @param {HTMLElement|null} scope - 検索スコープ要素、nullならドキュメント全体
     */
    const load = (scope) => {
      const targets = scope ? scope.querySelectorAll(`img[${attr_name}]`) : document.querySelectorAll(`img[${attr_name}]`);
      targets.forEach((element) => {
        element.setAttribute("src", element.getAttribute(attr_name));
        element.removeAttribute(attr_name);
      });
    };

    /**
     * SPデバイスまたはSPレイアウト以外の場合に画像をロード
     * (Lazy Loadと重複する可能性が高いため、用途の見直しが必要)
     */
    const loadExceptSP = (scope) => {
      if (UserInfo.getDevice() === UserInfo.device.PC || UserInfo.getLayout() === UserInfo.layout.PC) {
        load(scope);
      }
    };
    return {
      init: loadExceptSP, // 初期化時にPCの場合にロード
      load: load, // 任意のタイミングでロード
    };
  })();

  /**
   * トグル機能モジュール (アコーディオンなど)
   * `js-toggle` クラスを持つ要素の開閉を制御
   */
  const ToggleModule = (function () {
    const class_name = {
      toggle_container: "js-toggle",
      toggle_type: "js-toggle--keep-open",
      animation_type: "js-toggle--fade",
      trigger: "js-toggle__trigger",
      target: "js-toggle__target",
      state_open: "is-open",
      state_closing: "is-closing",
    };

    /**
     * トグルコンテナ内の画像をロード
     * (ImageModule.load を使用)
     * @param {HTMLElement} container - トグルコンテナ要素
     */
    const loadImage = (container) => {
      const target = container.querySelector(Selector.class(class_name.target));
      if (target) ImageModule.load(target);
    };

    /**
     * トグルコンテナの状態（開閉）を切り替える
     * @param {HTMLElement} container - トグルコンテナ要素
     */
    const changeState = (container) => {
      if (container.classList.contains(class_name.toggle_type)) {
        // 開いた状態を維持するタイプ
        container.classList.add(class_name.state_open);
      } else {
        // 通常のトグル（閉じることも可能）
        if (container.classList.contains(class_name.animation_type)) {
          // フェードアニメーションタイプ
          if (container.classList.contains(class_name.state_open)) {
            // 開いている -> 閉じるとき
            container.classList.add(class_name.state_closing);
            setTimeout(() => {
              container.classList.remove(class_name.state_open);
              container.classList.remove(class_name.state_closing);
            }, 1500); // アニメーション時間に合わせて調整
          } else {
            // 閉じている -> 開くとき
            container.classList.add(class_name.state_open);
          }
        } else {
          // シンプルなトグル（クラスの追加/削除）
          container.classList.toggle(class_name.state_open);
        }
      }
    };

    /**
     * クリックイベントハンドラを設定
     */
    const setupClickEvent = () => {
      document.querySelectorAll(Selector.class(class_name.trigger)).forEach((trigger) => {
        trigger.addEventListener("click", function (event) {
          event.preventDefault();
          const toggleContainer = this.closest(Selector.class(class_name.toggle_container));
          if (toggleContainer) {
            loadImage(toggleContainer); // 画像をロード
            changeState(toggleContainer); // 状態を切り替え
          }
        });
      });
    };
    return { click: setupClickEvent };
  })();

  /**
   * スライダー機能モジュール (旧 app.js の SliderModule, common_20241129.js の initializeSlickSliderNative)
   * Splide.js を使用して Slick Slider を代替
   */
  const SliderModule = (function () {
    const class_name = {
      container: "slider", // スライダーの親要素セレクタ (今回は使ってないが念のため)
      initialized: "splide-initialized", // Splide初期化後のクラス名
    };

    /**
     * Splideスライダーを初期化するヘルパー関数
     * @param {HTMLElement} sliderElement - スライダー要素
     * @param {object} options - Splideのオプション
     * @returns {Splide|null} - Splideインスタンス、または初期化失敗時はnull
     */
    const makeSplide = (sliderElement, options) => {
      // Splideが読み込まれているか、かつまだ初期化されていないかを確認
      if (typeof Splide !== "undefined" && !sliderElement.classList.contains(class_name.initialized)) {
        const splide = new Splide(sliderElement, options);

        // 自動再生オプションがあればマウント時に再生
        // ※ Intersection Observer で制御するため、Splideのautoplayオプションは使わず
        // splide.on('mounted', () => { splide.play(); });

        splide.mount();
        sliderElement.classList.add(class_name.initialized);
        return splide;
      }
      return null;
    };

    /**
     * Splideの自動再生をIntersection Observerで制御する
     * @param {string} sectionSelector - スライダーを含むセクションのセレクタ
     * @param {HTMLElement} sliderElement - スライダー要素
     * @param {Splide} splideInstance - Splideインスタンス
     */
    const setupSplideAutoplay = (sectionSelector, sliderElement, splideInstance) => {
      if (!splideInstance) return;

      // スライダーを含むセクションが見えたら再生、見えなくなったら停止
      setupIntersectionObserver(
        sectionSelector,
        (target, isIntersecting) => {
          if (isIntersecting) {
            splideInstance.play();
          } else {
            splideInstance.pause();
          }
        },
        { threshold: 0.1 }
      ); // 閾値は適宜調整
    };

    /**
     * 各スライダーの初期化ロジック (旧 common_20241129.js の initializeSlickSliderNative)
     * Intersection Observer をトリガーにSplideを初期化
     * @param {string} sectionSelector - スライダーを含むセクションのセレクタ
     * @param {string} sliderSelector - スライダー本体のセレクタ (例: '.cp-for-newsubscriber')
     * @param {number} perPagePc - PCでの表示スライド数
     * @param {object} [paddingPc] - PCでの左右パディング { left: '15%', right: '15%' }
     * @param {number} [gapPc] - PCでのスライド間隔 (例: '2rem')
     * @param {number} [perPageTablet] - タブレットでの表示スライド数 (PCと同じなら省略可)
     * @param {object} [paddingTablet] - タブレットでの左右パディング
     * @param {number} [gapTablet] - タブレットでのスライド間隔
     * @param {number} [perPageMobile] - モバイルでの表示スライド数 (タブレットと同じなら省略可)
     * @param {object} [paddingMobile] - モバイルでの左右パディング
     * @param {number} [gapMobile] - モバイルでのスライド間隔
     */
    const initializeSplideSlider = (sectionSelector, sliderSelector, perPagePc, paddingPc, gapPc, perPageTablet = perPagePc, paddingTablet = paddingPc, gapTablet = gapPc, perPageMobile = perPageTablet, paddingMobile = paddingTablet, gapMobile = gapTablet) => {
      const sectionElement = document.querySelector(sectionSelector);
      const sliderElement = document.querySelector(sliderSelector);

      if (!sectionElement || !sliderElement) {
        console.warn(`Splide: Section or slider element not found for ${sectionSelector} - ${sliderSelector}`);
        return;
      }

      // セクションが見えたらスライダーを初期化（一度だけ）
      setupIntersectionObserver(
        sectionSelector,
        (target, isIntersecting, observer) => {
          if (isIntersecting) {
            // Splide オプションをSlickの設定から変換
            const splideOptions = {
              type: "loop", // infinite: true に相当
              perPage: 3, // PCでの表示枚数
              arrows: true,
              pagination: true, // dots: true に相当
              speed: 300,
              focus: "center", // centerMode: true に相当
              autoplay: true, // Intersection Observer で制御するため初期はfalse
              interval: 3000, // 自動再生の間隔 (ms)
              padding: paddingPc, // PCでのパディング
              gap: gapPc, // PCでのスライド間隔

              breakpoints: {
                [Const.BREAK_POINT - 1]: {
                  // 767px以下 (タブレット)
                  perPage: perPageTablet,
                  focus: perPageTablet > 1 ? "center" : 0,
                  padding: paddingTablet,
                  gap: gapTablet,
                },
                440: {
                  // 440px以下 (モバイル)
                  perPage: perPageMobile,
                  focus: perPageMobile > 1 ? "center" : 0,
                  padding: paddingMobile,
                  gap: gapMobile,
                },
              },
            };

            const splideInstance = makeSplide(sliderElement, splideOptions);

            if (splideInstance) {
              // 自動再生を設定（Intersection Observer で制御）
              setupSplideAutoplay(sectionSelector, sliderElement, splideInstance);
            }

            observer.unobserve(target); // 一度初期化したら監視を停止
          }
        },
        { threshold: 0.1 }
      );
    };

    /**
     * スライダーモジュールの初期化
     */
    const init = () => {
      // common_20241129.js で定義されていた各スライダーの初期化

      // campaign スライダー: PC版は中央主役、左右見切れ
      initializeSplideSlider(
        "#top-section-campaign",
        "#top-section-campaign .splide", // HTMLのセレクタに合わせて調整
        1, // PC perPage
        { left: "15%", right: "15%" }, // PC padding
        "2rem", // PC gap
        1, // Tablet perPage
        { left: "10%", right: "10%" }, // Tablet padding
        "1rem", // Tablet gap
        1, // Mobile perPage
        { left: "5%", right: "5%" }, // Mobile padding
        "0.5rem" // Mobile gap
      );

      // others スライダー: campaign と同様の設定
      initializeSplideSlider(
        "#top-section-others",
        "#top-section-others .splide", // HTMLのセレクタに合わせて調整
        1, // PC perPage
        { left: "15%", right: "15%" }, // PC padding
        "2rem", // PC gap
        1, // Tablet perPage
        { left: "10%", right: "10%" }, // Tablet padding
        "1rem", // Tablet gap
        1, // Mobile perPage
        { left: "5%", right: "5%" }, // Mobile padding
        "0.5rem" // Mobile gap
      );

      // groupservices スライダー: 元は8枚表示だったので、これは1枚表示にせず元の意図を尊重
      // PCで4枚表示、Tabletで2枚、Mobileで1枚など
      initializeSplideSlider(
        "#top-section-groupservices",
        "#top-section-groupservices .splide", // HTMLのセレクタに合わせて調整
        4, // PC perPage
        { left: "15%", right: "15%" }, // PC padding
        "2rem", // PC gap
        3, // Tablet perPage
        { left: "10%", right: "10%" }, // Tablet padding
        "1rem", // Tablet gap
        3, // Mobile perPage
        { left: "%", right: "10%" }, // Mobile padding
        "0.5rem" // Mobile gap
      );
    };

    /**
     * スクロールイベント時に呼び出される関数 (旧 app.js の Slider.scroll)
     * Splide の自動再生は Intersection Observer で制御するため、この関数は不要になる
     */
    const scroll = () => {
      // console.log('SliderModule scroll event - no longer needed with Intersection Observer for autoplay.');
      // 必要であれば、Splide以外のスライダーのスクロール関連ロジックをここに記述
    };

    return {
      init: init,
      scroll: scroll, // 互換性のために残すか、完全に削除する
    };
  })();

  /**
   * 記事リストに「New」アイコンを付ける機能モジュール
   */
  const EntryListModule = (function () {
    const date_period = 5; // 何日前までを「New」とするか
    const class_name = {
      container: "js-has-new-icon", // Newアイコンを付ける対象の親要素
      card: "feature__card", // 各記事カード要素
      new: "is-new", // Newアイコン表示用のクラス
    };

    /**
     * 記事カードに「New」アイコンを付ける
     */
    const setIcon = () => {
      const container = document.querySelector(Selector.class(class_name.container));
      if (!container) return;

      const now = new Date();
      // 期間指定日を計算 (現在日時 - date_period 日)
      const period_date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - date_period);

      container.querySelectorAll(Selector.class(class_name.card)).forEach((card) => {
        // 記事の公開日時を <time datetime="..."> から取得
        const pub_date_str = card.querySelector("time")?.getAttribute("datetime");
        if (pub_date_str) {
          // YYYY-MM-DD 形式から Date オブジェクトを生成
          const pub_date_arr = pub_date_str.split("-");
          const pub_date = new Date(parseInt(pub_date_arr[0]), parseInt(pub_date_arr[1]) - 1, parseInt(pub_date_arr[2])); // 月は0から始まるため-1

          // 公開日時が期間指定日以降であれば「New」クラスを追加
          if (pub_date.getTime() >= period_date.getTime()) {
            card.classList.add(class_name.new);
          }
        }
      });
    };
    return { init: setIcon };
  })();

  /**
   * 検索機能モジュール (旧 common_20241129.js)
   */
  const SearchHandler = (() => {
    const RMUSIC_URI_HOST = "https://music.rakuten.co.jp";
    const inputElement = document.getElementById("search-key");
    let initialPlaceholder = "";
    const searchButton = document.querySelector(".searchIcon");

    // inputElement が存在しない場合は、init メソッドが何もしないオブジェクトを返す
    if (!inputElement) {
      return { init: () => {} };
    }

    initialPlaceholder = inputElement.getAttribute("placeholder");

    /**
     * 検索結果ページを開く
     * @param {string} keyword - 検索キーワード
     */
    const searchWebPlayer = (keyword) => {
      let resultUri = RMUSIC_URI_HOST + "/link/search/";
      if (keyword) {
        // キーワードをトリム、スペースで分割、各単語をエンコードして '+' で結合
        let searchPageParameter = keyword
          .trim()
          .split(" ")
          .map((str) => encodeURIComponent(str))
          .join("+");
        resultUri += "?q=" + searchPageParameter;
      }
      window.open(resultUri); // 新しいウィンドウで開く
    };

    /**
     * 検索機能の初期化
     */
    const init = () => {
      // プレースホルダーのフォーカス/ブラーイベント
      inputElement.addEventListener("focus", function () {
        this.placeholder = "";
      });
      inputElement.addEventListener("blur", function () {
        if (this.value === "") {
          this.placeholder = initialPlaceholder;
        }
      });

      // Enterキーでの検索
      inputElement.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
          searchWebPlayer(inputElement.value);
        }
      });

      // 検索ボタンクリックでの検索
      if (searchButton) {
        searchButton.addEventListener("click", () => {
          searchWebPlayer(inputElement.value);
        });
      }
    };
    return { init: init };
  })();

  // =========================================================================
  // イベントハンドラと初期化処理
  // =========================================================================

  // DOMContentLoaded イベント (DOMの準備ができたときに実行)
  document.addEventListener("DOMContentLoaded", () => {
    // 各モジュールの初期化
    ViewportModule.init();
    HeaderModule.init();
    ContainerModule.init();
    GlobalNavigationModule.init();
    SideMenuModule.init(); // position: sticky の代替またはカスタム実装
    SliderModule.init(); // Splideスライダーの初期化
    ImageModule.init(); // PCレイアウト時など、特定の条件で画像をロード (Lazy Loadと重複しないように注意)
    EntryListModule.init();

    // 各種イベントリスナーの設定
    ToggleModule.click(); // トグル機能のクリックイベント

    // 旧 common_20241129.js および HTMLインラインスクリプトのロジック
    SearchHandler.init(); // 検索機能の初期化
    setupSmoothScroll(); // スムーズスクロールの設定
    setupFloatingCtaVisibility(); // フローティングCTAボタンの表示制御
    handleAppButtonVisibility(); // UA 'App-jp' に応じたボタン表示制御
    loadNoticeHtml(); // notice.html の読み込み
    setupBottomEvent("window", 10); // ウィンドウの最下部イベント (10px近接でトリガー)
    lazyLoadImages(); // 画像の遅延読み込み (Intersection Observer)

    // HTMLのAndroid 4.X用CSS動的読み込み (document.writeの代替)
    const _UA = navigator.userAgent;
    if (_UA.indexOf("Android 4.") > -1) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.type = "text/css";
      link.href = "//music.r10s.jp/external/prod/assets/common/css/alter-flexbox.css?v=011615";
      document.head.appendChild(link);
    }
  });

  // Resize イベント (デバウンス処理あり)
  let resizeTimer = null;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // PCレイアウトの場合に画像をロード (ImageModule.load はLazy Loadと重複しないよう注意)
      if (UserInfo.getLayout() === UserInfo.layout.PC) {
        ImageModule.load();
      }
    }, 200); // 200msの遅延
  });

  // Scroll イベント (デバウンス処理あり)
  let scrollTimer = null;
  window.addEventListener("scroll", () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      HeaderModule.scroll(); // ヘッダーの固定スタイル更新
      ContainerModule.scroll(); // コンテナの固定スタイル更新
      // SliderModule.scroll(); // Splideの自動再生はIntersection Observerで制御するため、ここでの呼び出しは不要
    }, 200); // 200msの遅延
  });
})(); // 即時実行関数の終了
