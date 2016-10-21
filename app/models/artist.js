import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  firstName:   DS.attr('string'),
  lastName:    DS.attr('string'),
  yearOfBirth: DS.attr('number'),
  imageUrl:    DS.attr('string'),

  name: Ember.computed('firstName', 'lastName', function() {
    return this.get('firstName') + ' ' + this.get('lastName');
  }),

  age: Ember.computed('yearOfBirth', function() {
    return new Date().getFullYear() - this.get('yearOfBirth');
  })
});
