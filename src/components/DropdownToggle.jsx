var React = require('react');
var cx = require('classnames');

var DropdownToggle = React.createClass({
  propTypes: {
    href: React.PropTypes.string,
    arrow: React.PropTypes.bool,
    open: React.PropTypes.bool,
    onToggleClick: React.PropTypes.func,
    className: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      href: null,
      arrow: true,
      open: false,
      onToggleClick: null,
      className: ''
    };
  },

  render: function() {
    var toggleClasses = {
      'ddm-dropdown__toggle': true,
      'ddm-dropdown__toggle--with-arrow': this.props.arrow
    };

    this.props.className.split(' ').forEach(function(className) {
      toggleClasses[className] = true;
    });

    var href = this.props.href || '#';

    return (
      <a href={href} className={cx(toggleClasses)} onClick={this.handleClick}>
        {this.props.children}
      </a>
    );
  },

  handleClick: function(e) {
    if (this.props.href && this.props.open) {
      return;
    }

    if (this.props.onToggleClick) {
      e.preventDefault();
      this.props.onToggleClick();
    }
  }
});

module.exports = DropdownToggle;
