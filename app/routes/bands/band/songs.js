import Ember from 'ember';
import { capitalize as capitalizeWords } from '../../../helpers/capitalize';

export default Ember.Route.extend({
  model() {
    let band = this.modelFor('bands.band');
    let songs = band.hasMany('songs');
    if (songs.value()) {
      return band;
    }
    return songs.load()
      .then(() => {
        return band;
      });
  },

  resetController(controller) {
    controller.set('songCreationStarted', false);
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
