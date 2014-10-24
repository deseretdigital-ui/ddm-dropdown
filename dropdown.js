// dropdown init function
var ddm = ddm || {};
ddm.dropdown = (function ($) {

  // dropdown constructor
  var Dropdown = function ($element, options) {

    var defaults = {
      toggle: '> .ddm-dropdown__toggle',
      body: '> .ddm-dropdown__body',
      arrow: true,
      hover: true,
      hoverDelay: 300
    };
    options = $.extend(defaults, options);

    var dropdown = this;

    $element.addClass('ddm-dropdown');

    // setup toggle
    var $toggle = $element.find(options.toggle);
    $toggle.addClass('ddm-dropdown__toggle');
    $toggle.toggleClass('ddm-dropdown__toggle--with-arrow', options.arrow);

    // setup body
    var $content = $element.find(options.body);
    $content.wrap('<div class="ddm-dropdown__body"></div>');
    var $body = $content.parent('.ddm-dropdown__body');

    dropdown.isOpen = function () {
      return $element.hasClass('ddm-dropdown--open');
    };

    $toggle.on('click.ddm.dropdown', function (event) {
      if (!dropdown.isOpen()) {
        event.preventDefault();
      }
      $element.trigger('toggle.ddm.dropdown');
    });

    $element.on('open.ddm.dropdown', function (event) {
      $element.addClass('ddm-dropdown--open');
    });

    $element.on('close.ddm.dropdown', function (event) {
      $body.scrollTop(0);
      $element.removeClass('ddm-dropdown--open');
    });

    $element.on('toggle.ddm.dropdown', function (event) {
      if (dropdown.isOpen()) {
        $element.trigger('close.ddm.dropdown');
      } else {
        $element.trigger('open.ddm.dropdown');
      }
    });

    if (options.hover !== false) {
      var openTimeout = null;
      $element.on('mouseenter.ddm.dropdown', function (event) {
        clearTimeout(openTimeout);
        openTimeout = setTimeout(function () {
          $element.trigger('open.ddm.dropdown');
        }, options.hoverDelay);
      });

      $element.on('mouseleave.ddm.dropdown', function (event) {
        clearTimeout(openTimeout);
        $element.trigger('close.ddm.dropdown');
      });
    }

    $element.on('teardown.ddm.dropdown', function () {
      $element.trigger('close.ddm.dropdown');

      // remove classes
      $element.removeClass('ddm-dropdown');
      $content.unwrap('ddm-dropdown__body');
      $toggle.removeClass('ddm-dropdown__toggle ddm-dropdown__toggle--with-arrow');

      // remove event handlers
      $element.off('.ddm.dropdown');
      $toggle.off('.ddm.dropdown');

      // remove api
      $element.removeData('ddm-dropdown-api');
    });

    return dropdown;
  };

  var init = function ($element, options) {
    $element = $element.eq(0); // only handles one dropdown at a time
    var api = $element.data('ddm-dropdown-api');
    if (!api) {
      api = new Dropdown($element, options);
      $element.data('ddm-dropdown-api', api);
    }
    return api;
  };

  $(function () {
    var closeDropdowns = function ($excludes) {
      var $dropdowns = $('.ddm-dropdown--open');
      if ($excludes !== null) {
        $dropdowns = $dropdowns.not($excludes);
      }
      $dropdowns.trigger('close.ddm.dropdown');
    };

    $(document).on('click.ddm.close-dropdown', function (event) {
      var $target = $(event.target);
      var $excludes = null;

      var isDropdown = $(event.target).is('.ddm-dropdown');
      if (isDropdown) {
        $excludes = $target;
      }

      var $parents = $target.parents('.ddm-dropdown');
      var inDropdown = $parents.length !== 0;
      if (inDropdown) {
        if (isDropdown) {
          $excludes.add($parents);
        } else {
          $excludes = $parents;
        }
      }

      closeDropdowns($excludes);
    });

    $(document).on('open.ddm.dropdown', function (event) {
      closeDropdowns($(event.target));

      // click event doesn't bubble up to body without this
      $('body').addClass('ddm-dropdown-is-open');
    });

    $(document).on('close.ddm.dropdown', function (event) {
      if ($('.ddm-dropdown--open').length === 0) {
        $('body').removeClass('ddm-dropdown-is-open');
      }
    });
  });

  return init;
})(jQuery);
