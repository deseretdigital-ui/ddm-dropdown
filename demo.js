'use strict';

function dropdownOpen() {
  document.body.style.backgroundColor = '#639';
  document.body.style.color = "#fff";
}

function dropdownClose() {
  document.body.style.backgroundColor = '#fff';
  document.body.style.color = '#000';
}

function selectedSecret() {
  alert('You picked the secret dropdown option!');
}

var dropdownLinks = [{
  'link': 'Google',
  'href': 'http://google.com',
  'title': 'Visit the world\'s best search engine'
}, {
  'link': 'BoardGameGeek',
  'href': 'http://boardgamegeek.com',
  'title': 'Visit the world\'s best board game website',
  'onClick': selectedSecret
}, {
  'link': 'KSL',
  'href': 'http://ksl.com',
  'title': 'Visit the world\'s best news site'
}];

ReactDOM.render(React.createElement(
  'div',
  { className: 'dropdown-row' },
  React.createElement(
    Dropdown,
    { title: 'Click Dropdown', hover: false },
    React.createElement(
      'ul',
      { className: 'menu' },
      React.createElement(
        'li',
        null,
        React.createElement(
          'a',
          { href: '#' },
          'Item 1.1'
        )
      ),
      React.createElement(
        'li',
        null,
        React.createElement(
          'a',
          { href: '#' },
          'Item 1.2'
        )
      ),
      React.createElement(
        'li',
        { onClick: selectedSecret },
        React.createElement(
          'a',
          { href: '#' },
          'Item 1.3'
        )
      ),
      React.createElement(
        'li',
        null,
        React.createElement(
          'a',
          { href: '#' },
          'Item 1.4'
        )
      ),
      React.createElement(
        'li',
        null,
        React.createElement(
          'a',
          { href: '#' },
          'Item 1.5'
        )
      )
    )
  ),
  React.createElement(
    Dropdown,
    { title: 'Link Dropdown with Hover', url: 'http://google.com' },
    React.createElement(
      'ul',
      { className: 'menu' },
      React.createElement(
        'li',
        null,
        React.createElement(
          'a',
          { href: '#' },
          'Item 2.1'
        )
      ),
      React.createElement(
        'li',
        null,
        React.createElement(
          'a',
          { href: '#' },
          'Item 2.2'
        )
      ),
      React.createElement(
        'li',
        null,
        React.createElement(
          'a',
          { href: '#' },
          'Item 2.3'
        )
      ),
      React.createElement(
        'li',
        null,
        React.createElement(
          'a',
          { href: '#' },
          'Item 2.4'
        )
      ),
      React.createElement(
        'li',
        null,
        React.createElement(
          'a',
          { href: '#' },
          'Item 2.5'
        )
      )
    )
  ),
  React.createElement(
    Dropdown,
    { className: 'dropdown--cart', title: 'Show Dropdown 3', hover: false, onOpen: dropdownOpen, onClose: dropdownClose },
    React.createElement(
      DropdownToggle,
      null,
      React.createElement('img', { src: 'http://www.ksl.com/modules/deal/images/v3/cart-ico.png', alt: '' })
    ),
    React.createElement(
      DropdownBody,
      null,
      React.createElement(
        'ul',
        { className: 'menu' },
        React.createElement(
          'li',
          null,
          React.createElement(
            'a',
            { href: '#' },
            'Item 3.1'
          )
        ),
        React.createElement(
          'li',
          null,
          React.createElement(
            'a',
            { href: '#' },
            'Item 3.2'
          )
        ),
        React.createElement(
          'li',
          null,
          React.createElement(
            'a',
            { href: '#' },
            'Item 3.3'
          )
        ),
        React.createElement(
          'li',
          null,
          React.createElement(
            'a',
            { href: '#' },
            'Item 3.4'
          )
        ),
        React.createElement(
          'li',
          null,
          React.createElement(
            'a',
            { href: '#' },
            'Item 3.5'
          )
        )
      )
    )
  ),
  React.createElement(Dropdown, { title: 'JSON Dropdown', hover: false, links: dropdownLinks })
), document.getElementById('dropdownTest'));