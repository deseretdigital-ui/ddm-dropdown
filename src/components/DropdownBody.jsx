var React = require('react/addons');
var cx = React.addons.classSet;

var DropdownBody = React.createClass({
  propTypes: {
    links: React.PropTypes.array,
    className: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      links: [],
      className: ''
    };
  },

  renderLinkList: function() {
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
    var renderedLinkList = this.renderLinkList();

    var bodyClasses = {
      'ddm-dropdown__body': true
    };

    this.props.className.split(' ').forEach(function(className) {
      bodyClasses[className] = true;
    });

    return (
      <div className={cx(bodyClasses)}>
        {renderedLinkList}
        {this.props.children}
      </div>
    );
  }
});

module.exports = DropdownBody;
