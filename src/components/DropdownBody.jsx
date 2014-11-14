var React = require('react');

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

    return (
      <div className="ddm-dropdown__body">
        {renderedLinkList}
        {this.props.children}
      </div>
    );
  }
});

module.exports = DropdownBody;
