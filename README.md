# DDM Dropdown

Dropdown component for DDM projects.

# Example

Online Demo: http://deseretdigital-ui.github.io/ddm-dropdown

Before viewing the example code on your local machine, you'll need to run the following commands after cloning:

```shell
$ npm install
$ bower install
$ gulp build
$ open ./example/index.html
```

# Usage

## Simple

```js
React.render(
  <Dropdown title="Click on me">
    <p>Here's the stuff you'll see when you click on me.</p>
  </Dropdown>,
  document.getElementById('idOfTargetElement')
);
```

## Advanced

```js
React.render(
  <Dropdown>
    <DropdownToggle>
      <button>
        I needed HTML in my toggle
        <img src="open.png" alt="&raquo;" />
      </button>
    </DropdownToggle>
    <DropdownBody>
      <p>Here's the stuff you'll see when you click on me.</p>
    </DropdownBody>
  </Dropdown>,
  document.getElementById('idOfTargetElement')
);
```

## With Links Object

```js
React.render(
  <Dropdown title="Menu" links={arrayOfLinks} />,
  document.getElementById('idOfTargetElement')
);
```

# Props

## Dropdown

* title - String
* className - String
* url - String
* arrow - Bool
* hover - Bool
* hoverDelay - Number
* onOpen - Func
* onClose - Func
* links - Array

### title

Default value is an empty string.

Title is required if you are not manually specifying the DropdownToggle component. The title becomes the clickable that opens up the dropdown.

### className

Default value is an empty string.

A space delimited string of additional classes to add onto the dropdown wrapper.

### url

Default value is null.

If a string is passed in, this will become the href of DropdownToggle. Clicking on the toggle after the dropdown is opened will take the user to the href instead of closing the dropdown.

### arrow

Default value is true.

This controls the display of the arrow displayed in the toggle when the dropdown is open. Setting it to false will remove the arrow.

### hover

Default value is true.

This controls whether the dropdown is opened simply by hovering over the toggle with the mouse cursor. Leaving the dropdown wrapper with the mouse will also cause the dropdown to close. Set to false to disable hover opens.

### hoverDelay

Default value is 300.

The number of milliseconds to wait before the dropdown will open or close when the
toggle is hovered over or when the mouse leaves the dropdown.

### onOpen

Default value is null.

Pass a callback you would like called when the dropdown opens.

### onClose

Default value is null.

Pass a callback you would like called when the dropdown closes.

### links

Default value is an empty array.

An array of link objects that can be used to automatically populate the body instead of having to manually type out an unordered list of anchor tags.

Link objects have the following format:

```js
var linkObject = {
  'link': 'KSL',
  'href': 'http://ksl.com',
  'title': 'Visit the world\'s best news site'
};
```

## DropdownToggle

* href - String
* arrow - Bool

### href

This prop works the same as in Dropdown but is specified on the DropdownToggle instead of you are manually defining the DropdownToggle.

### arrow

This prop works the same as in Dropdown but is specified on the DropdownToggle instead of you are manually defining the DropdownToggle.

## DropdownBody

* links - Array

### links

This prop works the same as in Dropdown but is specified on the DropdownBody instead of you are manually defining the DropdownBody.
