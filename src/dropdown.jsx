/* jshint jquery:true */
/* global React:false */
/* exported Dropdown, DropdownToggle, DropdownBody */

var ddmDropdownId = 0;

function getDdmDropdownId() {
  return ddmDropdownId++;
}

var Dropdown = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    className: React.PropTypes.string,
    url: React.PropTypes.string,
    arrow: React.PropTypes.bool,
    hover: React.PropTypes.bool,
    hoverDelay: React.PropTypes.number,
    onOpen: React.PropTypes.func,
    onClose: React.PropTypes.func,
    links: React.PropTypes.array
  },

  getDefaultProps: function() {
    return {
      title: '',
      className: '',
      url: null,
      arrow: true,
      hover: true,
      hoverDelay: 300,
      onOpen: null,
      onClose: null,
      links: []
    };
  },

  getInitialState: function() {
    return {
      ddmDropdownId: null,
      open: false,
      hoverTimeout: null,
    };
  },

  toggleOpenState: function() {
    if (this.state.open) {
      this.close();
    } else {
      this.open();
    }
  },

  open: function() {
    this.addDocumentCloseHandlers();
    this.setState({open: true});

    if (this.props.onOpen) {
      this.props.onOpen();
    }

    $(this.getDOMNode()).trigger('open.ddm.dropdown');
  },

  close: function() {
    this.removeDocumentCloseHandlers();
    this.setState({open: false});

    if (this.props.onClose) {
      this.props.onClose();
    }

    $(this.getDOMNode()).trigger('close.ddm.dropdown');
  },

  renderToggle: function() {
    /* jshint quotmark:false */
    var toggle = null;

    React.Children.forEach(this.props.children, function(child) {
      if (child.type === DropdownToggle.type) {
        toggle = React.addons.cloneWithProps(child, {
          open: this.state.open,
          onToggleClick: this.handleClick,
          ref: 'dropdownToggle'
        });
      }
    }.bind(this));

    if (toggle === null) {
      toggle = (
        <DropdownToggle
          href={this.props.url}
          open={this.state.open}
          arrow={this.props.arrow}
          onToggleClick={this.handleClick}
          ref="dropdownToggle"
        >
          {this.props.title}
        </DropdownToggle>
      );
    }

    return toggle;
  },

  renderBody: function() {
    /* jshint quotmark:false */
    var body = null, displayChildren = [];

    // Make sure we do not render a dropdownToggle inside of the body
    React.Children.forEach(this.props.children, function(child) {
      if (child.type !== DropdownToggle.type) {
        displayChildren.push(child);
      }
    });

    React.Children.forEach(displayChildren, function(child) {
      if (child.type === DropdownBody.type) {
        body = React.addons.cloneWithProps(child, {
          ref: 'dropdownBody'
        });
      }
    });

    if (body === null) {
      body = (
        <DropdownBody links={this.props.links} ref="dropdownBody">
          {displayChildren}
        </DropdownBody>
      );
    }

    return body;
  },

  render: function() {
    /* jshint quotmark:false */
    var cx = React.addons.classSet;
    var dropdownClasses = {
      'ddm-dropdown': true,
      'ddm-dropdown--open': this.state.open
    };

    this.props.className.split(' ').forEach(function(className) {
      dropdownClasses[className] = true;
    });

    var toggle = this.renderToggle();
    var body = this.renderBody();

    return (
      <div
        className={cx(dropdownClasses)}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {toggle}
        {body}
      </div>
    );
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (this.state.open && !prevState.open) {
      this.refs.dropdownBody.getDOMNode().scrollTop = 0;
    }

    if (this.state.open) {
      $('body').addClass('ddm-dropdown-is-open');
    } else {
      $('body').removeClass('ddm-dropdown-is-open');
    }
  },

  componentDidMount: function() {
    this.setState({ddmDropdownId: getDdmDropdownId()});
  },

  componentWillUnmount: function() {
    this.removeDocumentCloseHandlers();
  },

  addDocumentCloseHandlers: function() {
    $(document).on('click.ddm.dropdown.' + this.state.ddmDropdownId, this.handleDocumentClick);
    $(document).on('keyup.ddm.dropdown.' + this.state.ddmDropdownId, this.handleDocumentKeyUp);
    $(document).on('open.ddm.dropdown.' + this.state.ddmDropdownId, this.handleDropdownOpen);
  },

  removeDocumentCloseHandlers: function() {
    $(document).off('click.ddm.dropdown.' + this.state.ddmDropdownId);
    $(document).off('keyup.ddm.dropdown.' + this.state.ddmDropdownId);
    $(document).off('open.ddm.dropdown.' + this.state.ddmDropdownId);
  },

  handleClick: function() {
    this.toggleOpenState();
  },

  handleMouseEnter: function() {
    if (!this.props.hover) {
      return;
    }

    clearTimeout(this.state.hoverTimeout);

    var hoverTimeout = setTimeout(function() {
      this.open();
    }.bind(this), this.props.hoverDelay);

    this.setState({hoverTimeout: hoverTimeout});
  },

  handleMouseLeave: function() {
    if (!this.props.hover) {
      return;
    }

    clearTimeout(this.state.hoverTimeout);

    var hoverTimeout = setTimeout(function() {
      this.close();
    }.bind(this), this.props.hoverDelay);

    this.setState({hoverTimeout: hoverTimeout});
  },

  handleDocumentClick: function(e) {
    if (this.isNodeInComponent(e.target)) {
      return;
    }

    this.close();
  },

  handleDocumentKeyUp: function(e) {
    if (e.keyCode === 27) {
      this.close();
    }
  },

  handleDropdownOpen: function(e) {
    if (this.isNodeInComponent(e.target)) {
      return;
    }

    this.close();
  },

  isNodeInComponent: function(node) {
    while (node) {
      if (node === this.getDOMNode()) {
        return true;
      }
      node = node.parentNode;
    }

    return false;
  }
});

var DropdownToggle = React.createClass({
  propTypes: {
    href: React.PropTypes.string,
    arrow: React.PropTypes.bool,
    open: React.PropTypes.bool,
    onToggleClick: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      href: null,
      arrow: true,
      open: false,
      onToggleClick: null
    };
  },

  render: function() {
    /* jshint quotmark:false */
    var cx = React.addons.classSet;

    var toggleClasses = {
      'ddm-dropdown__toggle': true,
      'ddm-dropdown__toggle--with-arrow': this.props.arrow
    };

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

var DropdownBody = React.createClass({
  propTypes: {
    links: React.PropTypes.array
  },

  getDefaultProps: function() {
    return {
      links: []
    };
  },

  renderLinkList: function() {
    /* jshint quotmark:false */
    var renderedLinks = null, renderedLinkList = null;

    renderedLinks = this.props.links.map(function(link, i) {
      return (
        <li className="ddm-dropdown__menu-item" key={'link' + i}>
          <a
            href={link.href}
            title={link.title}
            onClick={link.onClick}
            className="ddm-dropdown__link"
          >
            {link.link}
          </a>
        </li>
      );
    });

    if (renderedLinks.length > 0) {
      renderedLinkList = (
        <ul className="ddm-dropdown__menu">
          {renderedLinks}
        </ul>
      );
    }

    return renderedLinkList;
  },

  render: function() {
    /* jshint quotmark:false */
    var renderedLinkList = this.renderLinkList();

    return (
      <div className="ddm-dropdown__body">
        {renderedLinkList}
        {this.props.children}
      </div>
    );
  }
});
