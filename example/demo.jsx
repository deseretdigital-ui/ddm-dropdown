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

var dropdownLinks = [
  {
    'link': 'Google',
    'href': 'http://google.com',
    'title': 'Visit the world\'s best search engine'
  },
  {
    'link': 'BoardGameGeek',
    'href': 'http://boardgamegeek.com',
    'title': 'Visit the world\'s best board game website',
    'onClick': selectedSecret
  },
  {
    'link': 'KSL',
    'href': 'http://ksl.com',
    'title': 'Visit the world\'s best news site'
  }
];

ReactDOM.render(
  <div className="dropdown-row">
    <Dropdown title="Click Dropdown" hover={false}>
      <ul className="menu">
        <li><a href="#">Item 1.1</a></li>
        <li><a href="#">Item 1.2</a></li>
        <li onClick={selectedSecret}><a href="#">Item 1.3</a></li>
        <li><a href="#">Item 1.4</a></li>
        <li><a href="#">Item 1.5</a></li>
      </ul>
    </Dropdown>

    <Dropdown title="Link Dropdown with Hover" url="http://google.com">
      <ul className="menu">
        <li><a href="#">Item 2.1</a></li>
        <li><a href="#">Item 2.2</a></li>
        <li><a href="#">Item 2.3</a></li>
        <li><a href="#">Item 2.4</a></li>
        <li><a href="#">Item 2.5</a></li>
      </ul>
    </Dropdown>

    <Dropdown className="dropdown--cart" title="Show Dropdown 3" hover={false} onOpen={dropdownOpen} onClose={dropdownClose}>
      <DropdownToggle>
        <img src="http://www.ksl.com/modules/deal/images/v3/cart-ico.png" alt="" />
      </DropdownToggle>
      <DropdownBody>
        <ul className="menu">
          <li><a href="#">Item 3.1</a></li>
          <li><a href="#">Item 3.2</a></li>
          <li><a href="#">Item 3.3</a></li>
          <li><a href="#">Item 3.4</a></li>
          <li><a href="#">Item 3.5</a></li>
        </ul>
      </DropdownBody>
    </Dropdown>

    <Dropdown title="JSON Dropdown" hover={false} links={dropdownLinks} />
  </div>
  ,
  document.getElementById('dropdownTest')
);
