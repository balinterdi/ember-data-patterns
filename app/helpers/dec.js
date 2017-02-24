import Ember from 'ember';

export function dec(number) {
  return window.parseInt(number, 10) - 1;
}

export default Ember.Helper.helper(dec);
