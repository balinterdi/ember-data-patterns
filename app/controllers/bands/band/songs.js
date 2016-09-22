import Ember from 'ember';
import { capitalize } from '../../../helpers/capitalize';
const { Controller, computed } = Ember;

export default Controller.extend({
  queryParams: {
    sortBy: 'sort',
    searchTerm: 's',
  },
  songCreationStarted: false,
  sortBy: 'ratingDesc',
  sortProperties: computed('sortBy', function() {
    let options = {
      'ratingDesc': 'rating:desc,title:asc',
      'ratingAsc': 'rating:asc,title:asc',
      'titleDesc': 'title:desc',
      'titleAsc': 'title:asc',
    };
    return options[this.get('sortBy')].split(',');
  }),
  sortedSongs: Ember.computed.sort('matchingSongs', 'sortProperties'),

  searchTerm: '',

  matchingSongs: Ember.computed('model.songs.@each.title', 'searchTerm', function() {
    return this.get('model.songs').filter((song) => {
      let searchTerm = this.get('searchTerm').toLowerCase();
      return song.get('title').toLowerCase().indexOf(searchTerm) !== -1;
    });
  }),

  hasSongs: computed.bool('model.songs.length'),
  canCreateSong: computed.or('songCreationStarted', 'hasSongs'),

  isAddButtonDisabled: computed.empty('title'),

  newSongPlaceholder: Ember.computed('model.name', function() {
    let bandName = this.get('model.name');
    if (bandName) {
      return `New ${capitalize(bandName)} song`;
    }
  }),

  actions: {
    enableSongCreation() {
      this.set('songCreationStarted', true);
    },

    setSorting(option) {
      this.set('sortBy', option);
    },

    updateRating(params) {
      let { item: song, rating } = params;
      if (song.get('rating') === rating) {
        rating = 0;
      }

      song.set('rating', rating);
      return song.save();
    }
  }
});
