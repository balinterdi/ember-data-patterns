import Ember from 'ember';
import { capitalize as capitalizeWords } from '../../../helpers/capitalize';

export default Ember.Route.extend({
  queryParams: {
    sortBy: {
      as: 'sort',
      refreshModel: true
    },
    searchTerm: {
      as: 'filter[title]',
      refreshModel: true
    },
    pageNumber: {
      as: 'page[number]',
      refreshModel: true
    }
  },

  model({ searchTerm, sortBy, pageNumber } ) {
    let band = this.modelFor('bands.band');
    let paramsForQuery = {
      pageNumber,
      searchTerm,
      bandId: band.id,
      sort: sortBy,
    };
    return this.store.query('song', paramsForQuery);
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
