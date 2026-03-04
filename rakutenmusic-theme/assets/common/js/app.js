(function () {

  /* --------------------------------------------------------*/
  /*  Utility functions
  /* --------------------------------------------------------*/
  // --------------------------------------------------------
  // Const
  // -------------------------------------------------------
  var Const = {
    CONTENT_WIDTH_PC: 1040,   // Content width
    BREAK_POINT: 768          // Break point
  };

  // --------------------------------------------------------
  // Selector
  // --------------------------------------------------------
  var Selector = {
    // Return selector variable converted from class name.
    class: function ($class_name) {
      return '.' + $class_name;
    },
  };

  // --------------------------------------------------------
  // Object
  // --------------------------------------------------------
  var Object = {
    // Check existence of element.
    isExist: function (obj) {
      if (typeof (obj) != 'undefined' && obj != null) {
        return true;
      } else {
        return false;
      }
    },
    isExistByClassName: function (class_name) {
      var element = document.getElementsByClassName(class_name)[0];
      return this.isExist(element);
    }
  };

  // --------------------------------------------------------
  // Position
  // --------------------------------------------------------
  var Position = {
    // Return window top position.
    windowTop: function () {
      return $(window).scrollTop();
    },
    // Return window bottom position.
    windowBottom: function () {
      var wh = window.innerHeight;
      return $(window).scrollTop() + wh;
    },
    // Return element's top position.
    element: function ($element) {
      if ($element != null) {
        var position = $element.position();
        return position.top;
      } else {
        return 0;
      }
    }
  };

  // --------------------------------------------------------
  // User info
  // -------------------------------------------------------
  var UserInfo = {
    // Device types.
    device: {
      SP: 'sp',
      TB: 'tb',
      PC: 'pc'
    },
    // Layout Types.
    layout: {
      SP: 'sp',
      PC: 'pc'
    },
    // Return user agent converted lower case.
    ua: function () {
      return window.navigator.userAgent.toLowerCase();
    },
    // Return device type.
    getDevice: function () {
      var _UA = this.ua();
      // SP
      if (_UA.indexOf('iphone') !== -1 || _UA.indexOf('ipod') !== -1 || (_UA.indexOf('android') !== -1 && _UA.indexOf('mobile') !== -1)) {
        return this.device.SP;
        // TB
      } else if (_UA.indexOf('ipad') !== -1 || _UA.indexOf('android') !== -1) {
        return this.device.TB;
        // PC
      } else {
        return this.device.PC;
      }
    },
    // Return layout type.
    getLayout: function () {
      if (window.innerWidth < Const.BREAK_POINT) {
        return this.layout.SP;
      } else {
        return this.layout.PC;
      }
    }
  };

  // --------------------------------------------------------
  // Page info
  // --------------------------------------------------------
  var PageInfo = {
    // Return current category.
    getCurrentCategory: function () {
      // Get directories from path.
      var page_list = window.location.pathname.split('/');
      if (page_list.length > 2) {
        return page_list[1];
      }
      return '';
    }
  };

  /* --------------------------------------------------------*/
  /*  Main functions
  /* --------------------------------------------------------*/
  // --------------------------------------------------------
  // Viewport
  // --------------------------------------------------------
  var Viewport = (function () {
    // Change viewport for TB.
    var change = function () {
      if (UserInfo.getDevice() === UserInfo.device.TB) {
        $("meta[name='viewport']").attr('content', 'width=' + Const.CONTENT_WIDTH_PC + 'px');
      }
    };
    return {
      init: change
    };
  })();

  // --------------------------------------------------------
  // Header
  // --------------------------------------------------------
  var Header = (function () {

    var scrollDisabled = false;

    $('.gnav-menu').click(function () {
      $(this).addClass('is-hidden');
      $('.gnav-menu-close').removeClass('is-hidden');
      $('.gnav-sp-menu-list').slideDown('is-hidden');
    });

    $('.gnav-menu-close').click(function () {
      $('.gnav-menu').removeClass('is-hidden');
      $(this).addClass('is-hidden');
      $('.gnav-sp-menu-list').slideUp('is-hidden');
    });

    // Define class name
    var class_name = {
      target: 'l-header',
      fixed: 'is-fixed'
    };

    // Set style while header fixed.
    var setFixedStyle = function () {
      // Get target object
      $header = $(Selector.class(class_name.target));
      // Toggle class by scroll position.
      var pos = Position.windowTop();
      if (pos > 0) {
        $header.addClass(class_name.fixed);

        // Pitariバナー、Unification Common Headerの非表示
        $('#mkdiv_header_pitari').addClass('is-hidden');
        $('#entmt-common-ui-topbar').addClass('is-hidden');
      } else {
        $header.removeClass(class_name.fixed);

        // Pitariバナー、Unification Common Headerの表示
        $('#mkdiv_header_pitari').removeClass('is-hidden');
        $('#entmt-common-ui-topbar').removeClass('is-hidden');
      }
    };

    var currentPath = window.location.pathname;

    // 末尾のスラッシュを取り除く関数
    function removeTrailingSlash(str) {
      return str.replace(/\/$/, '');
    }

    // 末尾のスラッシュを取り除く
    currentPath = removeTrailingSlash(currentPath);

    // ② a.gnav-menu-linkのhref属性と照合
    $('a.gnav-menu-link').each(function () {
      var href = $(this).attr('href');
      href = removeTrailingSlash(href); // 末尾のスラッシュを取り除く

      if (currentPath === href) {
        // ③ 一致する場合、.is-selectedを追加
        $(this).addClass('is-selected');
      }
    });

    return {
      init: setFixedStyle,
      scroll: setFixedStyle
    }
  })();

  // --------------------------------------------------------
  // l-container // for mobile banner
  // --------------------------------------------------------
  var Container = (function () {
    // Define class name
    var class_name = {
      target: 'l-container',
      fixed: 'is-fixed'
    };

    // Set style while header fixed.
    var setFixedStyle = function () {
      // Get target object
      $container = $(Selector.class(class_name.target));
      // Toggle class by scroll position.
      var pos = Position.windowTop();
      if (pos > 0) {
        $container.addClass(class_name.fixed);
      } else {
        $container.removeClass(class_name.fixed);
      }
    };

    return {
      init: setFixedStyle,
      scroll: setFixedStyle
    }
  })();

  // --------------------------------------------------------
  // Global Navigation
  // --------------------------------------------------------
  var GlobalNavigation = (function () {
    // Define class name
    var class_name = {
      nav: 'global-nav__item',
      current: 'is-current'
    };

    // Set current style.
    var setCurrentStyle = function () {
      var nav_selector = Selector.class(class_name.nav);
      // Select target.
      var category_name = PageInfo.getCurrentCategory();
      $selected = $(nav_selector).find('a[href^="/' + category_name + '/"]');
      if (category_name == '') {
        $selected = $(nav_selector).find('a[href="/"]');
      }
      // Add current class.
      $selected.closest(nav_selector).addClass(class_name.current);
    };

    return {
      init: setCurrentStyle
    };
  })();

  // --------------------------------------------------------
  // Side menu
  // --------------------------------------------------------
  var SideMenu = (function () {
    // Define class name
    var class_name = {
      target: 'js-sticky-target',
      container: 'js-sticky-container'
    };

    // Make side menu fixed.
    var fixed = function () {
      // Check existence of target element.
      if (Object.isExistByClassName(class_name.target) && Object.isExistByClassName(class_name.container)) {
        // Call stick script
        $(Selector.class(class_name.target)).stick_in_parent({
          parent: $(Selector.class(class_name.container))
        });
      }
    };

    return {
      init: fixed
    }
  })();

  // --------------------------------------------------------
  // Image
  // --------------------------------------------------------
  var Image = (function () {
    var attr_name = 'data-src';

    // Load image by setting src attribute.
    var load = function ($scope) {
      if ($scope != null) {
        $targets = $scope.find($('img[' + attr_name + ']'));
      } else {
        $targets = $('img[' + attr_name + ']');
      }
      $targets.each(function (index, element) {
        $(element).attr('src', $(element).attr(attr_name));
        $(element).removeAttr(attr_name);
      });
    };
    // Load except SP device and SP layout
    var loadExceptSP = function ($scope) {
      if (UserInfo.getDevice() === UserInfo.device.PC) {
        load($scope);
      } else {
        if (UserInfo.getLayout() === UserInfo.layout.PC) {
          load($scope);
        }
      }
    };

    return {
      init: loadExceptSP,
      load: load
    }
  })();

  // --------------------------------------------------------
  // Toggle
  // --------------------------------------------------------
  var Toggle = (function () {
    // Define class name
    var class_name = {
      toggle_container: 'js-toggle',
      toggle_type: 'js-toggle--keep-open',
      animation_type: 'js-toggle--fade',
      trigger: 'js-toggle__trigger',
      target: 'js-toggle__target',
      state_open: 'is-open',
      state_closing: 'is-closing'
    };

    // Load images
    var loadImage = function ($container) {
      $target = $container.find(Selector.class(class_name.target));
      Image.load($target);
    };
    // Add or remove class for change state.
    var changeState = function ($container) {
      // Select open type.
      // Keep open after once open.
      if ($container.hasClass(class_name.toggle_type)) {
        $container.addClass(class_name.state_open);
        // Toggle anytime.
      } else {
        // For fade animation
        if ($container.hasClass(class_name.animation_type)) {
          // open to close
          if ($container.hasClass(class_name.state_open)) {
            $container.addClass(class_name.state_closing);
            setTimeout(function () {
              $container.removeClass(class_name.state_open);
              $container.removeClass(class_name.state_closing);
            }, 1500);
            // close to open
          } else {
            $container.addClass(class_name.state_open);
          }
          // Simple toggle
        } else {
          $container.toggleClass(class_name.state_open);
        }
      }
    };
    // for click event
    var click = function () {
      // Trigger is clicked.
      $(Selector.class(class_name.trigger)).on('click', function () {
        $toggle_container = $(this).closest(Selector.class(class_name.toggle_container));
        loadImage($toggle_container);
        changeState($toggle_container);
        return false;
      });
    };

    return {
      click: click
    }
  })();

  // --------------------------------------------------------
  //  Slider
  // --------------------------------------------------------
  var Slider = (function () {
    // Define class name
    var class_name = {
      container: 'slider',
      initialized: 'slick-initialized',
      move: 'is-move'
    };

    // Make slider
    var make = function ($slider) {
      $slider.slick({
        lazyLoad: 'progressive',
        dots: true,
        controller: true,
        slidesToShow: 4,
        responsive: [{
          breakpoint: parseInt(Const.BREAK_POINT) - 1,
          settings: {
            centerMode: true,
            slidesToShow: 1
          }
        }]
      });
    };
    // Set autoplay option
    var setAutoplay = function ($slider) {
      // Set option when slider enter viewport.
      if (Object.isExist($slider) && !$slider.hasClass(class_name.move)) {
        var enterViewPosition = Position.windowBottom();
        var sliderTopPosition = Position.element($slider);
        if (enterViewPosition >= sliderTopPosition) {
          $slider.slick('slickPlay').addClass(class_name.move);
        }
      }
    };
    // for load event.
    var init = function () {
      $targets = $(Selector.class(class_name.container));
      $targets.each(function (index, element) {
        make($(element));
      });
    };

    var scroll = function () {
      $targets = $(Selector.class(class_name.initialized));
      $targets.each(function (index, element) {
        setAutoplay($(element));
      });
    };

    return {
      init: init,
      scroll: scroll
    }
  })();

  // --------------------------------------------------------
  // EntryList
  // --------------------------------------------------------
  var EntryList = (function () {

    var date_period = 5;
    // Define class name
    var class_name = {
      container: 'js-has-new-icon',
      card: 'feature__card',
      new: 'is-new'
    };

    // Set 'New' icon.
    var setIcon = function () {
      // Select target object
      if (Object.isExistByClassName(class_name.container)) {
        // Get compared date
        var now = new Date();
        var period_date = new Date(now.getFullYear(), now.getMonth(), (now.getDate() - date_period));

        // Select targets
        $targets = $(Selector.class(class_name.container)).find(Selector.class(class_name.card));
        // Loop each target
        $targets.each(function () {
          $card = $(this);
          // Get publish date
          var pub_date_str = $card.find('time').attr('datetime');
          var pub_date_arr = pub_date_str.split('-');
          var pub_date_str = pub_date_arr[1] + '/' + pub_date_arr[2] + '/' + pub_date_arr[0];
          var pub_date = new Date(pub_date_str);
          // Compare publish date and period date
          if (pub_date.getTime() >= period_date.getTime()) {
            // Add class
            $card.addClass(class_name.new);
          }
        });
      }
    };

    return {
      init: setIcon
    }
  })();

  /* --------------------------------------------------------*/
  /*  Events
  /* --------------------------------------------------------*/
  // Ready
  // --------------------------------------------------------
  $(document).ready(function () {
    // Initialize
    Viewport.init();
    Header.init();
    Container.init();
    GlobalNavigation.init();
    SideMenu.init();
    Slider.init();
    Image.init();
    EntryList.init();

    // Event
    Toggle.click();
  });

  // Resize
  // --------------------------------------------------------
  var resizeTimer = null;
  window.addEventListener('resize', function () {
    // Execute function after resize completed.
    if (resizeTimer != null) {
      clearTimeout(resizeTimer);
    }
    resizeTimer = setTimeout(function () {
      // Load image if PC layout
      if (UserInfo.getLayout() === UserInfo.layout.PC) {
        Image.load();
      }
    }, 200);
  });

  // Scroll
  // --------------------------------------------------------
  var scrollTimer = null;
  window.addEventListener('scroll', function () {
    // Execute function after scroll completed.
    if (scrollTimer != null) {
      clearTimeout(scrollTimer);
    }
    scrollTimer = setTimeout(function () {
      Header.scroll();
      Container.scroll();
      Slider.scroll();
    }, 200);
  });


})($);