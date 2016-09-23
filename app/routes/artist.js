import Route from 'ember-route';

export default Route.extend({
  model({ id }) {
    return this.store.findRecord('artist', id);
  }
});


