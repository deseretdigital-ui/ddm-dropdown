var React = require('react');
var ReactDOM = require('react-dom');
var cx = require('classnames');
var $ = require('jquery');
var DropdownToggle = require('./DropdownToggle');
var DropdownBody = require('./DropdownBody');

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

    $(ReactDOM.findDOMNode(this)).trigger('open.ddm.dropdown');
  },

  close: function() {
    this.removeDocumentCloseHandlers();
    this.setState({open: false});

    if (this.props.onClose) {
      this.props.onClose();
    }

    $(ReactDOM.findDOMNode(this)).trigger('close.ddm.dropdown');
  },

  renderToggle: function() {
    var toggle = null;

    React.Children.forEach(this.props.children, function(child) {
      if (child.type === DropdownToggle) {
        toggle = React.cloneElement(child, {
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
    var body = null, displayChildren = [];

    // Make sure we do not render a dropdownToggle inside of the body
    React.Children.forEach(this.props.children, function(child) {
      if (child.type !== DropdownToggle) {
        displayChildren.push(child);
      }
    });

    React.Children.forEach(displayChildren, function(child) {
      if (child.type === DropdownBody) {
        body = React.cloneElement(child, {
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
      this.refs.dropdownBody.scrollTop = 0;
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
  	var componentNode = ReactDOM.findDOMNode(this);

    while (node) {
      if (node === componentNode) {
        return true;
      }
      node = node.parentNode;
    }

    return false;
  }
});

module.exports = Dropdown;
