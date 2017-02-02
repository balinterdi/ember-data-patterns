import Ember from 'ember';
import { capitalize as capitalizeWords } from '../../../helpers/capitalize';
import { task } from 'ember-concurrency';

export default Ember.Route.extend({
  queryParams: {
    searchTerm: {
      as: 'q'
    }
  },

  model({ searchTerm }) {
    let band = this.modelFor('bands.band');
    return {
      search: this.get('searchSongsTask').perform(band, searchTerm)
    };
  },

  searchSongsTask: task(function * (band, searchTerm) {
    if (searchTerm) {
      return yield this.store.query('song', { bandId: band.id, q: searchTerm });
    } else {
      return yield band.get('songs');
    }
  }),

  setupController(controller) {
    this._super(...arguments);
    let band = this.modelFor('bands.band');
    controller.set('band', band);
  },

  resetController(controller) {
    controller.setProperties({
      songCreationStarted: false,
      searchTerm: ''
    });
  },

  actions: {
    searchSongs() {
      this.refresh();
    },

    didTransition() {
      let band = this.modelFor('bands.band');
      let name = capitalizeWords(band.get('name'));
      document.title = `${name} songs - Rock & Roll`;
    },

    createSong() {
      let controller = this.get('controller');
      let band = this.modelFor('bands.band');
      let song = this.store.createRecord('song', {
        title: controller.get('title'),
        band: band
      });
      song.save().then(function() {
        controller.set('title', '');
      });
    },
  }
});
