import Ember from 'ember';
import { capitalize as capitalizeWords } from '../../../helpers/capitalize';

export default Ember.Route.extend({
  queryParams: {
    searchTerm: {
      as: 'q',
      refreshModel: true
    }
  },

  model({ searchTerm }) {
    let band = this.modelFor('bands.band');
    if (searchTerm) {
      return this.store.query('song', {
        bandId: band.id,
        q: searchTerm
      });
    } else {
      return band.get('songs');
    }
  },

  setupController(controller) {
    this._super(...arguments);
    let band = this.modelFor('bands.band');
    controller.set('band', band);
    controller.updateSearchInput();
  },

  resetController(controller) {
    controller.setProperties({
      songCreationStarted: false,
      searchTerm: ''
    });

    controller.updateSearchInput();
  },

  actions: {
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
