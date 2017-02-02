import Route from 'ember-route';
import { task, timeout } from 'ember-concurrency';

export default Route.extend({
  model() {
    return {
      loadTask: this.get('fetchArtistsTask').perform()
    };
  },

  setupController(controller) {
    this._super(...arguments);
    let store = this.get('store');
    let artists = store.peekAll('artist');
    controller.set('_loadedArtists', artists);
  },

  fetchArtistsTask: task(function * () {
    yield timeout(500);
    return yield this.get('store').findAll('artist');
  }),
});

