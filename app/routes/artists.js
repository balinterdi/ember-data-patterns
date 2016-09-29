import Ember from 'ember';
import Route from 'ember-route';

export default Route.extend({
  model() {
    let artists = this.store.peekAll('artist');
    if (artists.get('length') === 0) {
      return this.store.findAll('artist');
    } else {
      Ember.run.scheduleOnce('afterRender', this, this._fetchMoreArtists);
      return artists;
    }
  },

  _fetchMoreArtists() {
    let { store, controller } = this;
    controller.set('isLoadingArtists', true);
    store.findAll('artist', { reload: true }).then((artists) => {
      controller.set('model', artists);
    })
    .finally(() => {
      controller.set('isLoadingArtists', false);
    });
  }
});


