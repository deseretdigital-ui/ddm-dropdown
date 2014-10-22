// dropdown init function
var dropdown = (function ($) {

  // dropdown constructor
  var Dropdown = function ($element, options) {

    var defaults = {
      toggle: '> .dropdown__toggle',
      body: '> .dropdown__body',
      arrow: true,
      hover: true,
      hoverDelay: 300
    };
    options = $.extend(defaults, options);

    var dropdown = this;

    $element.addClass('dropdown');

    // setup toggle
    var $toggle = $element.find(options.toggle);
    $toggle.addClass('dropdown__toggle');
    $toggle.toggleClass('dropdown__toggle--with-arrow', options.arrow);

    // setup body
    var $content = $element.find(options.body);
    $content.wrap('<div class="dropdown__body"></div>');
    var $body = $content.parent('.dropdown__body');

    dropdown.isOpen = function () {
      return $element.hasClass('dropdown--open');
    };

    $toggle.on('click.dropdown', function (event) {
      if (!dropdown.isOpen()) {
        event.preventDefault();
      }
      $element.trigger('toggle.dropdown');
    });

    $element.on('open.dropdown', function (event) {
      $element.addClass('dropdown--open');
    });

    $element.on('close.dropdown', function (event) {
      $body.scrollTop(0);
      $element.removeClass('dropdown--open');
    });

    $element.on('toggle.dropdown', function (event) {
      if (dropdown.isOpen()) {
        $element.trigger('close.dropdown');
      } else {
        $element.trigger('open.dropdown');
      }
    });

    if (options.hover !== false) {
      var openTimeout = null;
      $element.on('mouseenter.dropdown', function (event) {
        clearTimeout(openTimeout);
        openTimeout = setTimeout(function () {
          $element.trigger('open.dropdown');
        }, options.hoverDelay);
      });

      $element.on('mouseleave.dropdown', function (event) {
        clearTimeout(openTimeout);
        $element.trigger('close.dropdown');
      });
    }

    $element.on('teardown.dropdown', function () {
      $element.trigger('close.dropdown');

      // remove classes
      $element.removeClass('dropdown');
      $content.unwrap('dropdown__body');
      $toggle.removeClass('dropdown__toggle dropdown__toggle--with-arrow');

      // remove event handlers
      $element.off('.dropdown');
      $toggle.off('.dropdown');

      // remove api
      $element.removeData('dropdown-api');
    });

    return dropdown;
  };

  var init = function ($element, options) {
    $element = $element.eq(0); // only handles one dropdown at a time
    var api = $element.data('dropdown-api');
    if (!api) {
      api = new Dropdown($element, options);
      $element.data('dropdown-api', api);
    }
    return api;
  };

  $(function () {
    var closeDropdowns = function ($excludes) {
      var $dropdowns = $('.dropdown--open');
      if ($excludes !== null) {
        $dropdowns = $dropdowns.not($excludes);
      }
      $dropdowns.trigger('close.dropdown');
    };

    $(document).on('click.close-dropdown', function (event) {
      var $target = $(event.target);
      var $excludes = null;

      var isDropdown = $(event.target).is('.dropdown');
      if (isDropdown) {
        $excludes = $target;
      }

      var $parents = $target.parents('.dropdown');
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

    $(document).on('open.dropdown', function (event) {
      closeDropdowns($(event.target));

      // click event doesn't bubble up to body without this
      $('body').css('cursor', 'pointer');
    });

    $(document).on('close.dropdown', function (event) {
      if ($('.dropdown--open').length === 0) {
        $('body').css('cursor', '');
      }
    });
  });

  return init;
})(jQuery);
