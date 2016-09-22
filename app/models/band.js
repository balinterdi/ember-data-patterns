import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  description:  DS.attr('string'),
  songs:        DS.hasMany('song'),

  simpleBand:   DS.belongsTo('simple-band', { async: false }),

  name: Ember.computed.alias('simpleBand.name'),
});
