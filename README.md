# Rock and Roll with Ember.js

The application that is built in [Rock and Roll with Ember.js](http://rockandrollwithemberjs.com)

## Setting up the app

```sh
$ git clone https://github.com/balinterdi/rarwe-code.git
$ cd rarwe-code
$ npm install
$ bower install
$ ember serve
```

## Skipping to a chapter

I set up git tags for each chapter so it's very easy to skip to the end of a chapter and see the state of the application at that point. Let's say you want to play with the app as it stood at the end of the Nested routes chapter. Here is what you need to do:

```sh
$ git checkout nested-routes
$ rm -rf dist tmp node_modules bower_components
$ npm install
$ bower install
$ ember serve
```

The `rm -rf` is only needed to make sure nothing is left over from previous npm installs. You can even do an `npm cache clear` and `bower cache clear`, though I've never found this to be necessary so far.

## Running Tests

Run `ember test --server`.
