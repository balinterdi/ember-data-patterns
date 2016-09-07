import Ember from 'ember';

function selectBand(app, name) {
  visit('/')
  .click('.band-link:contains("' + name + '")');

  return app.testHelpers.wait();
}

function submit(app, selector) {
  return triggerEvent(selector, 'submit');
}

Ember.Test.registerAsyncHelper('selectBand', selectBand);
Ember.Test.registerAsyncHelper('submit', submit);
