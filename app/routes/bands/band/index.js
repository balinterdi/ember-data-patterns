import Ember from 'ember';

export default Ember.Route.extend({
  afterModel(band) {
    var description = band.get('description');
    if (Ember.isEmpty(description)) {
      this.transitionTo('bands.band.songs');
    } else {
      this.transitionTo('bands.band.details');
    }
  }
});
