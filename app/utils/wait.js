import Ember from 'ember';

export default function wait(value, delay) {
  var promise = value.then && typeof value.then === 'function' ?
      value :
      Ember.RSVP.resolve(value);

  return new Ember.RSVP.Promise(function(resolve) {
    setTimeout(function() {
      promise.then(function(result) {
        resolve(result);
      });
    }, delay);
  });
}
