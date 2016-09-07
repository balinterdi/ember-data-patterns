import Ember from 'ember';

function assertTrimmedText(app, assert, selector, text, errorMessage) {
  let element = findWithAssert(selector);
  let elementText = element.text().trim();
  assert.equal(elementText, text, errorMessage);
}

function assertLength(app, assert, selector, length, errorMessage) {
  assert.equal(find(selector).length, length, errorMessage);
}

function assertElement(app, assert, selector, errorMessage) {
  assert.equal(find(selector).length, 1, errorMessage);
}

Ember.Test.registerHelper('assertTrimmedText', assertTrimmedText);
Ember.Test.registerHelper('assertLength', assertLength);
Ember.Test.registerHelper('assertElement', assertElement);
