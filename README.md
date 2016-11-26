# tag-it

Tag-It is a JS-based plugin to add multiple queries tags to input. It supports adding and deleting a tag. Tags can be used to search, sort and other multiple places by adding tag click events.

To get started, checkout examples at index.html file.

## Usage

- Select a container to make input tag:

```javascript
var container = document.getElementsByClassName("root")[0];
```

- Create conf object(Optional):

```javacript
var config = {
  container : container, // body tag by default
  burst     : true,      // Add multiple tags in one shot, e.g. test|test2|test3 (by default true)
  breakAt   : '&',       // Change separator symbol for burst option, e.g. test1&test2&test3(default value '|')
  tagClick  : function   // Custom tag click event.
}
```

- Call `tag` method with configurations:

```javascript
var tagIt = window.tag(config)
```

`tagIt` will be an Object with all important references of `Objects` and `Elements` created by `tag` function.
