import Ember from 'ember';
const { Controller, computed } = Ember;

export default Controller.extend({
  queryParams: {
    sortBy: 'sort',
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
  sortedSongs: Ember.computed.sort('songs', 'sortProperties'),

  searchTerm: '',

  isLoadingSongs:           computed.readOnly('model.search.isRunning'),
  songs:                    computed.readOnly('model.search.value'),

  notLoadingSongs:          computed.not('isLoadingSongs'),
  noSongs:                  computed.equal('songs.length', 0),
  searchTermEmpty:          computed.empty('searchTerm'),
  songCreationNotStarted:   computed.not('songCreationStarted'),
  promptToCreateFirstSong:  computed.and('noSongs', 'searchTermEmpty', 'songCreationNotStarted'),
  noMatchingSongs:          computed.and('noSongs', 'searchTerm', 'notLoadingSongs'),

  emptyTitle:               computed.empty('title'),
  isAddButtonDisabled:      computed.or('emptyTitle', 'isLoadingSongs'),

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
